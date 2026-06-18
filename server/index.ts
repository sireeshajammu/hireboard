const express = require('express')
const cors = require('cors')
const { PrismaClient } = require('@prisma/client')

const app = express()
const prisma = new PrismaClient()
const PORT = process.env.PORT || 4000


app.use(cors())
app.use(express.json())

// ==================== HEALTH CHECK ====================
app.get('/health', (req: any, res: any) => {
  res.json({ status: 'Server is running' })
})

// ==================== USERS (Recruiters) ====================

// GET all users
app.get('/api/users', async (req: any, res: any) => {
  try {
    const users = await prisma.user.findMany({
      include: { candidates: true, interviews: true }
    })
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' })
  }
})

// GET single user
app.get('/api/users/:id', async (req: any, res: any) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      include: { candidates: true, interviews: true }
    })
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' })
  }
})

// CREATE user
app.post('/api/users', async (req: any, res: any) => {
  try {
    const user = await prisma.user.create({
      data: req.body
    })
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' })
  }
})

// UPDATE user
app.put('/api/users/:id', async (req: any, res: any) => {
  try {
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: req.body
    })
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' })
  }
})

// DELETE user
app.delete('/api/users/:id', async (req: any, res: any) => {
  try {
    await prisma.user.delete({
      where: { id: req.params.id }
    })
    res.json({ message: 'User deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' })
  }
})

// ==================== JOBS ====================

// GET all jobs
app.get('/api/jobs', async (req: any, res: any) => {
  try {
    const jobs = await prisma.job.findMany({
      include: { 
        applications: { 
          include: { 
            candidate: true,
            interviews: true
          } 
        } 
      }
    })
    res.json(jobs)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch jobs' })
  }
})

// GET single job
app.get('/api/jobs/:id', async (req: any, res: any) => {
  try {
    const job = await prisma.job.findUnique({
      where: { id: req.params.id },
      include: { applications: { include: { candidate: true } } }
    })
    res.json(job)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch job' })
  }
})

// CREATE job
app.post('/api/jobs', async (req: any, res: any) => {
  try {
    const job = await prisma.job.create({
      data: req.body
    })
    res.json(job)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create job' })
  }
})

// UPDATE job
app.put('/api/jobs/:id', async (req: any, res: any) => {
  try {
    const job = await prisma.job.update({
      where: { id: req.params.id },
      data: req.body
    })
    res.json(job)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update job' })
  }
})

// DELETE job
app.delete('/api/jobs/:id', async (req: any, res: any) => {
  try {
    await prisma.job.delete({
      where: { id: req.params.id }
    })
    res.json({ message: 'Job deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete job' })
  }
})

// ==================== CANDIDATES ====================

// GET all candidates
app.get('/api/candidates', async (req: any, res: any) => {
  try {
    const candidates = await prisma.candidate.findMany({
      include: { user: true, applications: true }
    })
    res.json(candidates)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch candidates' })
  }
})

// GET single candidate
app.get('/api/candidates/:id', async (req: any, res: any) => {
  try {
    const candidate = await prisma.candidate.findUnique({
      where: { id: req.params.id },
      include: { 
        user: true, 
        applications: { include: { job: true, interviews: true } } 
      }
    })
    res.json(candidate)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch candidate' })
  }
})

// CREATE candidate (requires userId)
app.post('/api/candidates', async (req: any, res: any) => {
  try {
    if (!req.body.userId) {
      return res.status(400).json({ error: 'userId is required' })
    }
    const candidate = await prisma.candidate.create({
      data: req.body,
      include: { user: true }
    })
    res.json(candidate)
  } catch (error: any) {
    console.error('Candidate creation error:', error.message)
    res.status(500).json({ error: error.message })
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
    await prisma.candidate.delete({
      where: { id: req.params.id }
    })
    res.json({ message: 'Candidate deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete candidate' })
  }
})

// ==================== APPLICATIONS (Pipeline) ====================

// GET all applications
app.get('/api/applications', async (req: any, res: any) => {
  try {
    const applications = await prisma.application.findMany({
      include: { candidate: true, job: true, interviews: true }
    })
    res.json(applications)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch applications' })
  }
})

// GET single application
app.get('/api/applications/:id', async (req: any, res: any) => {
  try {
    const application = await prisma.application.findUnique({
      where: { id: req.params.id },
      include: { candidate: true, job: true, interviews: { include: { feedback: true } } }
    })
    res.json(application)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch application' })
  }
})

// CREATE application (candidate applies for job)
app.post('/api/applications', async (req: any, res: any) => {
  try {
    if (!req.body.candidateId || !req.body.jobId) {
      return res.status(400).json({ error: 'candidateId and jobId are required' })
    }
    const application = await prisma.application.create({
      data: req.body,
      include: { candidate: true, job: true }
    })
    res.json(application)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create application' })
  }
})

// UPDATE application (move through pipeline: applied → interview → offer → hired)
app.put('/api/applications/:id', async (req: any, res: any) => {
  try {
    const application = await prisma.application.update({
      where: { id: req.params.id },
      data: req.body,
      include: { candidate: true, job: true }
    })
    res.json(application)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update application' })
  }
})

// DELETE application
app.delete('/api/applications/:id', async (req: any, res: any) => {
  try {
    await prisma.application.delete({
      where: { id: req.params.id }
    })
    res.json({ message: 'Application deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete application' })
  }
})

// CREATE interview
app.post('/api/interviews', async (req: any, res: any) => {
  try {
    const interview = await prisma.interview.create({
      data: req.body
    })
    res.json(interview)
  } catch (error: any) {
    console.error('Interview creation error:', error.message)
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/interviews', async (req: any, res: any) => {
  try {
    const interviews = await prisma.interview.findMany({
      include: {
        application: {
          include: {
            candidate: true,
            job: true
          }
        }
      }
    })
    res.json(interviews)
  } catch (error: any) {
    console.error('Interview fetch error:', error.message)
    res.status(500).json({ error: error.message })
  }
})
// ==================== START SERVER ====================
app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`)
})