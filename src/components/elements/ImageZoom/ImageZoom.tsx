import { Image, Modal, ModalBody, ModalContent } from '@nextui-org/react'
import { FC, useState } from 'react'

type ImageZoomProps = {
  imageUrl: string
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

export const ImageZoom: FC<ImageZoomProps> = ({ imageUrl, isOpen, onOpenChange }) => {
  const [modalSize, setModalSize] = useState<'sm' | 'md' | 'lg' | 'xl' | 'full'>('md')

  return (
    <Modal
      backdrop="opaque"
      placement="bottom-center"
      size={modalSize}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      classNames={{
        backdrop: 'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
      }}
    >
      <ModalContent>
        <ModalBody onClick={() => setModalSize('xl')}>
          <Image src={imageUrl} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ImageZoom
