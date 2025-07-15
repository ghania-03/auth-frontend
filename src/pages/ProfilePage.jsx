import { useEffect, useState } from 'react';
import { fetchUserProfile } from '../api/user';
import UserInfo from '../components/UserInfo';
import EditUsernameForm from '../components/EditUsernameForm';
import ChangePassword from '../components/ChangePassword';
import EditProfileForm from '../components/EditProfileForm';
import UpdateImagesForm from '../components/UpdateImagesForm';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUserProfile()
      .then(res => setUser(res.data.user))
      .catch(err => {
        alert('Failed to load profile');
        console.error(err.response?.data || err.message);
      });
  }, []);

  const refetchProfile = () => {
    fetchUserProfile()
      .then(res => setUser(res.data.user))
      .catch(err => {
        alert('Failed to reload profile');
        console.error(err.response?.data || err.message);
      });
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    window.location.href = '/login';
  };
  const updateUsernameInState = (newUsername) => {
    setUser(prev => ({ ...prev, username: newUsername }));
  };

  if (!user) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading profile...</p>;

  return (
    <div style={styles.container}>
      <div style={styles.buttonGroup}>
        <button onClick={handleLogout} style={{ ...styles.button, backgroundColor: '#dc3545' }}>
          Logout
        </button>
        <button
          onClick={() => setIsEditing(!isEditing)}
          style={{
            ...styles.button,
            ...(isEditing ? styles.cancelButton : {})
          }}
        >
          {isEditing ? 'Cancel Edit' : 'Edit Profile'}
        </button>
      </div>

      {!isEditing ? (
        <UserInfo user={user} />
      ) : (
        <div style={styles.editSection}>
          <div style={styles.formCard}>
            <EditUsernameForm onSuccess={updateUsernameInState} />
          </div>
          <div style={styles.formCard}>
            <ChangePassword />
          </div>
          <div style={styles.formCard}>
            <EditProfileForm currentValues={user} onUpdated={setUser} />
          </div>
          <div style={styles.formCard}>
            <UpdateImagesForm onUpdated={refetchProfile} />
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '900px',
    margin: '30px auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
  },
  button: {
    padding: '10px 20px',
    marginBottom: '25px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
  },
  editSection: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '25px',
    textAlign: 'left',
  },
  formCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    color: '#1e1e1e'
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '25px',
  },

};

export default ProfilePage;
