import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';

const LoginSchema = yup.object().shape({
    email: yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    password: yup.string().required("Password is required"),
    rememberMe: yup.boolean()
});

function LoginPage() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (values, { setSubmitting, resetForm }) => {
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", {
                email: values.email,
                password: values.password,
            });

            const { token, user } = res.data;

            if (values.rememberMe) {
                localStorage.clear();
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
            } else {
                sessionStorage.clear();
                sessionStorage.setItem("token", token);
                sessionStorage.setItem("user", JSON.stringify(user));
            }

            alert("Login successful!");
            resetForm();
            navigate("/profile");

        } catch (err) {
            console.error("Login error:", err);
            const message = err.response?.data?.msg || "Login failed";
            alert(message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div style={styles.container}>
            <h2>Login Page</h2>

            <Formik
                initialValues={{ email: "", password: "", rememberMe: false }}
                validationSchema={LoginSchema}
                onSubmit={handleLogin}
            >
                {({ isSubmitting }) => (
                    <Form style={styles.form}>
                        <div style={styles.inputGroup}>
                            <label>Email:</label>
                            <Field name="email" type="email" style={styles.input} />
                            <ErrorMessage name="email" component="div" style={styles.error} />
                        </div>

                        <div style={styles.inputGroup}>
                            <label>Password:</label>
                            <div style={styles.passwordWrapper}>
                                <Field
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    style={styles.passwordInput}
                                />
                                <span
                                    onClick={() => setShowPassword(prev => !prev)}
                                    style={styles.eyeIcon}
                                >
                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                </span>
                            </div>
                            <ErrorMessage name="password" component="div" style={styles.error} />
                        </div>

                        <div style={styles.optionsRow}>
                            <label style={styles.rememberMe}>
                                <Field type="checkbox" name="rememberMe" />
                                Remember Me
                            </label>

                            <span
                                style={styles.forgotPasswordText}
                                onClick={() => navigate("/forgot-password")}
                            >
                                Forgot Password
                            </span>
                        </div>

                        <button type="submit" disabled={isSubmitting} style={styles.button}>
                            {isSubmitting ? "Logging in..." : "Login"}
                        </button>
                    </Form>
                )}
            </Formik>

            <button
                type="button"
                onClick={() => navigate("/")}
                style={styles.buttonSecondary}
            >
                Go to Home
            </button>
        </div>
    );
}

const styles = {
    container: {
        textAlign: "center",
        marginTop: "60px",
        fontFamily: "Arial",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        width: "300px",
        margin: "0 auto",
        gap: "15px",
    },
    inputGroup: {
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
    },
    input: {
        padding: "10px",
        fontSize: "1rem",
        borderRadius: "4px",
        border: "1px solid #ccc",
        width: "100%",
    },
    error: {
        color: "red",
        fontSize: "0.9rem",
    },
    button: {
        padding: "10px",
        backgroundColor: "#28a745",
        color: "white",
        fontSize: "1rem",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        width: "100%",
    },
    buttonSecondary: {
        marginTop: "10px",
        padding: "10px",
        backgroundColor: "#6c757d",
        color: "white",
        fontSize: "1rem",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        width: "100%",
    },
    passwordWrapper: {
        position: "relative",
        width: "100%",
    },

    passwordInput: {
        padding: "10px",
        fontSize: "1rem",
        borderRadius: "4px",
        border: "1px solid #ccc",
        width: "100%", // consistent width like other inputs

    },

    eyeIcon: {
        position: "absolute",
        right: "10px",
        top: "50%",
        transform: "translateY(-50%)",
        cursor: "pointer",
        color: "#555",
        fontSize: "1.1rem",
    },
    forgotPasswordWrapper: {
        textAlign: "right",
        width: "100%",
    },

    forgotPasswordText: {
        color: "#007bff",
        cursor: "pointer",
        textDecoration: "underline",
    },
    optionsRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        fontSize: "0.9rem",
    },

    rememberMe: {
        display: "flex",
        alignItems: "center",
        gap: "5px",
    },
};

export default LoginPage;
