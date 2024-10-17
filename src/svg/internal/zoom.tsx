import {buttonBackground, buttonStroke, n15, n18, n2, n22, n23, n30, n38, n7, stretchFactor} from "../../svg/consts"

export default function HiveRelZoom(props: any) {
    let transform = props.transform
    let updateTransform = props.updateTransform
    const id = props.isPlus ? "plus-button" : "minus-button"

    function handleMouseDown() {
        transform.changeZoom(props.isPlus ? 1 : -1)
        updateTransform(transform)
    }

    return (
        <g id={id} onMouseDown={handleMouseDown}>
            <rect x={n15} y={props.y * stretchFactor} width={n30} height={n30} r={n18}
                  fill={buttonBackground} fillOpacity={1} stroke={buttonStroke} strokeOpacity={0.5}/>
            <line x1={n22} y1={props.y * stretchFactor + n15} x2={n38} y2={props.y * stretchFactor + n15}
                  stroke={buttonStroke} strokeWidth={n2} strokeOpacity={0.8}/>
            {
                props.isPlus &&
                <line x1={n30} y1={props.y * stretchFactor + n7} x2={n30} y2={props.y * stretchFactor + n23}
                      stroke={buttonStroke} strokeWidth={n2} strokeOpacity={0.8}/>
            }
        </g>
    )
}