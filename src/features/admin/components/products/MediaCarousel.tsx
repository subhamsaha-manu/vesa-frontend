import { Modal, ModalBody, ModalContent } from '@nextui-org/react'
import { FC } from 'react'

import Carousel from '@/components/elements/Carousel'

type MediaCarouselProps = {
  imageUrls: Array<string>
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

export const MediaCarousel: FC<MediaCarouselProps> = ({ imageUrls, isOpen, onOpenChange }) => {
  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      classNames={{
        backdrop: 'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
      }}
    >
      <ModalContent>
        <ModalBody>
          <Carousel imageUrls={imageUrls} showText={false} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
