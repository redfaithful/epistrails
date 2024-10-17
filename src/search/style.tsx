
export default function getStyle(collection: string) {
    if (collection == "biogrid") {
        return {
            backgroundImage: `url('/biogrid.jpg')`,
            backgroundPosition: "center center",
            backgroundRepeat: "repeat"
        }
    } else if (collection == "mondial") {
        return {
            backgroundImage: `url('/mondial.jpg')`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "cover"
        }
    } else {
        return {}
    }
}
