const express = require('express')
const { PrismaClient } = require('@prisma/client')

const router = express.Router()
const prisma = new PrismaClient()

// GET all candidates
router.get('/', async (req: any, res: any) => {
  try {
    const candidates = await prisma.candidate.findMany()
    res.json(candidates)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch candidates' })
  }
})

// GET single candidate
router.get('/:id', async (req: any, res: any) => {
  try {
    const candidate = await prisma.candidate.findUnique({
      where: { id: req.params.id }
    })
    res.json(candidate)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch candidate' })
  }
})

// CREATE candidate
router.post('/', async (req: any, res: any) => {
  try {
    const candidate = await prisma.candidate.create({
      data: req.body
    })
    res.json(candidate)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create candidate' })
  }
})

// UPDATE candidate
router.put('/:id', async (req: any, res: any) => {
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
router.delete('/:id', async (req: any, res: any) => {
  try {
    await prisma.candidate.delete({
      where: { id: req.params.id }
    })
    res.json({ message: 'Candidate deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete candidate' })
  }
})

module.exports = router