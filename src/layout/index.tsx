// project import
import LAYOUT, { Props } from 'constant'
import MainLayout from './MainLayout'
import MinimalLayout from './MinimalLayout'
import AuthGuard from 'utils/route-guard/AuthGuard'
import GuestGuard from 'utils/route-guard/GuestGuard'
import LandingLayout from './MainLayout/LandingLayout'

// ==============================|| LAYOUTS - STRUCTURE ||============================== //

export default function Layout({ variant = LAYOUT.main, children }: Props) {
    switch (variant) {
        case 'landing':
            return <LandingLayout>{children}</LandingLayout>

        case LAYOUT.minimal:
            return <MinimalLayout>{children}</MinimalLayout>

        case LAYOUT.noauth:
            return (
                <GuestGuard>
                    <MinimalLayout>{children}</MinimalLayout>
                </GuestGuard>
            )

        default:
            return (
                <AuthGuard>
                    <MainLayout>{children}</MainLayout>
                </AuthGuard>
            )
    }
}
