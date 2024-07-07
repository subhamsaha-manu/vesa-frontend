import { Navigate, Route, Routes } from 'react-router-dom'

export const AdminSettingsRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  )
}
