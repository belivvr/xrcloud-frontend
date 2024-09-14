import { ReactElement } from 'react'
import { Locale, StaticProps } from 'types/config'

interface Props {
    locale: Locale
}

export const getServerSideProps = async (data: StaticProps) => {
    try {
        const { locale } = data

        // 서버 측에서 바로 리다이렉트 처리
        return {
            redirect: {
                destination: `/${locale}/projects`, // 리다이렉트할 경로
                permanent: false // 302 리다이렉트
            }
        }
    } catch (err) {
        console.error(err)
        return {
            props: {},
            notFound: true
        }
    }
}

const Landing = ({ locale }: Props) => {
    // 컴포넌트에서 별도의 처리는 필요 없음
    return null
}

Landing.getLayout = function getLayout(page: ReactElement) {
    return page
}

export default Landing
