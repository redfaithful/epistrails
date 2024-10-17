import React from "react"
import AuxiliaryData from "../data/auxiliaryData"
import {factor, fontSizes, relationshipColor} from "../svg/consts"
import {capitalize, setMinus} from "../utils"
import {RelationshipData} from "../data/apiData"

export default function HiveRelRelationship(relationshipData: RelationshipData,
                                            zoom: number,
                                            auxiliaryData: AuxiliaryData,
                                            selectedEntities: Set<string>,
                                            hoveredEntity: string) {
    const entities = relationshipData.entities
    const entitiesString = entities.map((e) => "__" + e + "__").join(" ")
    const centers = entities.map((e) => auxiliaryData.getEntityCenter(e))
    const average = centers.reduce((a, b) => [a[0] + b[0], a[1] + b[1]], [0, 0])
        .map((n) => n / entities.length)


    const relationshipVisibility = entities.includes(hoveredEntity) && allIn(selectedEntities) ? "visible" : "hidden"

    function allIn(s: Set<string>): boolean {
        return setMinus(s, new Set(entities)).size == 0
    }

    const children = []
    const attributes = []
    for (let key in relationshipData.attributes) {
        let value = relationshipData.attributes[key]
        attributes.push(<div key={key} style={{fontSize: fontSizes[zoom]}}>{capitalize(key)}:{value}</div>)
    }
    children.push(
        <rect key="relationshipRect"
              x={average[0] - 7 * factor}
              y={average[1] - 3 * factor}
              width={16 * factor}
              height={8 * factor}
              style={{"fill": relationshipColor, "strokeWidth": "2", "stroke": "white", "opacity": 1}}
        />
    )
    centers.map((center) =>
        children.push(
            <path key={"relationshipPath_" + center.join("_")}
                  d={"M" + (average[0]) + " " + (average[1]) + " L" + (center[0]) + " " + (center[1])}
                  style={{"stroke": relationshipColor, "strokeWidth": "7", "strokeLinecap": "round", "opacity": 0.9}}
            />
        )
    )
    children.push(
        <foreignObject className="relationshipText" key="relationshipText"
                       x={average[0] - 6.3 * factor}
                       y={average[1] - 2.4 * factor}
                       width={15 * factor}
                       height={7.5 * factor}
                       style={{"fill": relationshipColor, "strokeWidth": "2", "stroke": "white", "opacity": 1}}
        >
            <div style={{fontSize: fontSizes[zoom]}}><b>{capitalize(relationshipData.type)}</b></div>
            {attributes}
        </foreignObject>
    )

    return React.createElement('g', {
        className: "relationship",
        key: entitiesString,
        rel_entities: entitiesString,
        style: {"visibility": relationshipVisibility}
    }, children)
}