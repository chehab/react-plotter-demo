import React from 'react'
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClient, QueryClientProvider } from 'react-query'


import Plotter from '../Plotter'
import CssTheme from '../plumbing/theme'
import Container from '../plumbing/components/PageContainer'

import AppHeader from "./AppHeader"
import AppFooter from './AppFooter'


const queryClient = new QueryClient()
const QueryDevtools = process.env.NODE_ENV !== 'production'
  ? ReactQueryDevtools
  : null

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CssTheme>
        <Container>
          <AppHeader />
          <Plotter />
          <AppFooter />
        </Container>

        <QueryDevtools />
      </CssTheme>
    </QueryClientProvider>
  );
}

