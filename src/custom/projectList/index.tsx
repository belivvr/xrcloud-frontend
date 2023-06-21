import React from 'react'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { openDrawer } from 'store/slices/menu'

interface ProjectProps {
    isProject: boolean
    setIsProject: React.Dispatch<React.SetStateAction<boolean>>
}

const ProjectManages = ({ isProject, setIsProject }: ProjectProps) => {
    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(openDrawer(true))
        setIsProject(true)
    }
    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClick}>
                프로젝트 생성
            </Button>
        </div>
    )
}

export default ProjectManages
