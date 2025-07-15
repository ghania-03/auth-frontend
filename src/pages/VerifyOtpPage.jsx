import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function VerifyOtpPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email;

    if (!email) {
        return <div style={styles.container}>Email not provided. Please go back.</div>;
    }
    const OtpSchema = yup.object({
        otp: yup
            .string()
            .matches(/^\d{6}$/, 'OTP must be 6 digits')
            .required('OTP is required'),
    })
    const handleOtp = async (values, { setSubmitting, setFieldError }) => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/verify-otp', {
                email,
                otp: values.otp
            });

            alert('OTP verified successfully!');
            navigate('/reset-password', { state: { email, otpVerified: true } });
        } catch (err) {
            const msg = err.response?.data?.msg || 'OTP verification failed';
            setFieldError('otp', msg);
        } finally {
            setSubmitting(false);
        }
    }
    
    return (
        <div style={styles.container}>
            <h2>Verify OTP</h2>

            <Formik
                initialValues={{ otp: '' }}
                validationSchema={OtpSchema}
                onSubmit={handleOtp}
            >
                {({ isSubmitting }) => (
                    <Form style={styles.form}>
                        <div style={styles.inputGroup}>
                            <label>Enter OTP:</label>
                            <Field name="otp" type="text" style={styles.input} />
                            <ErrorMessage name="otp" component="div" style={styles.error} />
                        </div>

                        <button type="submit" disabled={isSubmitting} style={styles.button}>
                            Verify OTP
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/forgot-password')}
                            style={styles.buttonSecondary}
                        >
                            Back to Forgot Password
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
        backgroundColor: '#28a745',
        color: 'white',
        fontSize: '1rem',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    buttonSecondary: {
        marginTop: '10px',
        padding: '10px',
        backgroundColor: '#6c757d',
        color: 'white',
        fontSize: '1rem',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default VerifyOtpPage;
