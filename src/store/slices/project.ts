import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'store'

interface Project {
    id: number
    name: string
}

interface ProjectState {
    projectList: Project[]
}

const initialState: ProjectState = {
    projectList: []
}

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        addProject: (state, action: PayloadAction<Project>) => {
            state.projectList.push(action.payload)
        }
    }
})

export const { addProject } = projectSlice.actions
export default projectSlice.reducer

export const selectProjectList = (state: RootState) => state.project.projectList
