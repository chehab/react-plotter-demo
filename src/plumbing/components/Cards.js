import React from 'react'
import styled from 'styled-components'

export const Card = styled.div`
  background: #fff;
  padding: var(--space-2x);
  box-shadow: var(--shadow);
  border-radius: var(--round-lg);
`

export const ChartCard = styled(Card)`
  display: grid;
  grid-area: contentMain;
  grid-template-columns: auto;
  grid-template-rows: 50px 50px auto;
  grid-template-areas: 
    "dimension"
    "measure"
    "graph";
`

export const OptionsCards = styled(Card)`
  display: flex;
  overflow-y: auto;
  grid-area: sidebar;
  flex-direction: column;
`
