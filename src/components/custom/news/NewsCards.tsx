/* eslint-disable @next/next/no-img-element */
import { Button, useMediaQuery, useTheme } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { MediumPost } from 'types/config'

interface Props {
    posts: MediumPost[]
}

export function NewsCards({ posts }: Props) {
    const theme = useTheme()
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <div style={{ display: 'grid', gridTemplateColumns: !matchDownMd ? '1fr 1fr 1fr' : '1fr 1fr', gap: '10px' }}>
            {posts.map((post, index) => {
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
                        href={post.link}
                    >
                        <img
                            style={{ width: '100%', height: '100%', maxHeight: '200px', borderRadius: '2px', objectFit: 'contain' }}
                            src={post.thumbnail}
                            alt=""
                        />
                        <div style={{ padding: '0.5rem' }}>
                            <div style={{ fontSize: '12px' }}>{post.title}</div>
                            <div style={{ fontSize: '12px' }}>{post.pubDate}</div>
                        </div>
                    </Button>
                )
            })}
        </div>
    )
}
