import { useEffect, useState } from 'react'

export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const element = document.getElementById('main-layout-flex-2')

    const handleScroll = () => {
      const element = document.getElementById('main-layout-flex-2')
      if (!element) return

      const currentScrollY = element.scrollTop

      if (currentScrollY > lastScrollY) {
        setScrollDirection('down')
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up')
      }

      setLastScrollY(currentScrollY)
    }

    if (element) {
      element.addEventListener('scroll', handleScroll)
    }

    //window.addEventListener('scroll', handleScroll)

    return () => {
      if (element) {
        element.removeEventListener('scroll', handleScroll)
      }
    }
  }, [lastScrollY])

  return scrollDirection
}
