// material-ui
import { useTheme } from '@mui/material/styles'
import { Box, Button, FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material'
import { useDispatch } from 'store'

// third party
import * as Yup from 'yup'
import { Formik } from 'formik'

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton'
import useAuth from 'hooks/useAuth'
import useScriptRef from 'hooks/useScriptRef'
import { openSnackbar } from 'store/slices/snackbar'

import useConfig from 'hooks/useConfig'
import { useLocalization } from 'hooks/useLocalization'

import { useRequest } from 'hooks/useRequest'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useRef } from 'react'

// ========================|| FIREBASE - FORGOT PASSWORD ||======================== //

const AuthForgotPassword = ({ ...others }) => {
    const theme = useTheme()
    const scriptedRef = useScriptRef()
    const dispatch = useDispatch()
    const { locale } = useConfig()
    const localization = useLocalization(locale)
    const { post } = useRequest()
    const { resetPassword } = useAuth()
    const router = useRouter()

    const otpInputRef = useRef<HTMLLabelElement>(null)

    return (
        <Formik
            initialValues={{
                email: '',
                otp: '',
                password: '',
                submit: null
            }}
            validationSchema={Yup.object().shape({
                email: Yup.string().email(localization['valid-email']).max(255).required(localization['email-required']),
                otp: Yup.string().required(),
                password: Yup.string()
                    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*+=-])[A-Za-z\d!@#$%^&*+=-]{9,}$/, localization['password-validity'])
                    .max(255)
                    .required(localization['password-required'])
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                    await axios.post(`/api/admins/reset-password`, {
                        code: values.otp,
                        email: values.email,
                        password: values.password
                    })

                    router.push(`/login`)
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
                        <InputLabel htmlFor="outlined-adornment-email-forgot">{localization['email-address']}</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-email-forgot"
                            type="email"
                            value={values.email}
                            name="email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inputProps={{}}
                        />
                        {touched.email && errors.email && (
                            <FormHelperText error id="standard-weight-helper-text-email-forgot">
                                {errors.email}
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
                            <Button
                                disableElevation
                                disabled={Boolean(errors.email)}
                                fullWidth
                                size="large"
                                variant="contained"
                                color="secondary"
                                onClick={async () => {
                                    try {
                                        await axios.post(`/api/admins/find-password`, { email: values.email })

                                        otpInputRef.current?.focus()
                                    } catch (err: any) {}
                                }}
                            >
                                {localization['send-mail']}
                            </Button>
                        </AnimateButton>
                    </Box>

                    <FormControl fullWidth error={Boolean(touched.otp && errors.otp)} sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-otp-forgot" ref={otpInputRef}>
                            OTP
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-otp-forgot"
                            type="text"
                            value={values.otp}
                            name="otp"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inputProps={{}}
                        />
                        {touched.otp && errors.otp && (
                            <FormHelperText error id="standard-weight-helper-text-email-forgot">
                                {errors.otp}
                            </FormHelperText>
                        )}
                    </FormControl>

                    <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-password-forgot">{localization['password']}</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password-forgot"
                            type="password"
                            value={values.password}
                            name="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inputProps={{}}
                        />
                        {touched.password && errors.password && (
                            <FormHelperText error id="standard-weight-helper-text-email-forgot">
                                {errors.password}
                            </FormHelperText>
                        )}
                    </FormControl>
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
                                {localization['modify']}
                            </Button>
                        </AnimateButton>
                    </Box>
                </form>
            )}
        </Formik>
    )
}

export default AuthForgotPassword
