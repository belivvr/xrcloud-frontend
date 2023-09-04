import styled from '@emotion/styled'
import React from 'react'
import { BsFillTrashFill } from 'react-icons/bs'

const TrashFillWrapper = styled.div`
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border-radius: 8px;
    cursor: pointer;
    z-index: 1000;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
    :hover {
        color: red;
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    }

    :active {
        color: #bb0000;
    }
`

interface Props {
    onClick: () => void
}

export default function ListDeleteIcon({ onClick }: Props) {
    return (
        <TrashFillWrapper onClick={onClick}>
            <BsFillTrashFill size="1.5rem" />
        </TrashFillWrapper>
    )
}
