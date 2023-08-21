import { forwardRef, ReactNode, Ref } from 'react'

// next
import Head from 'next/head'

// material-ui
import { Box, BoxProps } from '@mui/material'

// ==============================|| Page - SET TITLE & META TAGS ||============================== //

interface Props extends BoxProps {
    children: ReactNode
    meta?: ReactNode
    title: string
}

const Page = forwardRef<HTMLDivElement, Props>(({ children, title = '', meta, ...other }: Props, ref: Ref<HTMLDivElement>) => {
    return (
        <>
            <Head>
                {meta}
                <meta property="og:type" content="website" />
                <meta property="twitter:card" content="summary_large_image" />
                <link rel="icon" href="https://uploads-ssl.webflow.com/6449cc542956b39c2cb4660c/644e22096aae422abdb75902_icon_32x32.png" />
            </Head>

            <Box ref={ref} {...other}>
                {children}
            </Box>
        </>
    )
})

export default Page
