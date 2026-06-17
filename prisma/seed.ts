const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create recruiter
  const recruiter = await prisma.user.upsert({
    where: { email: 'sarah@example.com' },
    update: {},
    create: {
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      role: 'recruiter',
      department: 'Engineering'
    }
  })

  console.log('✓ Recruiter created')

  // Create jobs
  const jobs = await Promise.all([
    prisma.job.create({ data: { title: 'Frontend Engineer', department: 'Engineering', description: 'React and TypeScript expert', salary: '$100k-120k', status: 'open' } }),
    prisma.job.create({ data: { title: 'Backend Engineer', department: 'Engineering', description: 'Node.js and PostgreSQL expert', salary: '$110k-130k', status: 'open' } }),
    prisma.job.create({ data: { title: 'Product Designer', department: 'Design', description: 'Figma and user research', salary: '$90k-110k', status: 'open' } }),
    prisma.job.create({ data: { title: 'DevOps Engineer', department: 'Infrastructure', description: 'AWS and Kubernetes', salary: '$120k-140k', status: 'open' } }),
    prisma.job.create({ data: { title: 'Data Scientist', department: 'Analytics', description: 'Python and ML experience', salary: '$115k-135k', status: 'open' } }),
  ])

  console.log('✓ Jobs created')

  // Create candidates
  const candidates = await Promise.all([
    prisma.candidate.create({ data: { name: 'Alice Chen', email: 'alice@example.com', techStack: 'React, TypeScript, Node.js', yearsOfExperience: 4, stage: 'APPLIED', userId: recruiter.id } }),
    prisma.candidate.create({ data: { name: 'Bob Martinez', email: 'bob@example.com', techStack: 'Python, Django, PostgreSQL', yearsOfExperience: 6, stage: 'SCREENED', userId: recruiter.id } }),
    prisma.candidate.create({ data: { name: 'Diana Park', email: 'diana@example.com', techStack: 'Figma, Adobe XD, CSS', yearsOfExperience: 3, stage: 'INTERVIEWED', userId: recruiter.id } }),
    prisma.candidate.create({ data: { name: 'Ethan Brown', email: 'ethan@example.com', techStack: 'AWS, Docker, Kubernetes', yearsOfExperience: 5, stage: 'OFFERED', userId: recruiter.id } }),
    prisma.candidate.create({ data: { name: 'Fiona Walsh', email: 'fiona@example.com', techStack: 'React Native, JavaScript', yearsOfExperience: 2, stage: 'APPLIED', userId: recruiter.id } }),
    prisma.candidate.create({ data: { name: 'George Liu', email: 'george@example.com', techStack: 'Python, TensorFlow, SQL', yearsOfExperience: 7, stage: 'SCREENED', userId: recruiter.id } }),
    prisma.candidate.create({ data: { name: 'Hannah Kim', email: 'hannah@example.com', techStack: 'Vue.js, Laravel, MySQL', yearsOfExperience: 3, stage: 'APPLIED', userId: recruiter.id } }),
    prisma.candidate.create({ data: { name: 'Ivan Petrov', email: 'ivan@example.com', techStack: 'Java, Spring Boot, AWS', yearsOfExperience: 8, stage: 'INTERVIEWED', userId: recruiter.id } }),
  ])

  console.log('✓ Candidates created')

  // Create applications
  const applications = await Promise.all([
    prisma.application.create({ data: { candidateId: candidates[0].id, jobId: jobs[0].id, status: 'applied' } }),
    prisma.application.create({ data: { candidateId: candidates[1].id, jobId: jobs[1].id, status: 'screened' } }),
    prisma.application.create({ data: { candidateId: candidates[2].id, jobId: jobs[2].id, status: 'interviewed' } }),
    prisma.application.create({ data: { candidateId: candidates[3].id, jobId: jobs[3].id, status: 'offered' } }),
    prisma.application.create({ data: { candidateId: candidates[4].id, jobId: jobs[0].id, status: 'applied' } }),
    prisma.application.create({ data: { candidateId: candidates[5].id, jobId: jobs[4].id, status: 'screened' } }),
    prisma.application.create({ data: { candidateId: candidates[6].id, jobId: jobs[1].id, status: 'applied' } }),
    prisma.application.create({ data: { candidateId: candidates[7].id, jobId: jobs[1].id, status: 'interviewed' } }),
  ])

  console.log('✓ Applications created')

  // Create interviews
  await Promise.all([
    prisma.interview.create({ data: { applicationId: applications[1].id, userId: recruiter.id, date: new Date('2026-06-20T10:00:00'), type: 'phone' } }),
    prisma.interview.create({ data: { applicationId: applications[2].id, userId: recruiter.id, date: new Date('2026-06-21T14:00:00'), type: 'technical' } }),
    prisma.interview.create({ data: { applicationId: applications[7].id, userId: recruiter.id, date: new Date('2026-06-22T11:00:00'), type: 'final' } }),
  ])

  console.log('✓ Interviews created')
  console.log('✅ Database seeded successfully!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())