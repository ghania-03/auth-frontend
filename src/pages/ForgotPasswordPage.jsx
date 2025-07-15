import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

function ForgotPasswordPage() {
    const navigate = useNavigate();
    const ForgetSchema = yup.object({
        email: yup.string().email('Invalid email').required('Email is required')
    })
    const handleForget = async (values, { setSubmitting, setFieldError }) => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/forgot-password', {
                email: values.email
            });

            alert('OTP sent to your email!');
            navigate('/verify-otp', { state: { email: values.email } });
        } catch (err) {
            const msg = err.response?.data?.msg || 'Something went wrong';
            setFieldError('email', msg);
        } finally {
            setSubmitting(false);
        }

    }
    return (
        <div style={styles.container}>
            <h2>Forgot Password</h2>

            <Formik
                initialValues={{ email: '' }}
                validationSchema={ForgetSchema}
                onSubmit={handleForget}
            >
                {({ isSubmitting }) => (
                    <Form style={styles.form}>
                        <div style={styles.inputGroup}>
                            <label>Email:</label>
                            <Field name="email" type="email" style={styles.input} />
                            <ErrorMessage name="email" component="div" style={styles.error} />
                        </div>

                        <button type="submit" disabled={isSubmitting} style={styles.button}>
                            {isSubmitting ? (
                                <>
                                    <FaSpinner style={{ marginRight: '8px', animation: 'spin 1s linear infinite' }} />
                                    Sending...
                                </>
                            ) : 'Send OTP'}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/login")}
                            style={styles.buttonSecondary}
                        >
                            Back to Login
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
        fontFamily: 'Arial'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        margin: '0 auto',
        gap: '15px'
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start'
    },
    input: {
        padding: '10px',
        fontSize: '1rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '100%'
    },
    error: {
        color: 'red',
        fontSize: '0.9rem'
    },
    button: {
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        fontSize: '1rem',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
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

export default ForgotPasswordPage;
