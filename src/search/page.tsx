"use client"
import {useEffect, useState} from "react"
import HiveRelCanvas from "../svg/canvas"
import HiveRelEmptyData from "../data/emptyData"
import {ApiData} from "../data/apiData"
import getStyle from "../search/style"

export default function Home() {
    const [apiData, setApiData] = useState(HiveRelEmptyData(urlParamQuery()))
    const [query, setQuery] = useState(urlParamQuery())
    const [loading, setLoading] = useState(true)
    const [errorString, setErrorString] = useState("")
    const collection = urlParamCollection()
    const dataRetries = 10

    useEffect(() => {
        fetchData(collection, query, 0)
    }, [])

    function getDataPromise(res: Response): Promise<ApiData> {
        return res.text().then((data) => {
            if (data.length > 0) {
                return JSON.parse(data) as ApiData
            } else {
                return HiveRelEmptyData("")
            }
        })
    }

    function fetchData(collection: string, query: string, retries: number) {
        if (retries > dataRetries) {
            setLoading(false)
            console.log("Error in retrieving data from server")
            setErrorString("Error in retrieving data from server, please try again later")
            return
        }
        const fetchUrl = 'http://localhost:5000/' + collection + '_search?query=' + query
        fetch(fetchUrl, {mode: 'cors', headers: {'Access-Control-Allow-Origin': 'http://localhost:5173'}})
            .then((res) => getDataPromise(res))
            .then((data) => {
                if (data.layout.length > 1) {
                    setApiData(data)
                    setLoading(false)
                } else if (data.entities["query"].query_string.length > 0) {
                    setErrorString("No results for query \'" + data.entities["query"].query_string +
                        "\', try something else")
                    setLoading(false)
                } else {
                    setTimeout(() => fetchData(collection, query, retries + 1), retries * 1000)
                }
            })
            .catch((err) => {
                console.log(err.message)
                setLoading(false)
            })
    }

    function urlParamCollection(): string {
        const queryParams = new URLSearchParams(window.location.search)
        return queryParams.get("collection") == null ? "" : queryParams.get("collection")!
    }

    function urlParamQuery(): string {
        const queryParams = new URLSearchParams(window.location.search)
        return queryParams.get("query") == null ? "" : queryParams.get("query")!
    }

    function changeQuery(newQuery: string) {
        setQuery(newQuery)
        const location = window.location
        const newUrl = location.protocol + "//" + location.host + location.pathname + '?collection=' + collection + '&query=' + newQuery
        window.history.pushState({path: newUrl}, '', newUrl)
        fetchData(urlParamCollection(), urlParamQuery(), 0)
        setLoading(true)
    }

    const style = getStyle(collection)

    return (
        <main style={style}>
            <HiveRelCanvas collection={collection} query={query} apiData={apiData} loading={loading}
                           errorString={errorString} setErrorString={setErrorString} changeQuery={changeQuery}/>
        </main>
    )
}
