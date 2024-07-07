import { ButtonGroup, ButtonGroupProps, IconButton } from '@chakra-ui/react'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

export const SocialMediaLinks = (props: ButtonGroupProps) => (
  <ButtonGroup variant="ghost" color="gray.600" {...props}>
    <IconButton
      target="_blank"
      as="a"
      href="https://www.linkedin.com/in/subham-saha/"
      aria-label="LinkedIn"
      icon={<FaLinkedin fontSize="20px" />}
    />
    <IconButton
      as="a"
      target="_blank"
      href="https://github.com/subhamsaha-manu"
      aria-label="GitHub"
      icon={<FaGithub fontSize="20px" />}
    />
    <IconButton as="a" href="#" aria-label="Twitter" icon={<FaTwitter fontSize="20px" />} />
  </ButtonGroup>
)
