import {errorDialogColor} from "../../svg/consts"
import HiveRelCloseButton from "../../svg/internal/closeButton"


export default function HiveRelError(props: any) {
    const x = props.width / 2 - 150
    const y = props.height / 2 - 230
    const errorString = props.errorString
    const visibility = (errorString == "") ? "hidden" : "visible"
    const closeX = x + 285
    const closeY = y + 15

    function onClick() {
        props.setErrorString("")
    }

    return (
        <g className="dialog">
            <rect x={x} y={y} width={300} height={100} visibility={visibility} fill={errorDialogColor} onClick={onClick}>
            </rect>
            <foreignObject x={x + 10} y={y + 10} width={250} height={80}>
                <div className="errorString">{props.errorString}</div>
            </foreignObject>
            <HiveRelCloseButton x={closeX} y={closeY} visibility={visibility} color={errorDialogColor} onClick={onClick}/>
        </g>
    )
}