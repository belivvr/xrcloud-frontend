import styled from '@emotion/styled'
import AddIcon from '@mui/icons-material/Add'

export const EnterServiceButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    width: 300px;
    height: 300px;
    background-color: white;
    border-radius: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    &:hover {
        background-color: #f5f5f5;
        cursor: pointer;
    }
`

export const StyledAddIcon = styled(AddIcon)`
    width: 300px;
    height: 300px;
`

export const ProjectListStyle = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    width: 100%;
    height: 100px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    &:hover {
        background-color: #f5f5f5;
        cursor: pointer;
    }
    margin-top: 16px;
`
