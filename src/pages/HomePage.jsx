import React from 'react';
import { useNavigate } from "react-router-dom";

function HomePage() {

    const navigate = useNavigate()

    return (
        <div style={styles.container}>
            <h1 style={styles.heading} >Welcome to Home Page</h1>

            <div style={styles.buttonGroup}>
            <button
                onClick={()=> navigate('/login')}
                style={styles.button}
            >Go to Login</button>

            <button
                onClick={()=> navigate('/signup')}
                style={styles.button}
            >Go to Signup</button>
            </div>
        </div>
    );
}

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '80px',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '40px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    cursor: 'pointer',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
  },
};

export default HomePage;