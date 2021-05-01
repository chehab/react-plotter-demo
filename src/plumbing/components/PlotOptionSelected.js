import React from "react";
import styled, { css } from 'styled-components'
import { Droppable } from "react-beautiful-dnd"

export const PlotOptionSelectedLabel = styled.label`
  justify-self: right;
  align-self: center;
`

export const PlotOptionSelected = styled.div`
  display: flex;
  align-items: stretch;
  justify-items: stretch;
  margin: var(--space-1x);
  grid-area: ${({ area }) => area};
  height: calc(50px - var(--space-1x) - var(--space-1x));
`

export const PlotOptionSelectedAction = styled.a`
  padding: var(--space-1x);
  justify-self: left;
  align-self: center;
  cursor: pointer;

  &:hover {
    border-radius: var(--round-lg);
    background: var(--color-red-100);
  }
`

export const PlotOptionSelectedContainer = styled.div`
  flex-grow: 1;
  display: flex;
  padding: var(--space-1x);
  margin: 0 var(--space-1x);
  border-radius: var(--round-xl);
  background: var(--color-gray-50);
  box-shadow: var(--shadow-inner);
  
  ${({ isDraggingOver }) => isDraggingOver ? css`
    background: var(--color-yellow-200);
  ` : null}
`

export const PlotOptionSelectedDrop = ({ children, ...restProps }) => (
  <Droppable {...restProps} direction="horizontal">
    {(provided, snapshot) => (
      <PlotOptionSelectedContainer
        {...restProps}
        {...provided}
        placeholder={undefined}
        ref={provided.innerRef}
        isDraggingOver={snapshot.isDraggingOver}
      >
        {children}
        {provided.placeholder}
      </PlotOptionSelectedContainer>
    )}
  </Droppable>
)


export default function PlotOptions(props) {
  return (
    <PlotOptionSelected area={props.area}>
      <PlotOptionSelectedLabel>
        {props.label}
      </PlotOptionSelectedLabel>
      <PlotOptionSelectedDrop
        type={props.type}
        droppableId={`${props.type}-plot`}
      >
        {props.children}
      </PlotOptionSelectedDrop>
      <PlotOptionSelectedAction onClick={props.onClear}>
        Clear
      </PlotOptionSelectedAction>
    </PlotOptionSelected>
  )
}
