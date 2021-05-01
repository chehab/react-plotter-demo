import React from 'react'
import * as echarts from 'echarts';
import { useWindowResize, useViewportSpy } from 'beautiful-react-hooks'

export function useECharts(options, theme, opts) {
  const echartRef = React.useRef(null)

  const [echartInstance, setEchartInstance] = React.useState()

  useWindowResize(() => {
    echartInstance?.resize?.()
  })

  React.useEffect(() => {
    if (echartRef.current) {
      const chart = echarts.init(
        echartRef.current,
        null, // theme,
        Object.assign({ renderer: 'svg' }, opts)
      )

      chart.setOption(options)

      setEchartInstance(chart)
    }
  }, [echartRef, echartRef.current])

  return [echartRef, echartInstance]
}

export default function EChart(props) {
  const [echartRef, echartsInstance] = useECharts(props.options, props.theme, props.opts,)

  const isInView = useViewportSpy(echartRef)

  React.useEffect(() => {
    echartsInstance
      ?.setOption?.(props.options, props.notMerge, props.replaceMerge, props.lazyUpdate)
  }, [echartsInstance, props.options])

  React.useEffect(() => {
    if (props.showLoading) {
      echartsInstance?.showLoading?.('default', { color: '#c13f3f' })
    } else {
      echartsInstance?.hideLoading?.()
    }
  }, [echartsInstance, props.showLoading])

  React.useEffect(() => {
    if (props?.clearChart) {
      echartsInstance.clear()
    }
  }, [props?.clearChart])

  React.useEffect(() => {
    if (echartsInstance) {
      props?.onEchartInit?.(echartsInstance, echartRef)
    }
  }, [echartsInstance, props?.onEchartInit])

  React.useEffect(() => {
    if (echartsInstance && isInView) {
      props?.onInViewport?.(echartsInstance, echartRef)
    }
  }, [isInView, props?.onInViewport])

  return (
    <div
      ref={echartRef}
      className={props.className}
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  )
}
