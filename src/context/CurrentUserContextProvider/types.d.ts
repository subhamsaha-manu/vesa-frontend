import { User } from '@/types'

export type CurrentUserContextType = {
  currentUser: User
  setCurrentUser: (user: User) => void
}
