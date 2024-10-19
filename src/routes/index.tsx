import { lazy, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'

import { SpinnerContainer } from '@/components/elements/Spinner'
import { ErrorFallback, MainLayout, ScrollToTop } from '@/components/Layout'
import { CurrentUserContextProvider, UserWishlistCartContextProvider } from '@/context'
import { Dashboard } from '@/features/dashboard'
import { CategoryProducts, ProductDetailsContainer } from '@/features/product'
import { Checkout } from '@/features/user-cart'

const AboutUs = lazy(() => import('@/features/about-us'))
const ContactUs = lazy(() => import('@/features/contact-us'))
const UserCart = lazy(() => import('@/features/user-cart'))

const UserWishlist = lazy(() => import('@/features/user-wishlist'))
const UserAccount = lazy(() => import('@/features/account'))
const AuthContainer = lazy(() => import('@/features/auth/components/AuthContainer'))

const Orders = lazy(() =>
  import('@/features/user-order-history').then((module) => ({ default: module.Orders }))
)
const OrderDetails = lazy(() =>
  import('@/features/user-order-history').then((module) => ({ default: module.OrderDetails }))
)
const Addresses = lazy(() => import('@/features/user-shipping-address'))
const AdminDashboard = lazy(() => import('@/features/admin'))

const ReceivedOrdersContainer = lazy(() =>
  import('@/features/admin/components').then((module) => ({
    default: module.ReceivedOrdersContainer,
  }))
)

const AdminOrderDetails = lazy(() =>
  import('@/features/admin/components').then((module) => ({
    default: module.OrderDetails,
  }))
)
const ProductsContainer = lazy(() =>
  import('@/features/admin/components').then((module) => ({
    default: module.ProductsContainer,
  }))
)
const EditProductContainer = lazy(() =>
  import('@/features/admin/components').then((module) => ({
    default: module.EditProductContainer,
  }))
)

const App = () => {
  return (
    <CurrentUserContextProvider>
      <UserWishlistCartContextProvider>
        <MainLayout>
          <ErrorBoundary fallback={<ErrorFallback />}>
            <Suspense fallback={<SpinnerContainer />}>
              <Outlet />
            </Suspense>
          </ErrorBoundary>
        </MainLayout>
      </UserWishlistCartContextProvider>
    </CurrentUserContextProvider>
  )
}

export const AppRoutes = () => {
  const userAccountRoutes = {
    path: 'account',
    element: (
      <ErrorBoundary fallback={<ErrorFallback />}>
        <UserAccount />
      </ErrorBoundary>
    ),
    children: [
      { path: 'addresses', element: <Addresses /> },
      { path: 'orders', element: <Orders /> },
      { path: 'orders/:orderId', element: <OrderDetails /> },
    ],
  }

  const adminRoutes = {
    path: 'admin',
    element: (
      <ErrorBoundary fallback={<ErrorFallback />}>
        <AdminDashboard />
      </ErrorBoundary>
    ),
    children: [
      { path: '', element: <ReceivedOrdersContainer /> },
      { path: 'order/:orderId', element: <AdminOrderDetails /> },
      { path: 'products', element: <ProductsContainer /> },
      { path: 'product/:productId', element: <EditProductContainer /> },
    ],
  }

  const commonRoutes = [
    {
      path: '/',
      element: (
        <>
          <ScrollToTop />
          <App />
        </>
      ),
      children: [
        { path: '/', element: <Dashboard /> },
        { path: 'product-category/:categoryName', element: <CategoryProducts /> },
        { path: 'product/:productId', element: <ProductDetailsContainer /> },
        { path: 'cart', element: <UserCart /> },
        { path: 'wishlist', element: <UserWishlist /> },
        { path: 'checkout', element: <Checkout /> },
        { path: 'about-us', element: <AboutUs /> },
        { path: 'contact-us', element: <ContactUs /> },
        userAccountRoutes,
        adminRoutes,
      ],
    },
  ]

  const authenticateRoute = {
    path: 'auth',
    element: (
      <ErrorBoundary fallback={<ErrorFallback />}>
        <MainLayout>
          <AuthContainer />
        </MainLayout>
      </ErrorBoundary>
    ),
  }
  const fallbackRoute = { path: '*', element: <Navigate to="/" replace /> }

  const routes = [...commonRoutes, authenticateRoute, fallbackRoute]

  return useRoutes(routes)
}
