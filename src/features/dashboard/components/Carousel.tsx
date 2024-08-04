import { Box, Flex, Heading, IconButton, useBreakpointValue } from '@chakra-ui/react'
import { FC, useState } from 'react'
import Slider from 'react-slick'

import image1 from '@/assets/images/image1.jpg'
import image2 from '@/assets/images/image2.jpg'
import image3 from '@/assets/images/image3.jpg'
import { CircleArrowLeft01Icon, CircleArrowRight01Icon } from 'hugeicons-react'

const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
}

export const Carousel: FC = () => {
  const [slider, setSlider] = useState<Slider | null>(null)

  const top = useBreakpointValue({ base: '90%', md: '50%' })
  const side = useBreakpointValue({ base: '30%', md: '10px' })

  const studentGalleryImages = [
    {
      id: 1,
      src: image1,
    },
    {
      id: 2,
      src: image2,
    },
    {
      id: 3,
      src: image3,
    },
  ]

  return (
    <Box position="relative" height="600px" width="full" overflow="hidden">
      <IconButton
        aria-label="left-arrow"
        borderRadius="full"
        position="absolute"
        left={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <CircleArrowLeft01Icon />
      </IconButton>
      <IconButton
        aria-label="right-arrow"
        borderRadius="full"
        position="absolute"
        right={side}
        top={top}
        transform="translate(0%, -50%)"
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <CircleArrowRight01Icon />
      </IconButton>

      <Slider {...settings} ref={(slider: any) => setSlider(slider)}>
        {studentGalleryImages.map(({ src, id }) => (
          <Box
            key={id}
            height="6xl"
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundImage={`url(${src})`}
          />
        ))}
      </Slider>

      <Flex
        display-name="carousel-text"
        position="absolute"
        w="100%"
        h="100%"
        justify="center"
        align="center"
        top={0}
        flexDir="column"
        gap={4}
      >
        <Heading size={{ base: '2xl', xl: '4xl' }} fontWeight="700" letterSpacing="20px">
          VESA
        </Heading>
        <Heading
          size={{ base: 'lg', xl: '2xl' }}
          color="#FFFFFF"
          fontWeight="500"
          style={{
            wordSpacing: '30px',
          }}
        >
          "WE CHOOSE YOU"
        </Heading>
      </Flex>
    </Box>
  )
}

export default Carousel
