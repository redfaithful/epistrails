import {n2, n5, stretchFactor} from "../../svg/consts"


export default function HiveRelCloseButton(props: any) {
    const x = props.x
    const y = props.y

    return(
        <g key="close-button" visibility={props.visibility} onClick={props.onClick}>
            <circle cx={x} cy={y} r={n5} fill={props.color}/>
            <line x1={x - n5} y1={y * stretchFactor - n5} x2={x + n5} y2={y * stretchFactor + n5}
                  stroke="black" strokeWidth={n2} strokeOpacity={0.8}/>
            <line x1={x + n5} y1={y * stretchFactor - n5} x2={x - n5} y2={y * stretchFactor + n5}
                  stroke="black" strokeWidth={n2} strokeOpacity={0.8}/>
        </g>

    )
}