import { Button, useMediaQuery, useTheme } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/router' // Import useRouter from next/router / next/router에서 useRouter를 임포트
import { MediumPost } from 'types/config'

// Define the type for `posts` / `posts`의 타입 정의
interface Props {
    posts: MediumPost[]
}

// Define the `NewsCards` component / `NewsCards` 컴포넌트 정의
export function NewsCards({ posts }: Props) {
    const theme = useTheme() // Get the theme / 테마 가져오기
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md')) // Check if the screen is smaller than the medium breakpoint / 화면이 중간 크기 이하인지 확인

    const router = useRouter() // Get the router object / 라우터 객체 가져오기
    const { asPath } = router // Get the current path / 현재 경로 가져오기

    // Function to remove language prefix (/en, /ko) from the path
    // 경로에서 언어 접두사 (/en, /ko)를 제거하는 함수
    const cleanPath = (path: string): string => {
        return path.replace(/^\/(en|ko)/, '') // Remove /en or /ko prefix / /en 또는 /ko 접두사 제거
    }

    // Function to extract the first image from description
    // 설명에서 첫 번째 이미지를 추출하는 함수
    const extractFirstImage = (description: string): string => {
        // Use a regex to find the first <img> tag and extract the src attribute
        // 정규식을 사용하여 첫 번째 <img> 태그에서 src 속성을 추출
        const imgRegex = /<img[^>]+src="([^">]+)"/
        const match = description.match(imgRegex)
        // Return the image URL if it exists, otherwise return an empty string
        // 이미지 URL이 있으면 반환, 그렇지 않으면 빈 문자열 반환
        return match ? match[1] : ''
    }

    // Set the default image URL
    // 기본 이미지 URL 설정
    const defaultImage = '/assets/images/image_not_available.png'

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: !matchDownMd ? '1fr 1fr 1fr' : '1fr 1fr', // Adjust grid based on screen size / 화면 크기에 따라 그리드 조정
                gap: '10px'
            }}
        >
            {/* Create buttons for each post / 각 포스트에 대한 버튼 생성 */}
            {posts.map((post, index) => {
                // If there's no thumbnail, extract the first image from the description or use the default image
                // 썸네일이 없으면 설명에서 첫 번째 이미지를 추출하거나 기본 이미지를 사용
                const imageUrl = post.thumbnail || extractFirstImage(post.description) || defaultImage

                return (
                    <Button
                        key={index}
                        style={{
                            display: 'flex',
                            alignItems: 'start',
                            flexDirection: 'column',
                            border: '1px solid #eee',
                            textAlign: 'start'
                        }}
                        component={Link}
                        target="_blank"
                        href={cleanPath(post.link)} // Use the cleaned path here / 여기서 정리된 경로 사용
                    >
                        {/* Render the image / 이미지 렌더링 */}
                        <img
                            style={{
                                width: '100%',
                                height: '100%',
                                maxHeight: '200px',
                                borderRadius: '2px',
                                objectFit: 'contain'
                            }}
                            src={imageUrl}
                            alt={post.title}
                        />
                        <div style={{ padding: '0.5rem' }}>
                            <div style={{ fontSize: '12px' }}>{post.title}</div> {/* Render the post title / 포스트 제목 렌더링 */}
                            <div style={{ fontSize: '12px' }}>{post.pubDate}</div> {/* Render the post date / 포스트 날짜 렌더링 */}
                        </div>
                    </Button>
                )
            })}
        </div>
    )
}
