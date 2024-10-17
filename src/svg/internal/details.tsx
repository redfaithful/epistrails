import {EmptyHiveRelEntity} from "../../svg/entity"
import HiveRelCloseButton from "../../svg/internal/closeButton"


export default function HiveRelDetails(props: any) {
    const x = props.width / 2 - 200
    const y = props.height / 2 - 100
    const entity = props.entity
    const isEmptyEntity = (entity === EmptyHiveRelEntity)
    const visibility = isEmptyEntity ? "hidden" : "visible"
    const closeX = x + 385
    const closeY = y + 15

    const titleNode = isEmptyEntity ? null : entity.getTitleNode(x, y)
    const detailsNode = isEmptyEntity ? null : entity.getDetailsNode(x, y)

    function onClick() {
        props.setDetailsEntity(EmptyHiveRelEntity)
    }

    return (
        <g className="dialog">
            <rect x={x} y={y} width={400} height={200} fill={entity.color} visibility={visibility}>
            </rect>
            {titleNode}
            {detailsNode}
            <HiveRelCloseButton x={closeX} y={closeY} visibility={visibility} color={entity.color} onClick={onClick}/>
        </g>
    )
}