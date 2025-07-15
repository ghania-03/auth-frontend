function UserInfo({ user }) {
  return (
    <div style={styles.card}>
      <img
        src={`http://localhost:5000/${user.profileImage}`}
        alt="Profile"
        style={styles.profileImage}
      />

      <img
        src={`http://localhost:5000/${user.coverImage}`}
        alt="Cover"
        style={styles.coverImage}
      />

      <div style={styles.info}>
        <p><span style={styles.label}>Name:</span> {user.firstName} {user.lastName}</p>
        <p><span style={styles.label}>Username:</span> {user.username}</p>
        <p><span style={styles.label}>Email:</span> {user.email}</p>
        <p><span style={styles.label}>Phone:</span> {user.phone}</p>
        <p><span style={styles.label}>DOB:</span> {new Date(user.dob).toLocaleDateString()}</p>
        <p><span style={styles.label}>Gender:</span> {user.gender}</p>
      </div>
    </div>
  );
}


const styles = {
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '12px',
    padding: '30px',
    maxWidth: '600px',
    margin: '0 auto 30px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    textAlign: 'center',
    color: '#1e1e1e'
  },
  profileImage: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid #007bff',
  },
  coverImage: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
    borderRadius: '10px',
    margin: '15px 0',
  },
  info: {
    fontSize: '1rem',
    marginTop: '10px',
    textAlign: 'left',
    lineHeight: '1.6',
  },
  label: {
    fontWeight: 'bold',
    marginRight: '5px',
  }
};

export default UserInfo;