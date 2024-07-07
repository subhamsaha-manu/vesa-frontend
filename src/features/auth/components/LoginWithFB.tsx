import { Flex } from '@chakra-ui/react'
import React from 'react'
import FacebookLogin, {
  ReactFacebookFailureResponse,
  ReactFacebookLoginInfo,
} from 'react-facebook-login'

type LoginWithFBProps = {
  onSuccessFn: (response: ReactFacebookLoginInfo | ReactFacebookFailureResponse) => void
  buttonText: string
}

export const LoginWithFB: React.FC<LoginWithFBProps> = ({ onSuccessFn, buttonText }) => {
  const fbAppId = '725633465348035'

  return (
    <Flex display-name="login-with-fb-container">
      <FacebookLogin
        appId={fbAppId}
        fields="name,email"
        callback={onSuccessFn}
        size="small"
        textButton={buttonText}
        buttonStyle={{ textTransform: 'none' }}
      />
    </Flex>
  )
}
