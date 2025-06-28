import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })

  const [username, setUsername] = useState('')

  const navigate = useNavigate()

  const handleChange = e => {
    const { name, value } = e.target
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    // Add your login logic here
    try {
      const response = await axios.post(
        'http://localhost:3001/api/login',
        credentials
      )
      console.log('Login successful:', response.data.data.name)
      alert('Login successful!')
      localStorage.setItem('user', JSON.stringify(response.data.data)) // Redirect to the chat window or home page after successful login
      navigate('/')
    } catch (error) {
      console.error('Login failed:', error)
      alert('Login failed. Please try again.')
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        fontFamily: 'Arial, sans-serif'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '30px',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            marginBottom: '24px',
            color: '#333'
          }}
        >
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                color: '#555'
              }}
            >
              Email
            </label>
            <input
              type='email'
              name='email'
              value={credentials.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
              placeholder='Enter your email'
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                color: '#555'
              }}
            >
              Password
            </label>
            <input
              type='password'
              name='password'
              value={credentials.password}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
              placeholder='Enter your password'
            />
          </div>

          <button
            type='submit'
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#6200ee',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
              marginBottom: '16px'
            }}
            onMouseOver={e => (e.target.style.backgroundColor = '#3700b3')}
            onMouseOut={e => (e.target.style.backgroundColor = '#6200ee')}
          >
            Log In
          </button>
        </form>

        <p
          style={{
            textAlign: 'center',
            marginTop: '24px',
            color: '#666',
            fontSize: '14px'
          }}
        >
          Don't have an account?{' '}
          <a
            href='#'
            style={{ color: '#6200ee', textDecoration: 'none' }}
            onClick={() => navigate('/signup')}
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
