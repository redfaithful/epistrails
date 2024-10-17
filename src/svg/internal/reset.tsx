import React from "react"
import {buttonBackground, buttonStroke, n18, n2, n22, n26, n30, n34, n35, n7, stretchFactor} from "../../svg/consts"


export default function HiveRelReset(props: any) {
    let transform = props.transform
    let updateTransform = props.updateTransform

    function handleMouseDown() {
        transform.resetTransMatrix()
        transform.resetZoom()
        updateTransform(transform)
    }

    function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
        const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0

        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        }
    }

    function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
        const start = polarToCartesian(x, y, radius, endAngle)
        const end = polarToCartesian(x, y, radius, startAngle)
        const arcSweep = endAngle - startAngle <= 180 ? "0" : "1"

        return [
            "M", start.x, start.y,
            "A", radius, radius, 0, arcSweep, 0, end.x, end.y
        ].join(" ")
    }

    return (
        <g className="reset" id="reset-button" onMouseDown={handleMouseDown}>
            <circle cx={n30} cy={n30} r={n18} fill={buttonBackground}/>
            <path stroke={buttonStroke} strokeWidth={n2}
                  d={describeArc(30 * stretchFactor, 30 * stretchFactor, 8 * stretchFactor, 90, 360)}/>
            <circle cx={n30} cy={n30} r={n7} fill={buttonBackground}/>
            <line x1={n30} y1={n22} x2={n35} y2={n22} stroke={buttonStroke} strokeWidth={n2}/>
            <line x1={n34} y1={n22} x2={n30} y2={n18} stroke={buttonStroke} strokeWidth={n2}/>
            <line x1={n34} y1={n22} x2={n30} y2={n26} stroke={buttonStroke} strokeWidth={n2}/>
        </g>
    )
}