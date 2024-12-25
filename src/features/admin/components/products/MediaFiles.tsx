import { Flex } from '@chakra-ui/react'
import { Image } from '@nextui-org/react'
import { FC } from 'react'
import { BiSolidTrash } from 'react-icons/bi'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

import { extractFileType } from '../../utils/extractImageUUID'

import { Media, MediaFileInput } from '@/types'

type MediaFileProps = {
  medias: Array<Media>
  deletedMedias: Array<MediaFileInput>
  setDeletedMedias: (medias: Array<MediaFileInput>) => void
}

const MediaFiles: FC<MediaFileProps> = ({ medias, deletedMedias, setDeletedMedias }) => {
  return (
    <Flex display-name="media-files" flexWrap="wrap" gap="16px">
      {medias.map(({ url, uuid }) => (
        <Flex
          key={uuid}
          position="relative"
          opacity={deletedMedias.map((e) => e.uuid).includes(uuid) ? '0.7' : '1'}
        >
          <Zoom>
            <Image
              src={url}
              style={{
                zIndex: 1,
                cursor: 'zoom-in',
                width: '100%',
                maxWidth: '300px',
                maxHeight: '400px',
                objectFit: 'cover',
              }}
              alt="Media File"
            />
          </Zoom>

          <Flex
            position="absolute"
            bottom="5%"
            right="5%"
            width="40px"
            height="32px"
            bg="#f5f5f5"
            opacity="0.98"
            transition="opacity .1s ease-in-out, visibility .1s ease-in-out;"
            align="center"
            justify="center"
            zIndex={2}
            borderRadius="50%"
            cursor="pointer"
          >
            <BiSolidTrash
              data-testid="delete-media"
              style={{ height: '20px', width: '20px' }}
              color="#555555"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation() // Prevent triggering zoom on delete
                setDeletedMedias([...deletedMedias, { uuid, fileType: extractFileType(url) }])
              }}
            />
          </Flex>
        </Flex>
      ))}
    </Flex>
  )
}

export default MediaFiles
