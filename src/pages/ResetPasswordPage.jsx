import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';

function ResetPasswordPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { email, otpVerified } = location.state || {};

    if (!email || !otpVerified) {
        return (
            <div style={styles.container}>
                Invalid access. Please go through the password reset process.
            </div>
        );
    }

    const ResetSchema = yup.object({
        password: yup
            .string()
            .min(8, 'At least 8 characters')
            .matches(/[A-Z]/, 'Must include uppercase letter')
            .matches(/[a-z]/, 'Must include lowercase letter')
            .matches(/[0-9]/, 'Must include number')
            .matches(/[^a-zA-Z0-9]/, 'Must include special character')
            .required('Password is required'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    const handleReset = async (values, { setSubmitting }) => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/reset-password', {
                email,
                newPassword: values.password,
            });

            alert('Password reset successful!');
            navigate('/login');
        } catch (err) {
            const msg = err.response?.data?.msg || 'Reset failed';
            alert(msg);
        } finally {
            setSubmitting(false);
        }
    }
    return (


        <div style={styles.container}>
            <h2>Reset Password</h2>

            <Formik
                initialValues={{ password: '', confirmPassword: '' }}
                validationSchema={ResetSchema}
                onSubmit={handleReset}
            >
                {({ isSubmitting }) => (
                    <Form style={styles.form}>
                        <div style={styles.inputGroup}>
                            <label>New Password:</label>
                            <div style={styles.passwordWrapper}>
                                <Field
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    style={styles.input}
                                />
                                <span onClick={() => setShowPassword(!showPassword)} style={styles.iconToggle}>
                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                </span>
                            </div>
                            <ErrorMessage name="password" component="div" style={styles.error} />
                        </div>

                        <div style={styles.inputGroup}>
                            <label>Confirm Password:</label>
                            <div style={styles.passwordWrapper}>
                                <Field
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    style={styles.input}
                                />
                                <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.iconToggle}>
                                    {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                                </span>
                            </div>
                            <ErrorMessage name="confirmPassword" component="div" style={styles.error} />
                        </div>

                        <button type="submit" disabled={isSubmitting} style={styles.button}>
                            Reset Password
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

const styles = {
    container: {
        textAlign: 'center',
        marginTop: '60px',
        fontFamily: 'Arial',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        margin: '0 auto',
        gap: '15px',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
    },
    input: {
        padding: '10px',
        fontSize: '1rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '100%',
    },
    error: {
        color: 'red',
        fontSize: '0.9rem',
    },
    button: {
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        fontSize: '1rem',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    passwordWrapper: {
        position: 'relative',
        width: '100%',
    },
    iconToggle: {
        position: 'absolute',
        right: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        color: '#555',
    },

};

export default ResetPasswordPage;
