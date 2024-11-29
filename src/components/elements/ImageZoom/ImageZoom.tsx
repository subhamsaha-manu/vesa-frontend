import { Image, Modal, ModalBody, ModalContent } from '@nextui-org/react'
import { FC } from 'react'

type ImageZoomProps = {
  imageUrl: string
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

export const ImageZoom: FC<ImageZoomProps> = ({ imageUrl, isOpen, onOpenChange }) => {
  return (
    <Modal
      backdrop="opaque"
      size="3xl"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      classNames={{
        backdrop: 'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
      }}
    >
      <ModalContent>
        <ModalBody>
          <Image src={imageUrl} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ImageZoom
