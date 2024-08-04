import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react'
import React, { FC, ReactNode } from 'react'

type DrawerComponentProps = {
  isOpen: boolean
  onClose: () => void
  headerTitle: string
  children: ReactNode
}

export const DrawerComponent: FC<DrawerComponentProps> = ({
  isOpen,
  onClose,
  headerTitle,
  children,
}) => {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={{ base: 'md', xl: 'lg' }}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{headerTitle}</DrawerHeader>
        <DrawerBody h="85%">{children}</DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
