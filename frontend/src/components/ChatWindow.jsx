import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import socket from '../socket/socket'

import axios from 'axios'

const ChatWindow = () => {
  const [message, setMessage] = useState('')
  const [newMessage, setNewMessage] = useState([])
  const [username, setUsername] = useState('')
  const [users, setUsers] = useState([])
  const [selectedUser,setSelectedUser]=useState('')
  const user = JSON.parse(localStorage.getItem('user'))
  const userId = user._id
  console.log(selectedUser);
  


  useEffect(() => {
    const storedName = localStorage.getItem('user')
    if (storedName) {
      setUsername(storedName)
    } else {
      console.warn('No username found in localStorage')
    }
    
    
    socket.on('user_connected',userId)
    socket.on('message', msg => {
      console.log('Message received:', msg)
      // Here you can update the state to display the message in the UI
      setNewMessage(prevMessages => [...prevMessages, msg]) // Update the state with the new message
    })
    console.log(newMessage)

    return () => {
      socket.off('message') // Clean up the event listener when the component unmounts
    }
  }, [userId])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3001/api/users?myID=' + userId
        )
        setUsers(response.data.data)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    fetchUsers()
  }, [])

  const sendMessage = () => {

    const messageData= {
        toUserId : selectedUser._id,
        message:message,
    } 
    socket.emit('message', messageData)
     setMessage((prev) => [...prev, {
      from: loggedInUserId,
      content: message
    }])
    setMessage("")
  }

  

  return (
    <div className='flex h-screen bg-gray-100'>
      {/* Sidebar */}
      <div className='w-80 bg-white border-r border-gray-200 flex flex-col'>
        {/* Sidebar Header */}
        <div className='p-4 border-b border-gray-200 flex justify-between items-center'>
          <h1 className='text-xl font-bold text-gray-800'>Messages</h1>
          <button className='p-2 rounded-full hover:bg-gray-100 text-gray-500'>
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
          </button>
        </div>

        {/* Chat List */}
        <div className='flex-1 overflow-y-auto'>
          {/* Chat Item */}
          {users?.map(user => (
            <div key={user._id} className='flex items-center p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer bg-blue-50'>
              <div className='relative'>
                <img
                  className='w-12 h-12 rounded-full object-cover'
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&s'
                  alt='Profile'
                />
                <span className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white'></span>
              </div>
              <div className='ml-3 flex-1'>
                <div className='flex justify-between items-center' onClick={()=>setSelectedUser(user)}>
                  <h3 className='text-sm font-semibold text-gray-900'>
                    {user.name}
                  </h3>
                  <span className='text-xs text-gray-500'>10:30 AM</span>
                </div>

                <p className='text-sm text-gray-600 truncate'>
                  Hello, how can I help you today?
                </p>
              </div>
            </div>
          ))}

          {/* Chat Item */}
        </div>
      </div>

      {/* Chat Area */}
      <div className='flex-1 flex flex-col'>
        {/* Chat Header */}
        <div className='p-4 border-b border-gray-200 flex items-center bg-white'>
          <img
            className='w-10 h-10 rounded-full object-cover'
            src='https://randomuser.me/api/portraits/women/44.jpg'
            alt='Profile'
          />
          <div className='ml-3'>
            <h2 className='font-semibold text-gray-800'>{selectedUser.name}</h2>
            <p className='text-xs text-gray-500'>Online</p>
          </div>
          <div className='ml-auto flex space-x-2'>
            <button className='p-2 rounded-full hover:bg-gray-100 text-gray-500'>
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                />
              </svg>
            </button>
            <button className='p-2 rounded-full hover:bg-gray-100 text-gray-500'>
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className='flex-1 p-4 overflow-y-auto bg-gray-50'>
          {/* Incoming Message */}
          <div className='flex mb-4'>
            <img
              className='w-8 h-8 rounded-full object-cover mt-1'
              src='https://randomuser.me/api/portraits/women/44.jpg'
              alt='Profile'
            />
            <div className='ml-3'>
              <div className='bg-white p-3 rounded-lg rounded-tl-none shadow-sm max-w-xs'>
                <p className='text-gray-800'>Hey there! How are you doing?</p>
              </div>
              <span className='text-xs text-gray-500 mt-1 block'>10:20 AM</span>
            </div>
          </div>

          {/* Outgoing Message */}
          <div className='flex justify-end mb-4'>
            <div className='mr-3 text-right'>
              <div className='bg-blue-500 text-white p-3 rounded-lg rounded-tr-none shadow-sm max-w-xs'>
                <p>I'm good, thanks! How about you?</p>
              </div>
              <span className='text-xs text-gray-500 mt-1 block'>10:22 AM</span>
            </div>
          </div>

          {/* Incoming Message */}
          <div className='flex mb-4'>
            <img
              className='w-8 h-8 rounded-full object-cover mt-1'
              src='https://randomuser.me/api/portraits/women/44.jpg'
              alt='Profile'
            />
            <div className='ml-3'>
              <div className='bg-white p-3 rounded-lg rounded-tl-none shadow-sm max-w-xs'>
                <p className='text-gray-800'>
                  I'm doing well! Are we still meeting tomorrow for coffee?
                </p>
              </div>
              <span className='text-xs text-gray-500 mt-1 block'>10:25 AM</span>
            </div>
          </div>
        </div>

        {/* Message Input */}
        <div className='p-3 border-t border-gray-200 bg-white'>
          <div className='flex items-center'>
            <button className='p-2 rounded-full hover:bg-gray-100 text-gray-500'>
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13'
                />
              </svg>
            </button>
            <input
              type='text'
              placeholder='Type a message'
              className='flex-1 mx-2 p-2 border border-gray-200 rounded-full focus:outline-none focus:border-blue-500 px-4'
            />
            <button className='p-2 rounded-full hover:bg-gray-100 text-gray-500'>
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </button>
            <button className='ml-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600'>
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatWindow
