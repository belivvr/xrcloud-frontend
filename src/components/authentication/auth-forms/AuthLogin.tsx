import React from 'react'
import Link from 'Link'

// material-ui
import { useTheme } from '@mui/material/styles'
import {
    Box,
    Button,
    FormControl,
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

// assets
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

import useConfig from 'hooks/useConfig'
import { useLocalization } from 'hooks/useLocalization'

// ===============================|| JWT LOGIN ||=============================== //

const JWTLogin = ({ loginProp, ...others }: { loginProp?: number }) => {
    const theme = useTheme()

    const { login } = useAuth()
    const scriptedRef = useScriptRef()
    const { locale } = useConfig()
    const localization = useLocalization(locale)

    const [showPassword, setShowPassword] = React.useState(false)
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleMouseDownPassword = (event: React.MouseEvent) => {
        event.preventDefault()!
    }

    return (
        <Formik
            initialValues={{
                email: 'benny@belivvr.com',
                password: 'qwer1234',
                submit: null
            }}
            validationSchema={Yup.object().shape({
                email: Yup.string().email(localization['valid-email']).max(255).required(localization['email-required']),
                password: Yup.string().max(255).required(localization['password-required'])
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                    await login(values.email, values.password)

                    if (scriptedRef.current) {
                        setStatus({ success: true })
                        setSubmitting(false)
                    }
                } catch (err: any) {
                    console.error(err)
                    if (scriptedRef.current) {
                        setStatus({ success: false })
                        setErrors({ submit: err.message })
                        setSubmitting(false)
                    }
                }
            }}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <form noValidate onSubmit={handleSubmit} {...others}>
                    <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-email-login">
                            {localization['email-address']} / {localization.username}
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-email-login"
                            type="email"
                            value={values.email}
                            name="email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inputProps={{}}
                        />
                        {touched.email && errors.email && (
                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                {errors.email}
                            </FormHelperText>
                        )}
                    </FormControl>

                    <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-password-login">{localization.password}</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password-login"
                            type={showPassword ? 'text' : 'password'}
                            value={values.password}
                            name="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
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
                            label="Password"
                        />
                        {touched.password && errors.password && (
                            <FormHelperText error id="standard-weight-helper-text-password-login">
                                {errors.password}
                            </FormHelperText>
                        )}
                    </FormControl>

                    {errors.submit && (
                        <Box sx={{ mt: 3 }}>
                            <FormHelperText error>{errors.submit}</FormHelperText>
                        </Box>
                    )}
                    <Box sx={{ mt: 2 }}>
                        <AnimateButton>
                            <Button color="secondary" disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
                                {localization['sign-in']}
                            </Button>
                        </AnimateButton>
                    </Box>
                </form>
            )}
        </Formik>
    )
}

export default JWTLogin
