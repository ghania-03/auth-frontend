import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const EditProfileSchema = yup.object().shape({
  phone: yup.string()
    .matches(/^\+\d{10,15}$/, "Must include country code starting with '+'")
    .required('Phone is required'),
  gender: yup.string().oneOf(['male', 'female', 'custom']).required('Gender is required'),
  dob: yup.date().required('Date of birth is required'),
});

function EditProfileForm({ currentValues, onUpdated }) {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await axios.put('http://localhost:5000/api/user/update-profile', values, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('Profile updated!');
      onUpdated(res.data.user); 
    } catch (err) {
      alert(err.response?.data?.msg || 'Update failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ marginTop: '30px' }}>
      <h3>Edit Profile Info</h3>
      <Formik
        initialValues={{
          phone: currentValues.phone || '',
          gender: currentValues.gender || '',
          dob: currentValues.dob ? currentValues.dob.slice(0, 10) : ''
        }}
        validationSchema={EditProfileSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
            <div>
              <label>Phone:</label>
              <Field name="phone" type="text" />
              <ErrorMessage name="phone" component="div" style={{ color: 'red' }} />
            </div>
            <div>
              <label>Gender:</label>
              <Field as="select" name="gender">
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="custom">Custom</option>
              </Field>
              <ErrorMessage name="gender" component="div" style={{ color: 'red' }} />
            </div>
            <div>
              <label>Date of Birth:</label>
              <Field name="dob" type="date" />
              <ErrorMessage name="dob" component="div" style={{ color: 'red' }} />
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Updating...' : 'Update Info'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EditProfileForm;