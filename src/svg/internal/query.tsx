import React, {useState} from "react"
import {queryFontSizes, queryRowsCols} from "../../svg/consts"
import {TooltipComponent} from "@syncfusion/ej2-react-popups"


export default function HiveRelQuery(props: any) {
    const [query, setQuery] = useState(props.query)
    const [rows, cols] = queryRowsCols[props.zoom]
    const styleProps = {fontSize: queryFontSizes[props.zoom]}
    const changeQuery: (entity: string) => void = props.changeQuery

    function handleFocus(event: any) {
        if (event.type == "mousedown") {
            event.stopPropagation()
        } else if (event.type == "change") {
            setQuery(event.target.value)
        } else if (event.type == "keydown" && event.key == "Enter") {
            changeQuery(event.target.value)
            event.stopPropagation()
        }
    }

    function handleSubmit(event: any) {
        changeQuery(query)
        event.stopPropagation()
    }

    return (
        <div id="query_div" key="entity_details_query">
            <TooltipComponent content="Type Query Here" position="RightCenter"
                              showTipPointer={false} mouseTrail={true} offsetX={3} openDelay={1000}>
                <textarea id="new_query" className="hexagonText" key="query_textarea"
                          placeholder="Type Query Here" value={query}
                          rows={rows} cols={cols} style={styleProps} onChange={handleFocus}
                          onKeyDown={handleFocus} onMouseDown={handleFocus}/>
            </TooltipComponent>

            <TooltipComponent content="Press to submit query" position="RightCenter"
                              showTipPointer={false} mouseTrail={true} offsetX={5} openDelay={1000}>
                <input type="button" id="search_submit" key="query_input"
                       style={styleProps} value="SEARCH" onClick={handleSubmit}/>
            </TooltipComponent>
        </div>
    )
}