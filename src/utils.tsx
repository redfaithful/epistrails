import React from "react"

export type Point = [number, number]

export function capitalize(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1)
}

export function setMinus(a: Set<any>, b: Set<any>): Set<any> {
    return new Set(Array.from(a).filter(e => !b.has(e)))
}

export function setIntersect(a: Set<any>, b: Set<any>): Set<any> {
    return new Set(Array.from(a).filter(e => b.has(e)))
}

export function setUnion(a: Set<any>, b: Set<any>): Set<any> {
    return new Set([...Array.from(a), ...Array.from(b)])
}
