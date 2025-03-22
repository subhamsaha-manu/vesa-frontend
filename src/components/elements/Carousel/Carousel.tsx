import { Box, Flex } from '@chakra-ui/react'
import { FC } from 'react'
import Slider from 'react-slick'

import './carousel.css'
import VesaHeading from '@/components/elements/VesaHeading'

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
  swipe: true,
  touch: true,
  vertical: true, // Make sure vertical mode is enabled
  verticalSwiping: true, // Optional for swiping
  customPaging: () => <div className="custom-dot" />,
}

type CarouselProps = {
  imageUrls: Array<string>
  showText: boolean
}

const Carousel: FC<CarouselProps> = ({ imageUrls, showText }) => {
  return (
    <Box
      position="relative"
      maxHeight="600px"
      height="auto"
      width="full"
      overflow="hidden"
      display-name="carousel-box-container"
    >
      <Slider {...settings}>
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
          w="50%"
          justify="end"
          align="start"
          bottom="10%"
          left="5%"
          flexDir="column"
          gap={4}
        >
          <VesaHeading text="What's your style?" color="#FFFFFF" />
        </Flex>
      )}
    </Box>
  )
}

export default Carousel
