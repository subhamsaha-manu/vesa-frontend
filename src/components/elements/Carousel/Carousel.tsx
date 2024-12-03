import { Box, Flex, Heading, IconButton, useBreakpointValue } from '@chakra-ui/react'
import { CircleArrowLeft01Icon, CircleArrowRight01Icon } from 'hugeicons-react'
import { FC, useState } from 'react'
import Slider from 'react-slick'

const settings = {
  dots: false,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipe: true,
  touch: true,
}

type CarouselProps = {
  imageUrls: Array<string>
  showText: boolean
}

export const Carousel: FC<CarouselProps> = ({ imageUrls, showText }) => {
  const [slider, setSlider] = useState<Slider | null>(null)

  const top = useBreakpointValue({ base: '80%', md: '50%' })
  const side = useBreakpointValue({ base: '30%', md: '10px' })

  return (
    <Box
      position="relative"
      height={{ base: '98vh', xl: '600px' }}
      width="full"
      overflow="hidden"
      display-name="carousel-box-container"
    >
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
        {imageUrls.map((url, index) => (
          <Box
            key={index}
            height="6xl"
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundImage={url}
          />
        ))}
      </Slider>

      {showText && (
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
          <Heading size="4xl" fontWeight="700" letterSpacing="20px" color="#e5e2db">
            VESA
          </Heading>
          <Heading
            size={{ base: 'xl', xl: '2xl' }}
            color="#FFFFFF"
            fontWeight="500"
            style={{
              wordSpacing: '30px',
            }}
          >
            &#34;WE CHOOSE YOU&#34;
          </Heading>
        </Flex>
      )}
    </Box>
  )
}

export default Carousel
