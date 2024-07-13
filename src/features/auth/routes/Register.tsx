import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Layout } from '@/components/Layout'
import { RegisterForm } from '@/features/auth'
import { storage } from '@/utils/storage'

export const Register: React.FC = () => {
  const navigate = useNavigate()

  const [from, setFrom] = useState<string>('/app')

  useEffect(() => {
    setFrom(storage.getItem('INCOMING_PATH') || '/app')
  }, [])

  const onSuccessFn = () => {
    if (from === '/') {
      navigate('/app')
    } else {
      navigate(from)
    }
  }

  return (
    <Layout headerText="Sign up">
      <RegisterForm onSuccess={onSuccessFn} />
    </Layout>
  )
}
