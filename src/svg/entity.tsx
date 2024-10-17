import React from "react"
import Ordering from "../data/ordering"
import {capitalize} from "../utils"
import {fontSizes} from "../svg/consts"
import HiveRelQuery from "../svg/internal/query"

export default class HiveRelEntity {
    private readonly internal: number[][]
    private readonly attributes: { [key: string]: string }
    private readonly id: string
    private readonly color: string
    private readonly collection: string
    private readonly ordering: Ordering
    private readonly zoom: number

    constructor(internal: number[][], attributes: { [key: string]: string }, id: string, color: string,
                collection: string, ordering: Ordering, zoom: number) {
        this.internal = internal
        this.attributes = attributes
        this.id = id
        this.color = color
        this.collection = collection
        this.ordering = ordering
        this.zoom = zoom < 0 ? 0 : zoom
    }

    getTitleNode(x: number = -1, y: number = -1) {
        const textAlign = x < 0 ? "center" : "left"
        const entityTypeDiv =
            <div className="entityType" key={"entityType_" + this.id}
                 style={{"textAlign": textAlign, fontSize: fontSizes[this.zoom]}}>
                {capitalize(this.attributes["entity_type"])}
            </div>
        return React.createElement("foreignObject", {
            className: "entityTitle",
            key: "entityTitleForeign_" + this.id,
            overflow: "hidden",
            x: x < 0 ? this.internal[1][0] + 38 : x + 10,
            y: y < 0 ? this.internal[1][1] - 20 : y + 5,
            width: this.internal[4][0] - this.internal[1][0] - 76,
            height: this.internal[4][1] - this.internal[1][1] - 2
        }, [entityTypeDiv])
    }

    getAttributesNode(query: string, changeQuery: (entity: string) => void) {
        return React.createElement("foreignObject", {
            className: "entityDetails",
            key: "entityDetailsForeign_" + this.id,
            overflow: "hidden",
            x: this.internal[1][0] + 8,
            y: this.internal[1][1],
            width: this.internal[4][0] - this.internal[1][0] - 14,
            height: this.internal[4][1] - this.internal[1][1] - 2,
            hexagon_color: this.color
        }, [this.getEntityHtml(this.attributes, query, changeQuery)])
    }

    getEntityHtml(attributes: { [p: string]: string }, query: string,
                  changeQuery: (entity: string) => void) {
        const entityType = attributes["entity_type"]
        if (entityType == "query") {
            return (
                <div id="query_div" key="entity_details_query">
                    <HiveRelQuery query={query} zoom={this.zoom} changeQuery={changeQuery}/>
                </div>
            )
        } else {
            return this.getAttributesHtml(entityType, attributes)
        }
    }

    getDetailsNode(x: number, y: number) {
        return React.createElement("foreignObject", {
            className: "entityDetails",
            key: "entityDetailsForeign_" + this.id,
            overflow: "hidden",
            x: x + 10,
            y: y + 30,
            width: 380,
            height: 150,
            hexagon_color: this.color
        }, [this.getAttributesHtml(this.attributes["entity_type"], this.attributes, false)])
    }

    private getAttributesHtml(entityType: string, attributes: { [p: string]: string }, specialTop: boolean = true) {
        let ordering = this.ordering.ordering[entityType]
        let attributeDivs = []
        const topAttributeName = ordering[0][0]
        const topAttributeValue = this.getAttributeValue(topAttributeName, attributes)
        if (topAttributeValue) {
            if (specialTop) {
                attributeDivs.push(this.getTopAttributeDiv(topAttributeName, topAttributeValue))
            } else {
                attributeDivs.push(this.getAttributeDiv(topAttributeName, topAttributeValue, false))
            }
        }
        for (let i = 1; i < ordering.length; i++) {
            const attributeName = ordering[i][0]
            const attributeValue = this.getAttributeValue(attributeName, attributes)
            if (attributes[ordering[i][0]]) {
                attributeDivs.push(this.getAttributeDiv(attributeName, attributeValue))
            }
        }
        return (
            <div key={"entity_details_" + this.id} style={{fontSize: fontSizes[this.zoom]}}>
                {attributeDivs}
            </div>
        )
    }

    private getAttributeValue(attributeName: string, attributes: { [p: string]: string }) {
        type ObjectKey = keyof typeof attributes
        const attributeKey = attributeName as ObjectKey
        return attributes[attributeKey]
    }

    private getTopAttributeDiv(attributeName: string, attributeValue: string) {
        const href = this.collection + "?query=" + encodeURI(attributeValue.toLowerCase())
        return (
            <div className={"hexagonText " + attributeName + "_attr topAttribute"} key={attributeName}>
                <a className="entityTitle" target="_blank" href={href}>
                    {attributeValue}
                </a>
            </div>
        )
    }

    private getAttributeDiv(attributeName: string, attributeValue: string, useName: boolean = true) {
        const prefix = useName ? capitalize(attributeName).replace('_', ' ') + ": " : ""
        return (
            <div className={"hexagonText " + attributeName + "_attr"} key={attributeName}>
                {prefix} {attributeValue}
            </div>
        )
    }
}

export const EmptyHiveRelEntity = new HiveRelEntity(new Array(1), {}, "", "", "", {ordering: {}, colors: {}}, 0)
