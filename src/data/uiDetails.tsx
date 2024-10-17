export default interface Ordering {
    ordering: { [key: string]: [string, number][] }
    colors: { [key: string]: string[] }
}

const uiDetails: { [collection: string]: Ordering } = {
    "biogrid": {
        "ordering": {
            "gene": [["symbol", 6], ["full_name", 5], ["locus_tag", 4], ["gene_type", 3], ["organism", 2], ["gene_description", 1]],
            "protein": [["name", 3], ["organism", 2], ["description", 1]],
            "article": [["title", 3], ["link", 2], ["doi", 1]],
            "Dummy2": [["dummy2", 2]],
            "Dummy3": [["dummy3", 2]],
            "Dummy4": [["dummy4", 2]],
            "query": [["query_string", -1]],
            "Welcome!": [["", 2]],
            "Write": [["", 2]],
            "Focus": [["", 2]],
            "View": [["", 2]]
        },
        "colors": {
            "gene": ["#87D69B", "#9BDCAB", "#AFE3BC", "#C3EACD"],
            "protein": ["#FFBF6D", "#FDC986", "#FBD4A0", "#F9DFBA"],
            "article": ["#FF6B6B", "#FF8384", "#FF9C9D", "#FFB5B6"],
            "Dummy2": ["#E2DEC5", "#CFC79D", "#D8D2B1", "#D8D2B1"],
            "Dummy3": ["#C54D57", "#CE6A73", "#D7888F", "#E1A6AC"],
            "Dummy4": ["#4ECDC4", "#6BD5CD", "#88DDD6", "#A5E6E0"],
            "query": ["#E6E4D8"],
            "Welcome!": ["#C54D57", "#CE6A73", "#D7888F", "#E1A6AC"],
            "Write": ["#87D69B", "#9BDCAB", "#AFE3BC", "#C3EACD"],
            "Focus": ["#FF6B6B", "#FF8384", "#FF9C9D", "#FFB5B6"],
            "View": ["#4ECDC4", "#6BD5CD", "#88DDD6", "#A5E6E0"]
        }
    },
    "mondial": {
        "ordering": {
            "province": [["name", 2], ["country", 1], ["population", 1],
                ["area", 1], ["capital", 1]],
            "mountain": [["name", 2], ["elevation", 1], ["coordinates", 1]],
            "organization": [["abbreviation", 2], ["name", 2],
                ["established", 1], ["city", 1], ["country", 1],
                ["province", 1]],
            "language": [["name", 2], ["country", 1], ["percentage", 1]],
            "city": [["name", 2], ["population", 1], ["longitude", 1],
                ["latitude", 1]],
            "island": [["name", 2], ["islands", 1], ["area", 1],
                ["coordinates", 1]],
            "lake": [["name", 2], ["area", 1]],
            "continent": [["name", 2], ["area", 1]],
            "religion": [["name", 2], ["country", 1], ["percentage", 1]],
            "sea": [["name", 2], ["area", 1], ["depth", 1]],
            "country": [["name", 2], ["capital", 1], ["province", 1],
                ["area", 1], ["population", 0]],
            "query": [["query_string", -1]],
            "river": [["name", 2], ["length", 1]],
            "desert": [["name", 2], ["area", 1]],
            "airport": [["name", 2], ["iatacode", 1], ["latitude", 1], ["longitude", 1], ["elevation", 1]],
            "ethnicity": [["name", 2], ["country", 1], ["percentage", 1]],
            "Welcome!": [["", 2]],
            "Write": [["", 2]],
            "Focus": [["", 2]],
            "View": [["", 2]]
        },
        "colors": {
            "province": ["#E2DEC5", "#CFC79D", "#D8D2B1", "#D8D2B1"],
            "mountain": ["#FFBF6D", "#FDC986", "#FBD4A0", "#F9DFBA"],
            "organization": ["#C54D57", "#CE6A73", "#D7888F", "#E1A6AC"],
            "language": ["#FF6B6B", "#FF8384", "#FF9C9D", "#FFB5B6"],
            "city": ["#E2DEC5", "#CFC79D", "#D8D2B1", "#D8D2B1"],
            "island": ["#FFBF6D", "#FDC986", "#FBD4A0", "#F9DFBA"],
            "lake": ["#4ECDC4", "#6BD5CD", "#88DDD6", "#A5E6E0"],
            "continent": ["#87D69B", "#9BDCAB", "#AFE3BC", "#C3EACD"],
            "religion": ["#FF6B6B", "#FF8384", "#FF9C9D", "#FFB5B6"],
            "sea": ["#4ECDC4", "#6BD5CD", "#88DDD6", "#A5E6E0"],
            "country": ["#87D69B", "#9BDCAB", "#AFE3BC", "#C3EACD"],
            "query": ["#E6E4D8"],
            "river": ["#4ECDC4", "#6BD5CD", "#88DDD6", "#A5E6E0"],
            "desert": ["#FFBF6D", "#FDC986", "#FBD4A0", "#F9DFBA"],
            "airport": ["#FFBF6D", "#FDC986", "#FBD4A0", "#F9DFBA"],
            "ethnicity": ["#C54D57", "#CE6A73", "#D7888F", "#E1A6AC"],
            "Welcome!": ["#C54D57", "#CE6A73", "#D7888F", "#E1A6AC"],
            "Write": ["#87D69B", "#9BDCAB", "#AFE3BC", "#C3EACD"],
            "Focus": ["#FF6B6B", "#FF8384", "#FF9C9D", "#FFB5B6"],
            "View": ["#4ECDC4", "#6BD5CD", "#88DDD6", "#A5E6E0"]
        }
    }
}

export function getUiDetails(collection: string) {
    return uiDetails[collection]
}