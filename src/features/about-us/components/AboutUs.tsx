import { FC } from 'react'
import { ContentLayout } from '@/components/Layout'
import { Flex, Image, Text } from '@chakra-ui/react'
import quotationMark from '@/assets/images/quotation-mark.png'
import human from '@/assets/images/human.jpg'

const AboutUs: FC = () => {
  return (
    <ContentLayout pageTitle="About Us" showFullPageScroll>
      <Flex
        display-name="about-us-content-flex"
        w="100%"
        textAlign="justify"
        flexDir="column"
        flexWrap="wrap"
        p="0 40px"
        gap={4}
        mt="40px"
      >
        <Flex flexDir="column" gap={8} pt="40px" w="100%" display-name="about-us-content">
          <Flex display-name="quotation-flex" w="100%" justify="start" align="center">
            <Image src={quotationMark} alt="quotation mark" w="40px" h="50px" />
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
              suffered alteration in some form, by injected humour, or randomised words which don't
              look even slightly believable. If you are going to use a passage of Lorem Ipsum, you
              need to be sure there isn't anything embarrassing hidden in the middle of text. All
              the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as
              necessary, making this the first true generator on the Internet. It uses a dictionary
              of over 200 Latin words, combined with a handful of model sentence structures, to
              generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore
              always free from repetition, injected humour, or non-characteristic words etc.
            </Text>
          </Flex>
          <Flex display-name="quotation-flex" w="100%" justify="end" align="center">
            <Image
              src={quotationMark}
              alt="quotation mark"
              w="40px"
              h="50px"
              transform="rotate(180deg)"
            />
          </Flex>
        </Flex>
        <Flex display-name="photo-description" w="100%" gap={4}>
          <Flex display-name="photo" w="50%">
            <Image src={human} h="373px" w="666px" />
          </Flex>
          <Flex
            display-name="description"
            justify="center"
            align="center"
            p="0 32px"
            background="#EEEBE6"
            w="50%"
          >
            <Text fontSize="md">
              There are many variations of passages of Lorem Ipsum available, but the majority have
              suffered alteration in some form, by injected humour, or randomised words which don't
              look even slightly believable. If you are going to use a passage of Lorem Ipsum, you
              need to be sure there isn't anything embarrassing hidden in the middle of text. All
              the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as
              necessary, making this the first true generator on the Internet. It uses a dictionary
              of over 200 Latin words, combined with a handful of model sentence structures, to
              generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore
              always free from repetition, injected humour, or non-characteristic words etc.
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </ContentLayout>
  )
}

export default AboutUs
