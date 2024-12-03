import { Flex } from '@chakra-ui/react'
import { Accordion, AccordionItem } from '@nextui-org/react'
import { ArrowDown02Icon, ArrowUp01Icon } from 'hugeicons-react'
import React, { FC } from 'react'

export const SEOContent: FC = () => {
  const defaultContent =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

  return (
    <Flex w="100%" display-name="app-footer-seo-content" mt="50px" p={{ base: '0 20px', xl: '0' }}>
      <Accordion variant="splitted" style={{ padding: 0 }}>
        <AccordionItem
          key="anchor"
          aria-label="Anchor"
          indicator={({ isOpen }) => (isOpen ? <ArrowUp01Icon /> : <ArrowDown02Icon />)}
          title="Know more about VESA"
        >
          {defaultContent}
        </AccordionItem>
      </Accordion>
    </Flex>
  )
}
