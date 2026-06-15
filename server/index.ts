const express = require('express')
const cors = require('cors')
const { PrismaClient } = require('@prisma/client')

const app = express()
const prisma = new PrismaClient()
const PORT = 4000

// Middleware
app.use(cors())
app.use(express.json())

// Health check
app.get('/health', (req: any, res:any) => {
  res.json({ status: 'Server is running' })
})

// Start server
app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`)
})