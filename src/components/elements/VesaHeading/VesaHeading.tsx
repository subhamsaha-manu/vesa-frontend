import { Heading } from '@chakra-ui/react'
import { FC } from 'react'

type VesaHeadingProps = {
  text: string
  color?: string
  fontSize?: { base: string; xl: string }
}

const VesaHeading: FC<VesaHeadingProps> = ({
  text,
  color = '#1E355B',
  fontSize = { base: '36px', xl: '60px' },
}) => (
  <Heading fontSize={fontSize} color={color} fontWeight="500">
    {text}
  </Heading>
)

export default VesaHeading
