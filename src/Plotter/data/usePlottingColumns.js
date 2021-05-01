import { useQuery } from 'react-query'
import { useState, useEffect, useCallback } from "react"

import { fetchIt, filterSelected, filterNotSelected } from "../helpers";


const payload = {
  "columns": [
    {
      "name": "Product",
      "function": "dimension"
    }, {
      "name": "Year",
      "function": "dimension"
    },
    {
      "name": "Country",
      "function": "dimension"
    }, {
      "name": "Cost",
      "function": "measure"
    },
    {
      "name": "Revenue",
      "function": "measure"
    }, {
      "name": "Units sold",
      "function": "measure"
    }
  ]
}


async function getPlottingColumns() {
  try {
    const data = await fetchIt(payload, 2400)

    return data
      .columns
      .reduce((accum, col, index) => {
        const itm = {
          ...col,
          index,
          isSelected: col?.isSelected ?? false,
          id: `${col.function}-${col.name}-${index}`,
        }

        if (col.function === 'measure') {
          accum.measure.push(itm)
        } else if (col.function === 'dimension') {
          accum.dimension.push(itm)
        }

        return accum
      }, {
        measure: [],
        dimension: [],
      })
  } catch (error) {
    return {
      error,
      isError: true,
      dimension: [],
      measure: [],
    }
  }

}


export function usePlottingColumnsData(options) {
  const query = useQuery({
    staleTime: 1000 * 60 * 15,
    ...(options ?? {}),
    queryKey: ['plotter/columns'],
    queryFn: getPlottingColumns,
  })

  return query
}


export default function usePlottingColumns(columnsFunction) {
  const {
    data,
    status,
    dataUpdatedAt,
    ...rest
  } = usePlottingColumnsData()

  const colData = data?.[columnsFunction]

  const [columns, setColumns] = useState(colData)
  const [dataModifiedAt, setDataModifiedAt] = useState(dataUpdatedAt)

  const updateColumns = useCallback((colData) => {
    setColumns(colData)
    setDataModifiedAt(new Date().getTime())
  }, [setColumns])

  useEffect(() => {
    setDataModifiedAt(dataUpdatedAt)
    updateColumns(data?.[columnsFunction])
  }, [status, dataUpdatedAt])

  const getSelected = useCallback(() => {
    return columns?.filter?.(filterSelected)
  }, [columns])

  const getUnselected = useCallback(() => {
    return columns?.filter?.(filterNotSelected)
  }, [columns])

  return {
    ...rest,
    status,
    columns,
    getSelected,
    getUnselected,
    updateColumns,
    dataUpdatedAt,
    dataModifiedAt,
  }
}
