import React from "react"
import { ImpulseSpinner } from "react-spinners-kit"

export default function Spinner(props) {
  if (!props.show) {
    return null
  }

  return (
    <ImpulseSpinner frontColor="#acacac" backColor="#fff"/>
  )
}
