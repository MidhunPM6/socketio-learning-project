import express from 'express'
import cors from 'cors'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import connectDB from './config/db.js'
import {
  loginController,
  signupController,
  fetchUserController,
  saveMessageController,
  fetchMessageController
} from './Controller/userController.js'

// Ensure the database connection is established

const app = express()
const server = createServer(app)
const port = 3001

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  }
})
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const connectedUsers = {}

io.on('connection', socket => {
  console.log(socket.id)

  socket.on('user_connected', userId => {
    connectedUsers[userId] = socket.id
    socket.userId = userId

    socket.emit('user_connected_ack')
  })

  socket.on('send_message', async ({ toUserId, message }) => {
    const fromUserId = socket.userId
    console.log('heyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy', fromUserId)

    await saveMessageController(fromUserId, toUserId, message)

    const receiverSocketId = connectedUsers[toUserId]
    const senderSocketId = connectedUsers[fromUserId]

    const messagePayload = {
      sender: fromUserId,
      receiver: toUserId,
      message: message
    }

    if (receiverSocketId) {
      io.to(receiverSocketId).emit('receive_message', messagePayload)
    }

    if (senderSocketId) {
      io.to(senderSocketId).emit('receive_message', messagePayload)
    }
  })

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
    if (socket.userId) {
      delete connectedUsers[socket.userId]
    }
  })
})

app.post('/api/signup', async (req, res) => {
  // Simulate a signup process
  try {
    const response = await signupController(req.body)
    res.status(200).json({ message: 'Signup successful', data: response })
  } catch (error) {
    console.error('Signup failed:', error)
    res.status(500).json({ message: 'Signup failed', error: error.message })
  }
})

app.post('/api/login', async (req, res) => {
  // Simulate a login process

  try {
    // Here you would typically check the credentials against your database
    const { email, password } = req.body
    const response = await loginController(email, password)
    res.status(200).json({ message: 'Login successful', data: response })
  } catch (error) {
    console.error('Login failed:', error)
    res.status(500).json({ message: 'Login failed', error: error.message })
  }
})

app.get('/api/users', async (req, res) => {
  const myID = req.query.myID
  try {
    const response = await fetchUserController(myID)
    res
      .status(200)
      .json({ message: 'Users fetched successfully', data: response })
  } catch (error) {
    console.error('Error fetching users:', error)
    res
      .status(500)
      .json({ message: 'Error fetching users', error: error.message })
  }
})

app.get('/api/messages', async (req, res) => {
  const myID = req.query.myID
  const toUserId = req.query.toID
  console.log('heloooooo', toUserId)

  try {
    const response = await fetchMessageController(myID, toUserId)
    res
      .status(200)
      .json({ message: 'Messages fetched successfully', data: response })
  } catch (error) {
    console.error('Error fetching messages:', error)
    res
      .status(500)
      .json({ message: 'Error fetching messages', error: error.message })
  }
})

server.listen(port, async () => {
  await connectDB()
  console.log('Database connected successfully')
  console.log(`Server is running on port ${port}`)
})
