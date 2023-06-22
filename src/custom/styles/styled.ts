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
export const ThumbnailContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 420px;
    border: 2px solid gray;
    border-radius: 8px;
    // background-color: green;
`

export const ThumbnailBox = styled.div`
    width: 100%;
    height: 200px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-right: 8px;
    // background-color: green;
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

export const ImagePreview = styled.img<{ src?: string }>`
    width: 30%;
    height: 200px;
    backgroundcolor: yellow;
    object-fit: contain;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    margin: 8px;
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
export const Label = styled.label`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background-color: pink;
    border-radius: 4px;
    cursor: pointer;
    width: 120px;
    height: 40px;
    margin-left: 10px;
    margin-right: 10px;
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
