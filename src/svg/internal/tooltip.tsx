import {TooltipComponent} from "@syncfusion/ej2-react-popups"


export default function HiveRelTooltip(props: any) {
    return (
        <TooltipComponent
            content={props.content}
            target={props.target}
            position="RightCenter"
            showTipPointer={false}
            mouseTrail={true}
            offsetX={3}
            openDelay={500}
        >
            {props.children}
        </TooltipComponent>
    )
}