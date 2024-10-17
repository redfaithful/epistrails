import React from "react"
import {factor, xFactor, yFactor} from "../svg/consts"
import {Point} from "../utils"


export default class Transform {
    boundaries: number[] = [Number.MAX_VALUE, Number.MAX_VALUE, Number.MIN_VALUE, Number.MIN_VALUE]
    width: number
    height: number
    transMatrix: number[]
    zoom: number
    overviewFocus: number[]

    zoomSpeed: number = 0.85

    constructor(width: number, height: number) {
        this.width = width
        this.height = height
        this.transMatrix = []
        this.zoom = 3
        this.overviewFocus = [0, 0, width, height]
        this.resetTransMatrix()
        this.resetZoom()
    }

    resetTransMatrix() {
        this.transMatrix = [1, 0, 0, 1, this.width / 2, this.height / 2]
    }

    resetZoom() {
        this.zoom = 3
    }

    updateBoundaries(extHexagon: Point[]) {
        if (this.boundaries[0] > extHexagon[1][0]) {
            this.boundaries[0] = extHexagon[1][0]
        }
        if (this.boundaries[1] > extHexagon[0][1]) {
            this.boundaries[1] = extHexagon[0][1]
        }
        if (this.boundaries[2] < extHexagon[4][0]) {
            this.boundaries[2] = extHexagon[4][0]
        }
        if (this.boundaries[3] < extHexagon[3][1]) {
            this.boundaries[3] = extHexagon[3][1]
        }
    }

    minimalBoundaries() {
        // apply minimal values for bounding box
        this.boundaries[0] = Math.min(this.boundaries[0] - factor, -5 * xFactor)
        this.boundaries[1] = Math.min(this.boundaries[1] - factor, -4 * yFactor)
        this.boundaries[2] = Math.max(this.boundaries[2] + factor, +5 * xFactor)
        this.boundaries[3] = Math.max(this.boundaries[3] + factor, +4 * yFactor)

        // centering bounding box
        if (this.boundaries[0] + this.boundaries[2] < 0) {
            this.boundaries[2] = -this.boundaries[0]
        } else if (this.boundaries[0] + this.boundaries[2] > 0) {
            this.boundaries[0] = -this.boundaries[2]
        }
        if (this.boundaries[1] + this.boundaries[3] < 0) {
            this.boundaries[3] = -this.boundaries[1]
        } else if (this.boundaries[1] + this.boundaries[3] > 0) {
            this.boundaries[1] = -this.boundaries[3]
        }

        const screenScale = this.width / this.height
        const boundariesScale = (this.boundaries[2] - this.boundaries[0]) / (this.boundaries[3] - this.boundaries[1])
        if (boundariesScale > screenScale) {
            const newHeight = (this.boundaries[2] - this.boundaries[0]) / screenScale
            this.boundaries[3] = newHeight / 2
            this.boundaries[1] = -this.boundaries[3]
        } else {
            const newWidth = screenScale * (this.boundaries[3] - this.boundaries[1])
            this.boundaries[2] = newWidth / 2
            this.boundaries[0] = -this.boundaries[2]
        }
    }

    getTransMatrix() {
        return "matrix(" + this.transMatrix.join(' ') + ")"
    }

    getOverviewFocus() {
        return this.overviewFocus
    }

    getZoom() {
        return this.zoom
    }

    addToTransMatrix(index: number, addition: number) {
        this.transMatrix[index] += addition
    }

    ensureBoundaries() {
        let newX = -this.transMatrix[4] / this.transMatrix[0]
        if (newX < this.boundaries[0]) {
            newX = this.boundaries[0]
            this.transMatrix[4] = -newX * this.transMatrix[0]
        }
        let newY = -this.transMatrix[5] / this.transMatrix[0]
        if (newY < this.boundaries[1]) {
            newY = this.boundaries[1]
            this.transMatrix[5] = -newY * this.transMatrix[0]
        }
        let newWidth = this.width / this.transMatrix[0]
        if (newX + newWidth > this.boundaries[2]) {
            newX = this.boundaries[2] - newWidth
            this.transMatrix[4] = -newX * this.transMatrix[0]
        }
        let newHeight = this.height / this.transMatrix[0]
        if (newY + newHeight > this.boundaries[3]) {
            newY = this.boundaries[3] - newHeight
            this.transMatrix[5] = -newY * this.transMatrix[0]
        }
        this.overviewFocus = [newX, newY, newWidth, newHeight]
    }

    rescale(scale: number) {
        for (let i = 0; i < this.transMatrix.length; i++) {
            this.transMatrix[i] *= scale
        }

        this.transMatrix[4] += (1 - scale) * this.width / 2
        this.transMatrix[5] += (1 - scale) * this.height / 2

        this.ensureBoundaries()
    }

    changeZoom(delta: number) {
        let scale = 1
        if (delta < 0) {
            // zoom in
            if (this.zoom >= 0) {
                let tempScale = -delta * this.zoomSpeed
                let newWidth = this.width / (tempScale * this.transMatrix[0])
                let newHeight = this.height / (tempScale * this.transMatrix[0])
                if (newWidth < this.boundaries[2] - this.boundaries[0] &&
                    newHeight < this.boundaries[3] - this.boundaries[1]) {
                    scale = tempScale
                    this.zoom--
                }
            }
        } else {
            // zoom out
            if (this.zoom < 5) {
                scale = 1 / (delta * this.zoomSpeed)
                this.zoom++
            }
        }

        if (scale != 1) {
            this.rescale(scale)
        }
    }
}
