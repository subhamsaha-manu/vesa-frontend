import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react'
import React from 'react'

type DrawerComponentProps = {
  isOpen: boolean
  onClose: () => void
  headerTitle: string
  children: React.ReactNode
}

export const DrawerComponent: React.FC<DrawerComponentProps> = ({
  isOpen,
  onClose,
  headerTitle,
  children,
}) => {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xl">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{headerTitle}</DrawerHeader>
        <DrawerBody h="85%">{children}</DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
