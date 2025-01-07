import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
    return (
        <Html>
            <Head>
                <meta name="theme-color" content="#2296f3" />
                {/* <meta name="title" content="XRCLOUD - BELIVVR" />
                <meta name="description" content="Homepage Development Costs 3D Spatial Web, Metaverse Services" />
                <meta
                    name="keywords"
                    content="METAVERSE, CLOUD, PAAS, SAAS, SERVICE, PLATFORM, TECHNOLOGY, Web, WebXR, VR, Internet, 3D Web, 메타버스,  클라우드, 플랫폼, 파스, 서비스, 기술, 웹, 웹XR, VR, 인터넷, 3D web"
                />
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="website" /> */}
                <meta property="og:url" content="/assets/images/logo_og2.png" />
                {/* <meta property="og:site_name" content="XRCLOUD - BELIVVR" />
                <meta property="og:title" content="XRCLOUD - BELIVVR" />
                <meta property="og:description" content="Homepage Development Costs 3D Spatial Web, Metaverse Services" /> */}
                <meta property="og:image" content="/assets/images/logo_og2.png" />
                {/* <meta property="twitter:card" content="summary_large_image" /> */}
                <meta property="twitter:url" content="/assets/images/logo_og2.png" />
                {/* <meta property="twitter:title" content="XRCLOUD - BELIVVR" />
                <meta property="twitter:description" content="Homepage Development Costs 3D Spatial Web, Metaverse Services" /> */}
                <meta property="twitter:image" content="/assets/images/logo_og2.png" />

                <link rel="icon" href="https://uploads-ssl.webflow.com/6449cc542956b39c2cb4660c/644e22096aae422abdb75902_icon_32x32.png" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap"
                    rel="stylesheet"
                />
                <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=G-EG0QKXX746`} />
                {/* Global Site Tag (gtag.js) - Google Analytics */}
                <Script
                    id="gtag-init"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-EG0QKXX746');
                        `
                    }}
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
