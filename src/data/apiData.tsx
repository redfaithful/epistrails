import {Point} from "../utils"

export interface LayoutInfo {
    id: string
    location: [number, number]
    size?: number
    text_result?: boolean
}

export interface ApiData {
    layout: LayoutInfo[]
    entities: { [id: string]: { [key: string]: string } }
    scores: { [id: string]: number }
    relationships: []
}

export interface HexagonData {
    id: string
    center: Point
    size: number
    external: number[][]
    internal: number[][]
    attributes: { [key: string]: string }
    color: string
    textResult: boolean | undefined
}

export interface RelationshipData {
    type: string
    entities: string[]
    attributes: { [key: string]: string }
}

export function attributeStringValues(attributes: {[key: string] : any}): {[key: string] : string} {
    for (const [key, value] of Object.entries(attributes)) {
        const t = typeof value
        if (t == "object") {
            if (value.length == 2 && value[0].length == 2) {
                attributes[key] = "(" + [value[0].join(": "), value[1].join(": ")].join(", ") + ")"
            }
        }
    }
    return attributes
}