import { createGlobalStyle } from 'styled-components'

import spacing from './spacingVars'
import shadows from './shadowsVars'
import colors from './colorVars'
import round from './roundVars'

const GlobalStyles = createGlobalStyle`
  :root {
    ${spacing}
    ${shadows}
    ${colors}
    ${round}
  }
`

export default function CssTheme({ children, ...restProps }) {
  return (
    <>
      <GlobalStyles {...restProps}/>
      {children}
    </>
  )
}
