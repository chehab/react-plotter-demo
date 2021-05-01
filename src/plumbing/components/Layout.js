import styled from 'styled-components'

const Layout = styled.section`
  grid-area: plotter;
  margin: var(--space-3x);
  
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 4fr;
  grid-column-gap: var(--space-2x);
  grid-template-areas: "sidebar contentMain";
`

export default Layout
