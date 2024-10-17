import React, {useEffect, useRef, useState} from "react"
import HiveRelMapLayer from "../svg/map"
import HiveRelReset from "../svg/internal/reset"
import HiveRelZoom from "../svg/internal/zoom"
import Transform from "../svg/transform"
import HiveRelPreLoader from "../svg/internal/preloader"
import HiveRelDetails from "../svg/internal/details"
import {EmptyHiveRelEntity} from "../svg/entity"
import HiveRelError from "../svg/internal/errorDetails"

export default function HiveRelSvg(props: any) {
    const [transformMatrix, setTransformMatrix] = useState(props.transform.getTransMatrix())
    const [overviewFocus, setOverviewFocus] = useState(props.transform.getOverviewFocus())
    const [mouseActive, setMouseActive] = useState(false)
    const [zoom, setZoom] = useState(props.transform.getZoom())
    const [detailsEntity, setDetailsEntity] = useState(EmptyHiveRelEntity)
    const ref = useRef<SVGSVGElement>(null)
    let transform = props.transform

    useEffect(() => {
        if (ref && ref.current) {
            ref.current.focus()
        }
    })

    function handleKeyDown(event: any) {
        if (event.target.id != "new_query") {
            let arrow = false
            let move = 8
            if (event.key == "ArrowLeft") {
                transform.addToTransMatrix(4, move)
                arrow = true
            } else if (event.key == "ArrowUp") {
                transform.addToTransMatrix(5, move)
                arrow = true
            } else if (event.key == "ArrowRight") {
                transform.addToTransMatrix(4, -move)
                arrow = true
            } else if (event.key == "ArrowDown") {
                transform.addToTransMatrix(5, -move)
                arrow = true
            } else if (event.key == "+" || event.key == "=") {
                transform.changeZoom(1)
            } else if (event.key == "-") {
                transform.changeZoom(-1)
            } else if (event.key == "0") {
                transform.resetTransMatrix()
                transform.resetZoom()
            }

            if (arrow) {
                transform.ensureBoundaries()
            }
        }
        updateTransform(transform)
    }

    function handleMouseDown() {
        setMouseActive(true)
    }

    function handleMouseMove(event: any) {
        if (mouseActive) {
            event.preventDefault()
            transform.addToTransMatrix(4, event.movementX)
            transform.addToTransMatrix(5, event.movementY)
            transform.ensureBoundaries()
            updateTransform(transform)
        }
    }

    function handleMouseUp() {
        setMouseActive(false)
    }

    function handleOnWheel(event: any) {
        let delta = (event.deltaY > 0) ? 1 : -1
        transform.changeZoom(delta)
        transform.ensureBoundaries()
        updateTransform(transform)
    }

    function updateTransform(transform: Transform) {
        setTransformMatrix(transform.getTransMatrix())
        setOverviewFocus(transform.getOverviewFocus())
        setZoom(transform.getZoom())
    }

    const transformProps = {
        transform: transform,
        updateTransform: updateTransform
    }

    const mapProps = {
        transformMatrix: transformMatrix,
        overviewFocus: overviewFocus,
        zoom: zoom,
        setDetailsEntity: setDetailsEntity
    }

    const defs =
        <defs>
            <filter id="blackGlow" key={"blackGlow"}>
                <feColorMatrix type="matrix" values="0 0 0 0  0   0 0 0 0  0   0 0 0 0  0   0 0 0 0.7 0"/>
                <feGaussianBlur stdDeviation="3.5" in="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>

    return (
        <svg key="svg" width={transform.width} height={transform.height}
             ref={ref} onKeyDown={handleKeyDown} tabIndex={0}
             onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}
             onWheel={handleOnWheel}>
            {defs}
            <rect key="svg_rect" width={transform.width} height={transform.height} opacity="0"/>
            <HiveRelMapLayer key={props.query} {...Object.assign(mapProps, transformProps, props)} />
            <HiveRelReset {...transformProps}/>
            <HiveRelZoom {...Object.assign({transform: transform, y: 60, isPlus: true}, transformProps)}/>
            <HiveRelZoom {...Object.assign({transform: transform, y: 90, isPlus: false}, transformProps)}/>
            <HiveRelDetails {...Object.assign({
                entity: detailsEntity,
                width: transform.width,
                height: transform.height,
                setDetailsEntity: setDetailsEntity
            })}/>
            <HiveRelError {...Object.assign({
                errorString: props.errorString,
                width: transform.width,
                height: transform.height,
                setErrorString: props.setErrorString
            })}/>
            <HiveRelPreLoader {...Object.assign({
                width: transform.width,
                height: transform.height,
                loading: props.loading
            })}/>
        </svg>
    )
}