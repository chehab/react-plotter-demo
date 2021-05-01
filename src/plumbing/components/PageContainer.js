import styled from 'styled-components'

const Container = styled.div`
  background: var(--color-gray-200);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 60px calc(100vh - 90px) 30px;
  grid-template-areas: 
	"header"
	"plotter"
	"footer";
`

export default Container
