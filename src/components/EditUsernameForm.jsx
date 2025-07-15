import { useFormik } from 'formik';
import { useState } from 'react';
import { updateUsername } from '../api/user';

function EditUsernameForm({ onSuccess }) {
  const [msg, setMsg] = useState('');

  const formik = useFormik({
    initialValues: { newUsername: '' },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const res = await updateUsername(values.newUsername);
        setMsg(res.data.msg);
        onSuccess(res.data.username);
        resetForm();
      } catch (err) {
        setMsg(err.response?.data?.msg || 'Update failed');
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <div style={{ marginTop: '30px' }}>
      <h3>Edit Username</h3>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="newUsername"
          placeholder="New Username"
          value={formik.values.newUsername}
          onChange={formik.handleChange}
          style={{ padding: '8px', width: '200px', marginRight: '10px' }}
        />
        <button type="submit" disabled={formik.isSubmitting}>
          Update
        </button>
      </form>
      {msg && <p style={{ color: msg.includes('success') ? 'green' : 'red' }}>{msg}</p>}
    </div>
  );
}

export default EditUsernameForm;