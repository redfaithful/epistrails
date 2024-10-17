import React, {ReactNode} from "react"
import HiveRelEntity from "../svg/entity"
import Ordering from "../data/ordering"
import {Point} from "../utils"
import {motionLimit, selectEntityColor, underEntityColor} from "../svg/consts"
import HiveRelDetailsButton from "../svg/internal/detailsButton"
import {HexagonData} from "../data/apiData"


export default function HiveRelHexagon(hexagonData: HexagonData,
                                       ordering: Ordering,
                                       collection: string,
                                       selectedEntities: Set<string>,
                                       shadowedEntities: Set<string>,
                                       zoom: number,
                                       motionIndex: number,
                                       query: string,
                                       updateSelectedEntities: (entity: string) => void,
                                       setHoveredEntity: (entity: string) => void,
                                       changeQuery: (query: string) => void,
                                       setDetailsEntity: (entity: HiveRelEntity) => void,
                                       focusEntity: string,
                                       setFocusEntity: (entity: string) => void) {
    function getColor(): string {
        return selectedEntities.has(hexagonData.id) ? "yellow" : hexagonData.color
    }

    function handleOnClick(event: any) {
        updateSelectedEntities(event.target.attributes.entity_id.value)
        setHoveredEntity("")
    }

    function handleMouseEnter() {
        if (selectedEntities.size > 0 && !selectedEntities.has(hexagonData.id)) {
            setHoveredEntity(hexagonData.id)
        }
        setFocusEntity(hexagonData.id)
    }

    function handleMouseLeave() {
        setHoveredEntity("")
        setFocusEntity("")
    }

    function addHexagonMotion(points: number[][], center: Point, entityId: string) {
        let motions: ReactNode[] = []
        for (let i = 0; i < points.length; i++) {
            const trianglePoint = [center, points[points.length - i - 1], points[(points.length - i) % points.length]]
            let id = "motion" + i
            const visibility = motionIndex < motionLimit && (motionIndex % 6) == i ? "visible" : "hidden"
            motions.push(React.createElement("polygon", {
                motion: "true",
                key: id + '_' + entityId,
                className: id,
                points: polygonPoints(trianglePoint),
                style: {visibility: visibility, fill: "black", fillOpacity: 0.5}
            }))
        }
        return motions
    }

    function toggleHexagonPoints(hexagonData: HexagonData) {
        const x0 = hexagonData.center[0]
        const xd = 9
        const y0 = hexagonData.center[1] + 62
        const yd1 = 5
        const yd2 = 9
        return [[x0, y0], [x0 + xd, y0 + yd1], [x0 + xd, y0 + yd1 + yd2],
            [x0, y0 + 2 * yd1 + yd2], [x0 - xd, y0 + yd1 + yd2],
            [x0 - xd, y0 + yd1]]
    }

    const overEntityVisibility = shadowedEntities.has(hexagonData.id) ? "visible" : "hidden"
    const overEntityProps = {className: "overEntity", visibility: overEntityVisibility}

    let children: ReactNode[] = []
    if (hexagonData.textResult) {
        children.push(getSvgHexagon(hexagonData.external, "underEntity_" + hexagonData.id, underEntityColor, 1,
            {className: "underEntity"}))
        children.push(...addHexagonMotion(hexagonData.external, hexagonData.center, hexagonData.id))
    }
    children.push(getSvgHexagon(hexagonData.internal, "inEntity_" + hexagonData.id, getColor(), -1,
        {className: "inEntity"},
        {stroke: "white", strokeWidth: 2, filter: "url(#blackGlow)"}))

    let entity = new HiveRelEntity(hexagonData.internal, hexagonData.attributes, hexagonData.id,
        getColor(), collection, ordering, zoom)
    if (hexagonData.id != "query") {
        children.push(entity.getTitleNode())
    }
    children.push(entity.getAttributesNode(query, changeQuery))
    if (hexagonData.id != "query") {
        children.push(getSvgHexagon(hexagonData.external, "overEntity_" + hexagonData.id, "grey", 0.8,
            overEntityProps))
        children.push(getSvgHexagon(toggleHexagonPoints(hexagonData), "selectEntity_" + hexagonData.id, selectEntityColor, 0,
            {className: "selectEntity", entity_id: hexagonData.id, onClick: handleOnClick},
            {stroke: "white", strokeWidth: 4}))
        children.push(HiveRelDetailsButton(focusEntity == hexagonData.id, hexagonData.center, entity, setDetailsEntity))
    }

    return React.createElement('g', {
        key: hexagonData.id,
        className: "mapHexagon",
        cx: hexagonData.center[0],
        cy: hexagonData.center[1],
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave
    }, children)
}

export function getSvgHexagon(hexagonPoints: number[][], key: string, color: string, opacity: number,
                              props: { [key: string]: any } = {}, styleProps: { [key: string]: any } = {}): ReactNode {
    props["key"] = key
    props["points"] = polygonPoints(hexagonPoints)
    styleProps["fill"] = color
    if (opacity >= 0) {
        styleProps["fillOpacity"] = opacity
    }
    props["style"] = styleProps
    return React.createElement('polygon', props)
}

function polygonPoints(pointsArray: number[][]) {
    return pointsArray.map(p => p.join(",")).join(" ")
}

