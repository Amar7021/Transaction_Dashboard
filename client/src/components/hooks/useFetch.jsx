import { useState, useEffect } from "react"
import axios from "axios"

const BASE_URL = import.meta.env.VITE_APP_API_URL

const useFetch = (url) => {
  const [loading, setLoading] = useState(false)
  const [isError, setIsError] = useState(null)
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await axios.get(BASE_URL + url)
        setData(response.data)
        setLoading(false)
        setIsError(null)
      } catch (error) {
        setIsError("Error while fetching data")
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  return { loading, isError, data }
}

export default useFetch
