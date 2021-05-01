import React from "react"

import EChart from "../plumbing/components/ECharts"

import usePlottingData from "./data/usePlottingData"

export default function LineChart(props) {
  const plottingData = usePlottingData(props.filters)

  React.useEffect(() => {
    plottingData.updateFilters(props.filters)
  }, [props?.filters?.dimension, props?.filters?.measures])

  const hasDimensionData = plottingData?.data?.dimension?.name
  const hasMeasureData = plottingData?.data?.measure?.length
  const hasPlotData = hasDimensionData && hasMeasureData && !plottingData.isFetching

  const chartOptions = hasPlotData
    ? {
      tooltip: {},
      xAxis: {
        type: 'category',
        axisPointer: {
          show: true,
        },
        name: plottingData?.data?.dimension?.name,
        data: plottingData?.data?.dimension?.values,
      },
      yAxis: {
        type: 'value',
      },
      legend: {
        data: plottingData?.data?.measure
          ?.map((d) => d.name)
      },
      series: plottingData?.data?.measure
        ?.map((d) => ({
          name: d.name,
          data: d.values,
          type: 'line'
        }))
    } : { }


  return (
    <EChart
      notMerge
      options={chartOptions}
      showLoading={plottingData.isFetching}
    />
  )
}
