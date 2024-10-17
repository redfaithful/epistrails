import React from "react"
import {ApiData} from "../data/apiData"

export default function HiveRelEmptyData(query: string) {
    return {
        layout: [{id: "query", location: [0, 0], size: 1.2}],
        entities: {"query": {"query_string": query, "entity_type": "query", "entity_id": "query"}},
        scores: {"query": 1},
        relationships: []
    } as ApiData
}
