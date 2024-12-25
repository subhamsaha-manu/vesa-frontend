import { FC, ReactNode } from 'react'

import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerRoot,
} from '@/components/ui/drawer'

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
    <DrawerRoot
      open={isOpen}
      placement="end"
      onOpenChange={onClose}
      size={{ base: 'md', xl: 'lg' }}
    >
      <DrawerBackdrop />
      <DrawerContent>
        <DrawerCloseTrigger />
        <DrawerHeader>{headerTitle}</DrawerHeader>
        <DrawerBody h="85%">{children}</DrawerBody>
      </DrawerContent>
    </DrawerRoot>
  )
}
