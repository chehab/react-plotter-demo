import styled, { css } from 'styled-components'
import { Droppable } from "react-beautiful-dnd"

import SectionLabel from './SectionLabel'


const PlotOptionsContainer = styled.div`
  min-height: var(--space-4x);
  
  ${({ isDraggingOver }) => isDraggingOver ? css`
    border-radius: var(--round-xl);
    box-shadow: var(--shadow-inner);
    background: var(--color-yellow-200);
  ` : null}
`

const PlotOptionsPicker = ({ label, children, className, ...restProps }) => (
  <>
    <SectionLabel>
      {label}
    </SectionLabel>
    <Droppable {...restProps}>
      {(provided, snapshot) => (
        <PlotOptionsContainer
          {...provided}
          placeholder={undefined}
          ref={provided.innerRef}
          isDraggingOver={snapshot.isDraggingOver}
        >
          {children}
          {provided.placeholder}
        </PlotOptionsContainer>
      )}
    </Droppable>
  </>
)

export default PlotOptionsPicker
