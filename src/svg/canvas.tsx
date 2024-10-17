import React, {useEffect, useState} from "react"
import HiveRelSvg from "../svg/svg"
import Transform from "../svg/transform"
import AuxiliaryData from "../data/auxiliaryData"
import {hexagonX, hexagonY, strokeX, strokeY, xFactor, yFactor} from "../svg/consts"
import {getUiDetails} from "../data/uiDetails"
import HiveRelTooltip from "../svg/internal/tooltip"
import {ApiData, attributeStringValues, HexagonData, LayoutInfo, RelationshipData} from "../data/apiData"
import {Point} from "../utils"


export default function HiveRelCanvas(props: any) {
    const [dimensions, setDimensions] = useState([window.innerWidth, window.innerHeight])
    const apiData: ApiData = props.apiData

    useEffect(() => {
        function handleResize() {
            setDimensions([window.innerWidth, window.innerHeight])
        }

        window.addEventListener('resize', handleResize)
    })

    let transform = new Transform(dimensions[0] * 0.98, dimensions[1] * 0.96)
    let auxiliaryData = new AuxiliaryData()
    const maxEntityScore = apiData.scores["query"]
    const uiDetails = getUiDetails(props.collection)

    function getHexagonData(layoutObject: LayoutInfo) {
        const location = layoutObject.location
        const xActual = location[0] * xFactor
        const yActual = location[1] * yFactor
        const size = layoutObject.size ? layoutObject.size : 1

        let extHexagon: Point[] = []
        let intHexagon: Point[] = []
        for (let i = 0; i < 6; i++) {
            extHexagon.push([xActual + hexagonX[i] * size, yActual + hexagonY[i] * size])
            intHexagon.push([xActual + (hexagonX[i] + strokeX[i]) * size, yActual + (hexagonY[i] + strokeY[i]) * size])
        }

        const attributes = attributeStringValues(apiData.entities[layoutObject.id])

        const score = apiData.scores[layoutObject.id] / maxEntityScore
        const scoreIndex = Math.round(3 * (1 - score))
        const color = uiDetails.colors[attributes["entity_type"]][scoreIndex]

        const center: Point = [xActual, yActual]
        if (layoutObject.text_result) {
            auxiliaryData.addTextResult(layoutObject.id)
        }
        auxiliaryData.updateMapping(layoutObject.id, center)
        auxiliaryData.newEntity(layoutObject.id)
        transform.updateBoundaries(extHexagon)
        const hexagonData: HexagonData = {
            id: layoutObject.id,
            center: center,
            size: size,
            external: extHexagon,
            internal: intHexagon,
            attributes: attributes,
            color: color,
            textResult: layoutObject.text_result
        }
        return hexagonData
    }

    function getRelationshipData(relationship: { [key: string]: any }) {
        const relType: string = String(relationship["type"])
        const entities: string[] = Object.keys(relationship).filter((key) => key.includes("__"))
        const entitiesSet = new Set(entities)
        const attributes = Object.entries(relationship)
            .filter(([key]) => key != "type" && !key.includes("__"))

        entities.forEach((e) => auxiliaryData.addRelationshipForEntity(e, entitiesSet))

        const relationshipData: RelationshipData = {
            type: relType,
            entities: entities,
            attributes: attributes[0] ? attributes[0][1] : null
        }
        return relationshipData
    }

    const hexagonsData = apiData.layout.map((layoutData) => getHexagonData(layoutData))
    const relationshipsData = apiData.relationships.map((relationship) => getRelationshipData(relationship))

    transform.minimalBoundaries()
    transform.ensureBoundaries()

    const hiveRelSvg = (apiData.layout.length == 1) ?
        <HiveRelSvg key="resultsNone" transform={transform} collection={props.collection}
                    hexagonsData={hexagonsData} relationshipsData={relationshipsData}
                    auxiliaryData={auxiliaryData} query={props.query} loading={props.loading}
                    errorString={props.errorString} setErrorString={props.setErrorString}
                    changeQuery={props.changeQuery} ordering={uiDetails}/> :
        <HiveRelSvg key="resultsExist" transform={transform} collection={props.collection}
                    hexagonsData={hexagonsData} relationshipsData={relationshipsData}
                    auxiliaryData={auxiliaryData} query={props.query} loading={props.loading}
                    errorString={props.errorString} setErrorString={props.setErrorString}
                    changeQuery={props.changeQuery} ordering={uiDetails}/>
    return (
        <div>
            <HiveRelTooltip content="Return to default zoom and location (keyboard 0)" target={"#reset-button"}>
                <HiveRelTooltip content="Zoom In (keyboard +)" target={"#plus-button"}>
                    <HiveRelTooltip content="Zoom Out (keyboard -)" target={"#minus-button"}>
                        <HiveRelTooltip content="Press to highlight related results" target={".selectEntity"}>
                            <HiveRelTooltip content="Press to see full entity details" target={".details-button"}>
                                {hiveRelSvg}
                            </HiveRelTooltip>
                        </HiveRelTooltip>
                    </HiveRelTooltip>
                </HiveRelTooltip>
            </HiveRelTooltip>
        </div>
    )
}