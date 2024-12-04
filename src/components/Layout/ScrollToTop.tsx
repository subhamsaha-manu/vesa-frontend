import { FC, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const ScrollToTop: FC = () => {
  const location = useLocation()

  useLayoutEffect(() => {
    const element = document.getElementById('main-layout-flex-2')
    if (element) {
      element.scrollTop = 0
      element.scrollLeft = 0
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location.pathname])

  return null
}
