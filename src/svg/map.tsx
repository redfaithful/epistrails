import {ReactNode, useEffect, useRef, useState} from "react"
import HiveRelHexagon from "../svg/hexagon"
import HiveRelOverview from "../svg/overview"
import Transform from "../svg/transform"
import Ordering from "../data/ordering"
import HiveRelRelationship from "../svg/relationship"
import AuxiliaryData from "../data/auxiliaryData"
import {motionInterval, motionLimit} from "../svg/consts"
import {EmptyHiveRelEntity} from "../svg/entity"
import {HexagonData, RelationshipData} from "../data/apiData"

export default function HiveRelMapLayer(props: any) {
    const [selectedEntities, setSelectedEntities] = useState(new Set<string>())
    const [shadowedEntities, setShadowedEntities] = useState(new Set<string>())
    const [hoveredEntity, setHoveredEntity] = useState("")
    const [motionIndex, setMotionIndex] = useState(0)
    const [focusEntity, setFocusEntity] = useState<string>("")

    let transform: Transform = props.transform
    let transformMatrix: string = props.transformMatrix
    let hexagonsData: HexagonData[] = props.hexagonsData
    let relationshipsData: RelationshipData[] = props.relationshipsData
    let ordering: Ordering = props.ordering
    let auxiliaryData: AuxiliaryData = props.auxiliaryData
    const counter = useRef(0)

    useEffect(() => {
        if (hexagonsData.length > 1 && counter.current < motionLimit) {
            counter.current += 1
            const interval = setInterval(() => setMotionIndex(counter.current), motionInterval)
            return () => {
                clearInterval(interval)
            }
        }
    }, [motionIndex])

    function updateSelectedEntities(entity: string) {
        auxiliaryData.updateSelectedEntities(entity)
        setSelectedEntities(auxiliaryData.getSelectedEntities())
        setShadowedEntities(auxiliaryData.getShadowedEntities())
        props.setDetailsEntity(EmptyHiveRelEntity)
    }

    const hexagonElements: ReactNode[] = hexagonsData.map((hexagonData) =>
        HiveRelHexagon(hexagonData, ordering, props.collection, selectedEntities, shadowedEntities,
            props.zoom, motionIndex, props.query, updateSelectedEntities, setHoveredEntity, props.changeQuery,
            props.setDetailsEntity, focusEntity, setFocusEntity))

    const relationshipElements: ReactNode[] = relationshipsData.map((relationshipData) =>
        HiveRelRelationship(relationshipData, props.zoom, auxiliaryData, selectedEntities, hoveredEntity))

    return (
        <g className="mapLayer">
            <g className="hexagonsAndRelationships" key="hexagonsAndRelationships"
               transform={transformMatrix}>
                {hexagonElements}
                {relationshipElements}
            </g>
            <HiveRelOverview transform={transform} hexagonsData={hexagonsData} shadowedEntities={shadowedEntities}
                             overviewFocus={props.overviewFocus}
                             updateTransform={props.updateTransform} selectedEntities={selectedEntities}/>
        </g>
    )
}