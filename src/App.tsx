import React from 'react'

import { ScrollToTop } from '@/components/Layout'
import { AppProvider } from '@/providers/app'
import { AppRoutes } from '@/routes'

function App() {
  return (
    <AppProvider>
      <ScrollToTop />
      <AppRoutes />
    </AppProvider>
  )
}

export default App
