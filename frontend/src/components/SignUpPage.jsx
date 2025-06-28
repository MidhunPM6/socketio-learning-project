import React, { useState } from 'react'
import { useNavigate, useNavigation } from 'react-router-dom'
import axios from 'axios'

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const navigate = useNavigate()

  const handleChange = e => {
 
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async e => {
       e.preventDefault()
    console.log(formData);
    
    try {
      if (formData < 0) {
        return alert('Fill all the fields')
      }
      const response = await axios.post(
        'http://localhost:3001/api/signup',
        formData
      )
      console.log('Signup successful:', response.data)
      alert('Signup successful!')

      navigate('/login') 
    } catch (error) {
      log('Signup failed:', error)
      alert('Signup failed. Please try again.')
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
          Create Account
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
              Full Name
            </label>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px'
              }}
            />
          </div>

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
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px'
              }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
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
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px'
              }}
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
              transition: 'background-color 0.3s'
            }}
            onMouseOver={e => (e.target.style.backgroundColor = '#3700b3')}
            onMouseOut={e => (e.target.style.backgroundColor = '#6200ee')}
          >
            Sign Up
          </button>
        </form>

        <p
          style={{
            textAlign: 'center',
            marginTop: '20px',
            color: '#666',
            fontSize: '14px'
          }}
        >
          Already have an account?{' '}
          <a
            href='#'
            style={{ color: '#6200ee' }}
            onClick={() => navigate('/login')}
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  )
}

export default SignUpPage
