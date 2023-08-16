// material-ui
import LinearProgress from '@mui/material/LinearProgress'
import { styled } from '@mui/material/styles'

// styles
const LoaderWrapper = styled('div')({
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1301,
    width: '100%'
})

// ==============================|| LOADER ||============================== //

interface Props {
    meta?: JSX.Element
}

const Loader = ({ meta }: Props) => (
    <LoaderWrapper>
        {meta}
        <LinearProgress color="primary" />
    </LoaderWrapper>
)

export default Loader
