import {n2, n7, stretchFactor} from "../../svg/consts"
import HiveRelEntity from "../../svg/entity"
import {Point} from "../../utils"


export default function HiveRelDetailsButton(inFocus: boolean, center: Point, entity: HiveRelEntity,
                                             setDetailsEntity: (entity: HiveRelEntity) => void) {
    const visibility = inFocus ? "visible" : "hidden"
    const x = center[0]
    const y = center[1] - stretchFactor * 80

    function onClick() {
        setDetailsEntity(entity)
    }

    return (
        <g className="details-button" key="details-button" visibility={visibility} onClick={onClick}>
            <circle cx={x} cy={y} r={n7} opacity={0}/>
            <line x1={x - n7} y1={y * stretchFactor} x2={x + n7} y2={y * stretchFactor}
                  stroke="black" strokeWidth={n2} strokeOpacity={0.8}/>
            <line x1={x} y1={y * stretchFactor - n7} x2={x} y2={y * stretchFactor + n7}
                  stroke="black" strokeWidth={n2} strokeOpacity={0.8}/>
        </g>
    )
}