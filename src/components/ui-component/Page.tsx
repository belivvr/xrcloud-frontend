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

const Page = forwardRef<HTMLDivElement, Props>(({ children, title = '', meta, ...other }: Props, ref: Ref<HTMLDivElement>) => (
    <>
        <Head>
            <title>{`${title} | XRCLOUD`}</title>
            <meta name="title" content="XRCLOUD - BELIVVR" />
            <meta name="description" content="Homepage Development Costs 3D Spatial Web, Metaverse Services" />
            <meta
                name="keywords"
                content="METAVERSE, CLOUD, PAAS, SAAS, SERVICE, PLATFORM, TECHNOLOGY, Web, WebXR, VR, Internet, 3D Web, 메타버스,  클라우드, 플랫폼, 파스, 서비스, 기술, 웹, 웹XR, VR, 인터넷, 3D web"
            />
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://kr.object.ncloudstorage.com/xrcloud-prod-backend/belivvr.png" />
            <meta property="og:site_name" content="XRCLOUD - BELIVVR" />
            <meta property="og:title" content="XRCLOUD - BELIVVR" />
            <meta property="og:description" content="Homepage Development Costs 3D Spatial Web, Metaverse Services" />
            <meta property="og:image" content="https://kr.object.ncloudstorage.com/xrcloud-prod-backend/belivvr.png" />
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content="https://kr.object.ncloudstorage.com/xrcloud-prod-backend/belivvr.png" />
            <meta property="twitter:title" content="XRCLOUD - BELIVVR" />
            <meta property="twitter:description" content="Homepage Development Costs 3D Spatial Web, Metaverse Services" />
            <meta property="twitter:image" content="https://kr.object.ncloudstorage.com/xrcloud-prod-backend/belivvr.png" />

            <link rel="icon" href="https://uploads-ssl.webflow.com/6449cc542956b39c2cb4660c/644e22096aae422abdb75902_icon_32x32.png" />
            {meta}
        </Head>

        <Box ref={ref} {...other}>
            {children}
        </Box>
    </>
))

export default Page
