import { Flex, Image, Text } from '@chakra-ui/react'
import { FC } from 'react'

import human from '@/assets/images/human.jpg'
import quotationMark from '@/assets/images/quotation-mark.png'
import { ContentLayout } from '@/components/Layout'

const AboutUs: FC = () => {
  return (
    <ContentLayout pageTitle="About Us" showFullPageScroll>
      <Flex
        display-name="about-us-container-flex"
        w="100%"
        textAlign="justify"
        flexDir="column"
        flexWrap="wrap"
        p={{ base: '', xl: '0 40px' }}
        gap={4}
        mt={{ base: '0', xl: '40px' }}
      >
        <Flex
          flexDir="column"
          gap={{ base: 4, xl: 8 }}
          pt={{ base: '10px', xl: '40px' }}
          w="100%"
          display-name="about-us-content"
        >
          <Flex display-name="quotation-flex" w="100%" justify="start" align="center">
            <Image
              src={quotationMark}
              alt="quotation mark"
              w={{ base: '20px', xl: '40px' }}
              h={{ base: '20px', xl: '50px' }}
            />
          </Flex>
          <Flex
            display-name="about-us-content-flex"
            w="100%"
            justify="start"
            align="center"
            textAlign="center"
          >
            <Text fontSize="lg">
              There are many variations of passages of Lorem Ipsum available, but the majority have
              suffered alteration in some form, by injected humour, or randomised words which
              don&#39;t look even slightly believable. If you are going to use a passage of Lorem
              Ipsum, you need to be sure there isn&#39;t anything embarrassing hidden in the middle
              of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined
              chunks as necessary, making this the first true generator on the Internet. It uses a
              dictionary of over 200 Latin words, combined with a handful of model sentence
              structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum
              is therefore always free from repetition, injected humour, or non-characteristic words
              etc.
            </Text>
          </Flex>
          <Flex display-name="quotation-flex" w="100%" justify="end" align="center">
            <Image
              src={quotationMark}
              alt="quotation mark"
              w={{ base: '20px', xl: '40px' }}
              h={{ base: '20px', xl: '50px' }}
              transform="rotate(180deg)"
            />
          </Flex>
        </Flex>
        <Flex
          display-name="photo-description"
          w="100%"
          gap={4}
          flexDirection={{ base: 'column', xl: 'row' }}
        >
          <Flex display-name="photo" w={{ base: '100%', xl: '50%' }}>
            <Image src={human} h="373px" w="666px" />
          </Flex>
          <Flex
            display-name="description"
            justify="center"
            align="center"
            p={{ base: '0 4px', xl: '0 32px' }}
            background="#EEEBE6"
            w={{ base: '100%', xl: '50%' }}
          >
            <Text fontSize="md">
              There are many variations of passages of Lorem Ipsum available, but the majority have
              suffered alteration in some form, by injected humour, or randomised words which
              don&#39;t look even slightly believable. If you are going to use a passage of Lorem
              Ipsum, you need to be sure there isn&#39;t anything embarrassing hidden in the middle
              of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined
              chunks as necessary, making this the first true generator on the Internet. It uses a
              dictionary of over 200 Latin words, combined with a handful of model sentence
              structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum
              is therefore always free from repetition, injected humour, or non-characteristic words
              etc.
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </ContentLayout>
  )
}

export default AboutUs
