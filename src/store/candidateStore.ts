import { create } from 'zustand'

type Stage = 'applied' | 'screened' | 'interviewed' | 'offered' | 'rejected'

export interface Candidate {
  id: string
  name: string
  role: string
  email: string
  stage: Stage
  avatarUrl?: string
}

interface CandidateStore {
  candidates: Candidate[]
  moveCandidate: (id: string, newStage: Stage) => void
  addCandidate: (candidate: Candidate) => void
}

const initialCandidates: Candidate[] = [
  { id: '1', name: 'Sarah Johnson', role: 'Frontend Engineer', email: 'sarah@example.com', stage: 'applied' },
  { id: '2', name: 'Marcus Lee', role: 'Full Stack Developer', email: 'marcus@example.com', stage: 'screened' },
  { id: '3', name: 'Priya Patel', role: 'Backend Engineer', email: 'priya@example.com', stage: 'interviewed' },
  { id: '4', name: 'James Wu', role: 'DevOps Engineer', email: 'james@example.com', stage: 'offered' },
  { id: '5', name: 'Aisha Rahman', role: 'ML Engineer', email: 'aisha@example.com', stage: 'applied' },
  { id: '6', name: 'Tom Brady', role: 'iOS Developer', email: 'tom@example.com', stage: 'rejected' },
  { id: '7', name: 'Linda Chen', role: 'Data Engineer', email: 'linda@example.com', stage: 'screened' },
]

export const useCandidateStore = create<CandidateStore>((set) => ({
  candidates: initialCandidates,
  moveCandidate: (id, newStage) =>
    set((state) => ({
      candidates: state.candidates.map((c) =>
        c.id === id ? { ...c, stage: newStage } : c
      ),
    })),
  addCandidate: (candidate) =>
    set((state) => ({
      candidates: [...state.candidates, candidate],
    })),
}))