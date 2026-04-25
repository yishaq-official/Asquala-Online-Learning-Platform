import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import PublicLayout from '@/layouts/PublicLayout'
import DashboardLayout from '@/layouts/DashboardLayout'
import PlayerLayout from '@/layouts/PlayerLayout'
import ProtectedRoute from '@/features/auth/ProtectedRoute'

const HomePage      = lazy(() => import('@/pages/home'))
const CourseListPage = lazy(() => import('@/pages/course'))
const PlayerPage    = lazy(() => import('@/pages/player'))
const DashboardPage = lazy(() => import('@/pages/dashboard'))
const AuthPage      = lazy(() => import('@/pages/auth'))

const withSuspense = (Component) => (
  <Suspense fallback={<div className="p-8 text-center text-gray-400">Loading...</div>}>
    <Component />
  </Suspense>
)

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: '/',         element: withSuspense(HomePage) },
      { path: '/courses',  element: withSuspense(CourseListPage) },
      { path: '/login',    element: withSuspense(AuthPage) },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: '/dashboard', element: withSuspense(DashboardPage) },
        ],
      },
      {
        element: <PlayerLayout />,
        children: [
          { path: '/learn/:courseId/:lessonId', element: withSuspense(PlayerPage) },
        ],
      },
    ],
  },
])

export default router