import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from "react";

const SignupSchema = yup.object().shape({
    firstName: yup.string()
        .matches(/^[a-zA-Z]{2,30}$/, 'First name must be 2–30 letters only')
        .required('First name is required'),
    lastName: yup.string()
        .matches(/^[a-zA-Z]{2,30}$/, 'Last name must be 2–30 letters only')
        .required('Last name is required'),
    email: yup.string()
        .email('Invalid email format')
        .required('Email is required'),
    password: yup.string()
        .min(8, 'Minimum 8 Characters')
        .matches(/[A-Z]/, 'Must Contain uppercase')
        .matches(/[a-z]/, 'Must contain lowercase')
        .matches(/[0-9]/, 'Must contain a number')
        .matches(/[^a-zA-Z0-9]/, 'Must contain special character')
        .required('Password is required'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    dob: yup.date()
        .test('age', 'Must be older than 15', function (value) {
            const today = new Date();
            const dob = new Date(value);
            const age = today.getFullYear() - dob.getFullYear();
            return age > 15;
        })
        .required('Date of birth is required'),
    gender: yup.string()
        .oneOf(['male', 'female', 'custom'], 'Invalid gender')
        .required('Gender is required'),
    phone: yup.string()
        .matches(/^\+\d{10,15}$/, "Must include country code starting with '+'")
        .required('Phone number is Required'),
    profileImage: yup.mixed()
        .nullable()
        .test('fileSize', 'File too large (max 5MB)', value => {
            if (!value) return true;
            return value.size <= 5 * 1024 * 1024;
        })
        .test('fileType', 'Unsupported Format', value => {
            if (!value) return true;
            return ['image/jpeg', 'image/jpg', 'image/png'].includes(value.type);
        }),
    coverImage: yup.mixed()
        .nullable()
        .test('fileSize', 'File too large (max 5MB)', value => {
            if (!value) return true;
            return value.size <= 5 * 1024 * 1024;
        })
        .test('fileType', 'Unsupported Format', value => {
            if (!value) return true;
            return ['image/jpeg', 'image/jpg', 'image/png'].includes(value.type);
        }),


});

const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: '',
    gender: '',
    phone: '',
    profileImage: null,
    coverImage: null
}



function SignupPage() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSignup = (values, { resetForm, setFieldError, setSubmitting }) => {

        const formData = new FormData();
        formData.append('firstName', values.firstName);
        formData.append('lastName', values.lastName);
        formData.append('email', values.email);
        formData.append('password', values.password);
        formData.append('dob', values.dob);
        formData.append('gender', values.gender);
        formData.append('phone', values.phone);
        if (values.profileImage) formData.append('profileImage', values.profileImage);
        if (values.coverImage) formData.append('coverImage', values.coverImage);

        // for backend
        axios.post('http://localhost:5000/api/auth/signup', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(res => {
            console.log("Signup Success:", res.data);
            alert('Signup Successful!');
            resetForm();
            navigate("/login");
        })
            .catch(err => {
                if (err.response) {
                    const msg = err.response.data.msg;

                    if (msg === "Email already exists") {
                        setFieldError("email", msg);
                    } else {
                        alert(msg || 'Signup failed');
                    }
                }
                else {
                    console.error("Signup Error:", err.message);
                    alert('Network or server error');
                }
                setSubmitting(false);
            });
        console.log('Ready to submit:', formData);
    }

    return (
        <div style={styles.container}>
            <h2>SignUp Page</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={SignupSchema}
                onSubmit={handleSignup}
            >
                {
                    ({ isSubmitting, setFieldValue }) => (
                        <Form style={styles.form}>
                            <div style={styles.inputGroup}>
                                <label>First Name:</label>
                                <Field name="firstName" type="text" style={styles.input} />
                                <ErrorMessage name="firstName" component="div" style={styles.error} />
                            </div>

                            <div style={styles.inputGroup}>
                                <label>Last Name:</label>
                                <Field name="lastName" type="text" style={styles.input} />
                                <ErrorMessage name="lastName" component="div" style={styles.error} />
                            </div>
                            <div style={styles.inputGroup}>
                                <label>Email:</label>
                                <Field name="email" type="email" style={styles.input} />
                                <ErrorMessage name="email" component='div' style={styles.error} />
                            </div>
                            <div style={styles.inputGroup}>
                                <label>Password:</label>
                                {/* <Field name="password" type="password" style={styles.input} /> */}
                                <div style={styles.passwordWrapper}>
                                    <Field
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        style={styles.input}
                                    />
                                    <span
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={styles.iconToggle}
                                    >
                                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                                    </span>
                                </div>
                                <ErrorMessage name="password" component="div" style={styles.error} />
                            </div>

                            <div style={styles.inputGroup}>
                                <label>Confirm Password:</label>
                                <div style={styles.passwordWrapper}>
                                    <Field
                                        name="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        style={styles.input }
                                    />
                                    <span
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        style={styles.iconToggle}
                                    >
                                        {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                                    </span>
                                </div>

                                <ErrorMessage name="confirmPassword" component="div" style={styles.error} />
                            </div>

                            <div style={styles.inputGroup}>
                                <label>Date of Birth:</label>
                                <Field name="dob" type="date" style={styles.input} />
                                <ErrorMessage name="dob" component="div" style={styles.error} />
                            </div>

                            <div style={styles.inputGroup}>
                                <label>Gender:</label>
                                <Field as="select" name="gender" style={styles.input}>
                                    <option value="">Select</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="custom">Custom</option>
                                </Field>
                                <ErrorMessage name="gender" component="div" style={styles.error} />
                            </div>

                            <div style={styles.inputGroup}>
                                <label>Phone:</label>
                                <Field name="phone" type="text" placeholder="+92XXXXXXXXXX" style={styles.input} />
                                <ErrorMessage name="phone" component="div" style={styles.error} />
                            </div>


                            <div style={styles.inputGroup}>
                                <label>Profile Image:</label>
                                <input
                                    type="file"
                                    name="profileImage"
                                    accept="image/jpeg,image/jpg,image/png"
                                    onChange={(e) => {
                                        setFieldValue('profileImage', e.currentTarget.files[0]);
                                    }} />
                                <ErrorMessage name="profileImage" component="div" style={styles.error} />
                            </div>

                            <div style={styles.inputGroup}>
                                <label>Cover Image:</label>
                                <input
                                    name="coverImage"
                                    type="file"
                                    accept="image/jpeg,image/jpg,image/png"
                                    onChange={(e) => { setFieldValue('coverImage', e.currentTarget.files[0]) }}
                                />
                                <ErrorMessage name="coverImage" component="div" style={styles.error} />
                            </div>
                            <button type="submit" disabled={isSubmitting} style={styles.button}>Signup</button>
                        </Form>
                    )
                }

            </Formik>
            <button type="button" onClick={() => navigate('/')} style={styles.buttonSecondary}>Go to Home</button>
        </div>
    )
}

const styles = {
    container: {
        textAlign: 'center',
        marginTop: '50px',
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
        padding: '8px',
        fontSize: '1rem',
        width: '100%',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    error: {
        color: 'red',
        fontSize: '0.9rem',
    },
    button: {
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '1rem',
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
        color: '#555'
    },
};
export default SignupPage;