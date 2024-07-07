import { Navigate, Route, Routes } from 'react-router-dom'

import { Questions } from './Questions'

export const AdminSettingsRoutes = () => {
  return (
    <Routes>
      <Route path="/questions" element={<Questions />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  )
}
