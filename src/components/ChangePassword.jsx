import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ChangePasswordSchema = yup.object().shape({
  currentPassword: yup.string().required('Current password is required'),
  newPassword: yup.string()
    .min(8, 'Minimum 8 characters')
    .matches(/[A-Z]/, 'Must contain an uppercase letter')
    .matches(/[a-z]/, 'Must contain a lowercase letter')
    .matches(/[0-9]/, 'Must contain a number')
    .matches(/[^a-zA-Z0-9]/, 'Must contain a special character')
    .required('New password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm password is required'),
});

function ChangePassword() {
  const [message, setMessage] = useState('');
  const [show, setShow] = useState({ current: false, new: false, confirm: false });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    try {
      const res = await axios.patch(
        'http://localhost:5000/api/user/change-password',
        values,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setMessage(res.data.msg);
      resetForm();
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Password update failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <h3>Change Password</h3>

      <Formik
        initialValues={{ currentPassword: '', newPassword: '', confirmPassword: '' }}
        validationSchema={ChangePasswordSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form style={styles.form}>
            <div style={styles.inputGroup}>
              <label>Current Password</label>
              <div style={styles.passwordWrapper}>
                <Field
                  type={show.current ? 'text' : 'password'}
                  name="currentPassword"
                  style={styles.input}
                />
                <span
                  style={styles.eyeIcon}
                  onClick={() => setShow(prev => ({ ...prev, current: !prev.current }))}
                >
                  {show.current ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              <ErrorMessage name="currentPassword" component="div" style={styles.error} />
            </div>

            <div style={styles.inputGroup}>
              <label>New Password</label>
              <div style={styles.passwordWrapper}>
                <Field
                  type={show.new ? 'text' : 'password'}
                  name="newPassword"
                  style={styles.input}
                />
                <span
                  style={styles.eyeIcon}
                  onClick={() => setShow(prev => ({ ...prev, new: !prev.new }))}
                >
                  {show.new ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              <ErrorMessage name="newPassword" component="div" style={styles.error} />
            </div>

            <div style={styles.inputGroup}>
              <label>Confirm Password</label>
              <div style={styles.passwordWrapper}>
                <Field
                  type={show.confirm ? 'text' : 'password'}
                  name="confirmPassword"
                  style={styles.input}
                />
                <span
                  style={styles.eyeIcon}
                  onClick={() => setShow(prev => ({ ...prev, confirm: !prev.confirm }))}
                >
                  {show.confirm ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              <ErrorMessage name="confirmPassword" component="div" style={styles.error} />
            </div>

            <button type="submit" disabled={isSubmitting} style={styles.button}>
              {isSubmitting ? 'Updating...' : 'Update Password'}
            </button>
            {message && <p>{message}</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
}

const styles = {
  container: {
    marginTop: '40px',
    textAlign: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px'
  },
  inputGroup: {
    width: '100%',
    maxWidth: '300px',
    textAlign: 'left'
  },
  input: {
    padding: '8px',
    width: '100%',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  error: {
    color: 'red',
    fontSize: '0.9rem'
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#0059b8ff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'pointer'
  },
  passwordWrapper: {
    position: 'relative'
  },
  eyeIcon: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    color: '#555'
  }
};

export default ChangePassword;
