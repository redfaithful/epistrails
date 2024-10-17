import {ReactNode, useState} from "react"
import Transform from "../svg/transform"
import {HexagonData} from "../data/apiData"
import {getSvgHexagon} from "../svg/hexagon"


export default function HiveRelOverview(props: any) {
    const [mouseActive, setMouseActive] = useState(false)
    let transform: Transform = props.transform
    let updateTransform = props.updateTransform
    let overviewFocus = props.overviewFocus
    let overviewFocusCounter = 0
    let selectedEntities: Set<string> = props.selectedEntities
    let shadowedEntities: Set<string> = props.shadowedEntities

    const boundaries = transform.boundaries

    const matrix = getMatrix()

    const hexagonsData: HexagonData[] = props.hexagonsData
    const hexagonElements: ReactNode[] = hexagonsData.map((hexagonData) =>
        getOverviewHexagon(hexagonData))

    function getMatrix() {
        const overviewScaleX = Math.min((boundaries[2] - boundaries[0]) / transform.width, 1.5)
        const overviewScaleY = Math.min((boundaries[3] - boundaries[1]) / transform.height, 1.2)
        const overviewScale = 0.05 * Math.min(overviewScaleX, overviewScaleY)
        const overviewMargin = 5
        const overviewX = transform.width - (boundaries[2] * overviewScale) - overviewMargin
        const overviewY = transform.height - (boundaries[3] * overviewScale) - overviewMargin
        return "matrix(" + overviewScale + " 0 0 " + overviewScale + " " + overviewX + " " + overviewY + ")"
    }

    function getOverviewHexagon(hexagonData: HexagonData) {
        const idSelected = selectedEntities.has(hexagonData.id)
        const visibility = idSelected || shadowedEntities.has(hexagonData.id) ? "visible" : "hidden"
        const color = idSelected ? "yellow" : "black"
        return (
            <g className="overviewHexagon" key={"overview_" + hexagonData.id}>
                {getSvgHexagon(hexagonData.external, "overviewHexagon_" + hexagonData.id, hexagonData.color, 1)}
                {getSvgHexagon(hexagonData.external, "overviewHexagonFloater_" + hexagonData.id, color, 0.5,
                    {visibility: visibility})}
            </g>
        )
    }

    function handleMouseDown(event: any) {
        event.stopPropagation()
    }

    function handleFocusMouseDown(event: any) {
        setMouseActive(true)
        event.stopPropagation()
    }

    function handleFocusMouseMove(event: any) {
        if (mouseActive) {
            overviewFocusCounter += 1
            if (overviewFocusCounter % 3 == 0) {
                event.preventDefault()
                transform.addToTransMatrix(4, -event.movementX * 50)
                transform.addToTransMatrix(5, -event.movementY * 50)
                transform.ensureBoundaries()
                updateTransform(transform)
            }
        } else {
            overviewFocusCounter = 0
        }
    }

    function handleMouseUp(event: any) {
        setMouseActive(false)
        event.stopPropagation()
    }

    return (
        <g className="overview" key="overview" fill="white" transform={matrix}
           onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} tabIndex={0}>
            <rect key="overviewRect"
                  x={boundaries[0]}
                  y={boundaries[1]}
                  width={boundaries[2] - boundaries[0]}
                  height={boundaries[3] - boundaries[1]}
                  style={{"fillOpacity": "0.9", "strokeWidth": "2", "stroke": "black"}}
            />
            {hexagonElements}
            <rect className="overviewFocus" key="overviewFocus"
                  onMouseDown={handleFocusMouseDown} onMouseMove={handleFocusMouseMove}
                  tabIndex={0}
                  x={overviewFocus[0]}
                  y={overviewFocus[1]}
                  width={overviewFocus[2]}
                  height={overviewFocus[3]}
                  style={{"fill": "grey", "fillOpacity": "0.2", "strokeWidth": "8", "stroke": "red"}}
            />
        </g>
    )
}