import { response, Router } from 'express'
import app from './app'

const router = Router()

router.post('/users', (request, response) => {
  return response.status(201).send()
})

export default router