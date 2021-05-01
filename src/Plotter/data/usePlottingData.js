import { useCallback, useState} from "react"
import { useQuery } from 'react-query'

import { fetchIt } from "../helpers"

const payload = {
    "data": [
      {
        "name": "Product",
        "values": [
          "Diskette",
          "Memory Card",
          "HDTV Tuner",
          "Flat Panel Graphics Monitor",
          "Digital Camera",
          "Minitower Speaker",
          "Extension Cable",
        ]
      },
      {
        "name": "Year",
        "values": [
          "2013",
          "2014",
          "2015",
          "2016",
          "2017",
          "2018",
          "2019"
        ]
      },
      {
        "name": "Country",
        "values": [
          "KSA",
          "UAE",
          "Qatar",
          "Egypt",
          "Morocco",
          "Lebanon",
          "Sudan",
        ]
      },
      {
        "name": "Cost",
        "values": [
          333.08,
          7.07,
          10.77,
          194.76,
          13.18,
          143.3,
          405
        ]
      },
      {
        "name": "Revenue",
        "values": [
          Math.round(333.08 / 5),
          Math.round(7.07 / 5),
          Math.round(10.77 / 5),
          Math.round(194.76 / 5),
          Math.round(13.18 / 5),
          Math.round(143.3 / 5),
          Math.round(405 / 5)
        ]
      },
      {
        "name": "Units sold",
        "values": [
          33,
          7,
          1,
          10,
          1,
          2,
          4
        ]
      }
    ]
}

async function getPlottingData({ queryKey: [, filters] }) {
  // fetch('https://plotter-task.herokuapp.com/data',{
  //   method: 'POST',
  //   body: JSON.stringify(filters)
  // })
  // .then(({ json }) => json())

  return fetchIt(payload, 3100)
    .then(({ data }) => {
      return data?.reduce((accum, itm) => {
        if (itm.name === filters?.dimension) {
          accum.dimension = itm
        } else if (filters?.measures?.includes?.(itm.name)){
          accum.measure.push(itm)
        }

        return accum
      }, {
        measure: [],
        dimension: {},
      })
    })
}

export default function usePlottingData(initFilter) {
  const [filters, setFilters] = useState(initFilter)

  const query = useQuery({
    staleTime: 1000 * 60 * 15,
    queryKey: ['plotter/data', filters],
    queryFn: getPlottingData,
  })

  const updateFilters = useCallback((newFilters) => {
    setFilters(newFilters)
    query.refetch()
  }, [setFilters])

  return {
    ...query,
    filters,
    updateFilters,
  }
}
