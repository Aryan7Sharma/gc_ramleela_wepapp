import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Testing from './Testing';

/** import components */

import Register from './components/Register';
import PageNotFound from './components/PageNotFound';

/** import components **/
import { ForgetPassword } from './components';

// pages
import { Home, GetDonation, AdminDashboard, SignIn, UserProfile, GenerateDonationReceipt, ChangePassword, AllReports, CollectorDashboard, CollectorManagement, ContactUs } from './pages/index';

/** auth middleware */
import { IsUserLoggedIN, ProtectAllUserRoute, ProtectAdminRoute, ProtectCollectorRoute } from './middleware/auth'

/** root routes */
const router = createBrowserRouter([
    {
        path: '/forgetPassword',
        element: <ForgetPassword></ForgetPassword>
    },
    {
        path: '/signin',
        element: <IsUserLoggedIN><SignIn /></IsUserLoggedIN>
    },
    {
        path: '/',
        element: <ProtectAllUserRoute><Home /></ProtectAllUserRoute>
    },
    {
        path: '/profile',
        element: <ProtectAllUserRoute> <UserProfile /> </ProtectAllUserRoute>
    },
    {
        path: '/changePassword',
        element: <ProtectAllUserRoute> <ChangePassword /> </ProtectAllUserRoute>
    },
    {
        path: '/contactUs',
        element: <ProtectAllUserRoute> <ContactUs /> </ProtectAllUserRoute>
    },
    {
        path: '/generatedonationreceipt',
        element: <ProtectAllUserRoute> <GenerateDonationReceipt /> </ProtectAllUserRoute>
    },
    {
        path: '/reports',
        element: <ProtectAllUserRoute> <AllReports /> </ProtectAllUserRoute>
    },
    {
        path: '/getdonation',
        element: <ProtectCollectorRoute> <GetDonation /> </ProtectCollectorRoute>
    },
    {
        path: '/collectorDashboard',
        element: <ProtectCollectorRoute> <CollectorDashboard /> </ProtectCollectorRoute>
    },
    {
        path: '/register',
        element: <ProtectAdminRoute> <Register /> </ProtectAdminRoute>
    },
    {
        path: '/manageCollectors',
        element: <ProtectAdminRoute> <CollectorManagement /> </ProtectAdminRoute>
    },
    {
        path: '/adminDashboard',
        element: <ProtectAdminRoute> <AdminDashboard /> </ProtectAdminRoute>
    },
    {
        path: '*',
        element: <PageNotFound></PageNotFound>
    },
    ,
    {
        path: '/testing',
        element: <Testing />
    }
])

export default function App() {
    return (
        <main>
            <RouterProvider router={router}></RouterProvider>
        </main>
    )
}
