import styled from '@emotion/styled'
import React from 'react'
import { BsFillTrashFill } from 'react-icons/bs'

const TrashFillIcon = styled(BsFillTrashFill)`
    cursor: pointer;

    :hover {
        color: #ff0000;
    }
    :active {
        color: #bb0000;
    }
`

interface Props {
    onClick: () => void
}

export default function MainCardTrashIcon({ onClick }: Props) {
    return (
        <div
            onClick={onClick}
            style={{
                minWidth: '2.5rem',
                height: '2.5rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '8px',
                boxShadow: '0 0 5px rgba(0,0,0,0.3)',
                marginRight: '1rem',
                cursor: 'pointer',
                zIndex: 999
            }}
        >
            <TrashFillIcon size="1.5rem" />
        </div>
    )
}
