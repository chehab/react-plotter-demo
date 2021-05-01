import styled, { css } from 'styled-components'
import { Draggable } from "react-beautiful-dnd"

const draggingItemStyle = css`
  ${({ isDragging, color }) => isDragging ? css`
    box-shadow: var(--shadow-lg);
    min-width: 100px;
    border: 1px var(--color-${color}-800) solid;
    border-left: 4px var(--color-${color}-800) solid;
    border-bottom: 4px var(--color-${color}-800) solid;
  ` : null}
`

const selectedItemStyle = css`
  margin-right: calc(var(--space-1x) / 4);
  padding: calc(var(--space-1x) / 2) var(--space-2x);
  box-shadow: var(--shadow);
  color: var(--color-${({ color }) => color ?? 'gray'}-50);
  border-radius: var(--round-xl);
  background: var(--color-${({ color }) => color ?? 'gray'}-400);
  justify-self: center;
  align-self: center;
`

const unselectedItemStyle = css`
  margin: var(--space-1x);
  padding: var(--space-1x);
  color: var(--color-${({ color }) => color ?? 'gray'}-50);
  border-radius: var(--round-xl);
  background: var(--color-${({ color }) => color ?? 'gray'}-600);
`

const Item = styled.div`
  ${draggingItemStyle}
  ${unselectedItemStyle}
  ${({ isSelected }) => isSelected ? selectedItemStyle : null}
`

const DraggableItem = ({ isSelected, children, ...restProps }) => (
  <Draggable
    {...restProps}
  >
    {(provided, snapshot) => (
      <Item
        {...restProps}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        isDragging={snapshot.isDragging}
        ref={provided.innerRef}
        isSelected={isSelected}
      >
        {children}
      </Item>
    )}
  </Draggable>
)


export default DraggableItem
