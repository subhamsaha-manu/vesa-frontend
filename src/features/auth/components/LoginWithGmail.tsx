import { Flex, useToast } from '@chakra-ui/react'
import { gapi } from 'gapi-script'
import React, { FC, useEffect } from 'react'
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login'

type LoginWithGmailProps = {
  onSuccessFn: (res: GoogleLoginResponse | GoogleLoginResponseOffline) => void
  buttonText: string
}
export const LoginWithGmail: FC<LoginWithGmailProps> = ({ onSuccessFn, buttonText }) => {
  const toast = useToast()
  const clientId = '455012000491-r4ab6i5d7q4augp0ca8flssr6id279re.apps.googleusercontent.com'

  useEffect(() => {
    const initClient = () => {
      gapi.auth2.init({
        clientId,
        scope: '',
      })
    }
    gapi.load('client:auth2', initClient)
  })

  const onFailure = () => {
    toast({
      title: 'Could not get profile information via Google',
      status: 'error',
      isClosable: true,
    })
  }

  return (
    <Flex display-name="login-with-gmail-container">
      <GoogleLogin
        clientId={clientId}
        buttonText={buttonText}
        onSuccess={onSuccessFn}
        onFailure={onFailure}
        cookiePolicy="single_host_origin"
        isSignedIn={false}
      />
    </Flex>
  )
}
