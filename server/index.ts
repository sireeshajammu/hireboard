const express = require('express')
const cors = require('cors')
const { PrismaClient } = require('@prisma/client')

const app = express()
const prisma = new PrismaClient()
const PORT = 4000

app.use(cors())
app.use(express.json())

app.get('/health', (req: any, res: any) => {
  res.json({ status: 'Server is running' })
})

// GET all candidates
app.get('/api/candidates', async (req: any, res: any) => {
  try {
    const candidates = await prisma.candidate.findMany()
    res.json(candidates)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch candidates' })
  }
})

// CREATE candidate
app.post('/api/candidates', async (req: any, res: any) => {
  try {
    const candidate = await prisma.candidate.create({ data: req.body })
    res.json(candidate)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create candidate' })
  }
})

// UPDATE candidate
app.put('/api/candidates/:id', async (req: any, res: any) => {
  try {
    const candidate = await prisma.candidate.update({
      where: { id: req.params.id },
      data: req.body
    })
    res.json(candidate)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update candidate' })
  }
})

// DELETE candidate
app.delete('/api/candidates/:id', async (req: any, res: any) => {
  try {
    await prisma.candidate.delete({ where: { id: req.params.id } })
    res.json({ message: 'Candidate deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete candidate' })
  }
})

app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`)
})