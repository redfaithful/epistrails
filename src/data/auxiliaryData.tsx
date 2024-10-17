import {Point, setIntersect, setMinus, setUnion} from "../utils"


export default class AuxiliaryData {
    locationsMapping: { [key: string]: Point } = {}
    textResults: Set<string> = new Set()
    entityToRelationship: { [key: string]: Set<Set<string>>} = {}
    selectedEntities: Set<string> = new Set()

    updateMapping(id: string, center: Point) {
        this.locationsMapping[id] = center
    }

    addTextResult(id: string) {
        this.textResults.add(id)
    }

    newEntity(entity: string) {
        this.entityToRelationship[entity] = new Set()
    }

    addRelationshipForEntity(entity: string, relationship: Set<string>) {
        this.entityToRelationship[entity].add(relationship)
    }

    getEntityCenter(e: string): Point {
        return this.locationsMapping[e]
    }

    updateSelectedEntities(entity: string) {
        if (this.selectedEntities.has(entity)) {
            this.selectedEntities.delete(entity)
        } else {
            this.selectedEntities.add(entity)
        }
    }

    getSelectedEntities() : Set<string> {
        return this.selectedEntities
    }

    getShadowedEntities(): Set<string> {
        if (this.selectedEntities.size > 0) {
            const unselected = setMinus(new Set(Object.keys(this.entityToRelationship)), this.selectedEntities)
            const selectedArray = Array.from(this.selectedEntities)
            let relationships = this.entityToRelationship[selectedArray[0]]
            for (let i = 1; i < selectedArray.length; i++) {
                relationships = setIntersect(relationships, this.entityToRelationship[selectedArray[i]])
            }
            const related = Array.from(relationships).reduce((a, b) => setUnion(a, b), new Set())
            return setMinus(unselected, related)
        } else {
            return new Set()
        }
    }
}