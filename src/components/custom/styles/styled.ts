import styled from '@emotion/styled'
import AddIcon from '@mui/icons-material/Add'
import { Button } from '@mui/material'

export const EnterServiceButton = styled(Button)`
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background-color: white;
    border: 1px solid #eee;
    color: #000;
`
export const Label = styled.label`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background-color: #673ab7;
    border-radius: 4px;
    cursor: pointer;
    width: 120px;
    height: 40px;
    margin-left: 10px;
    margin-right: 10px;
`

export const StyledAddIcon = styled(AddIcon)`
    width: 300px;
    height: 300px;
`

export const ProjectListStyle = styled(Button)`
    display: flex;
    justify-content: start;
    align-items: center;
    width: 100%;
    padding: 16px;
    min-height: 100px;
    margin-top: 16px;
    font-size: 18px;
    font-weight: 500;
    color: #000;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`
export const ThumbnailContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 420px;
    border: 2px solid gray;
    border-radius: 8px;
`

export const ThumbnailBox = styled.div`
    width: 100%;
    height: 200px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-right: 8px;
`
export const ThumbnailInputBox = styled.div<{ htmlFor?: string }>`
    height: 90%;
    border: 1px solid #dddddd;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 8px;
`

export const ImagePreview = styled.img<{ src?: string; isHeight?: boolean }>`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    object-fit: contain;
    border-radius: 8px;
    margin: 8px;
    height: ${({ isHeight }) => (isHeight ? '100%' : 'auto')};
`

export const UploadName = styled.input`
    display: inline-block;
    height: 50px;
    padding: 0 10px;
    vertical-align: middle;
    border: 1px solid #dddddd;
    border-radius: 8px;
    width: 80%;
    color: #546e7a;
`

export const InputFile = styled.input`
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
`

export const ButtonBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 24px;
`

export const FindFileBox = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    margin-left: 4px;
`

export const Content = styled.div`
    display: flex;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid #eee;
    position: relative;
`

export const ContentTitle = styled.div`
    min-width: 300px;
    margin-right: 20%;
`
