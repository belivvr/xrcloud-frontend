import React, { useEffect } from 'react'
import { useDispatch } from 'store'
import { useRouter } from 'next/router'
import Link from 'Link'
// material-ui
import { useTheme } from '@mui/material/styles'
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography
} from '@mui/material'

// third party
import * as Yup from 'yup'
import { Formik } from 'formik'

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton'
import useAuth from 'hooks/useAuth'
import useScriptRef from 'hooks/useScriptRef'
import { strengthColor, strengthIndicator } from 'utils/password-strength'

// assets
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { StringColorProps } from 'types'

import useConfig from 'hooks/useConfig'
import { useLocalization } from 'hooks/useLocalization'

// ===========================|| JWT - REGISTER ||=========================== //

const JWTRegister = ({ ...others }) => {
    const theme = useTheme()
    const scriptedRef = useScriptRef()
    const router = useRouter()
    const [showPassword, setShowPassword] = React.useState(false)
    const [checked, setChecked] = React.useState(true)

    const [strength, setStrength] = React.useState(0)
    const [level, setLevel] = React.useState<StringColorProps>()
    const { login, register } = useAuth()

    const { locale } = useConfig()
    const localization = useLocalization(locale)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleMouseDownPassword = (event: React.SyntheticEvent) => {
        event.preventDefault()
    }

    const changePassword = (value: string) => {
        const temp = strengthIndicator(value)
        setStrength(temp)
        setLevel(strengthColor(temp))
    }

    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">{localization['sign-up-with']}</Typography>
                    </Box>
                </Grid>
            </Grid>

            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email(localization['valid-email']).max(255).required(localization['email-required']),
                    password: Yup.string()
                        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*+=-])[A-Za-z\d!@#$%^&*+=-]{8,}$/, localization['password-validity'])
                        .max(255)
                        .required(localization['password-required'])
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        if (!checked) {
                            throw new Error(localization['agree-term-error'])
                        }
                        await register(values.email, values.password)
                        await login(values.email, values.password)
                    } catch (err: any) {
                        setStatus({ success: false })
                        setSubmitting(false)
                        if (!err.response) {
                            setErrors({ submit: err.message })
                            return
                        }
                        if (err.response.status === 409) {
                            setErrors({ submit: localization['already-have-email'] })
                            return
                        }
                        setErrors({ submit: err.message })
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-email-register">{localization['email-address']}</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-register"
                                type="email"
                                value={values.email}
                                name="email"
                                onBlur={handleBlur}
                                onChange={(e) => {
                                    if (e.target.value.length > 50) return
                                    handleChange(e)
                                }}
                                inputProps={{}}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password-register">{localization.password}</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-register"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="password"
                                label={localization.password}
                                onBlur={handleBlur}
                                onChange={(e) => {
                                    if (e.target.value.length > 50) return
                                    handleChange(e)
                                    changePassword(e.target.value)
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                inputProps={{}}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-register">
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl>

                        {strength !== 0 && (
                            <FormControl fullWidth>
                                <Box sx={{ mb: 2 }}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Box
                                                style={{ backgroundColor: level?.color }}
                                                sx={{ width: 85, height: 8, borderRadius: '7px' }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" fontSize="0.75rem">
                                                {level?.label}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </FormControl>
                        )}

                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={checked}
                                            onChange={(event) => setChecked(event.target.checked)}
                                            name="checked"
                                            color="primary"
                                        />
                                    }
                                    label={
                                        <Typography
                                            variant="subtitle1"
                                            component={Link}
                                            target="_blank"
                                            href="https://kr.object.ncloudstorage.com/xrcloud-prod-frontend/%EC%9D%B4%EC%9A%A9%EC%95%BD%EA%B4%80%20%EB%B0%8F%20%EA%B0%9C%EC%9D%B8%EC%A0%95%EB%B3%B4%20%EC%9D%B4%EC%9A%A9%EC%95%88%EB%82%B4_231218.pdf"
                                        >
                                            {localization['agree-term']}
                                        </Typography>
                                    }
                                />
                            </Grid>
                        </Grid>
                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                >
                                    {localization['sign-up']}
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    )
}

export default JWTRegister
