import request from 'supertest'
import { Server } from '../../src/app'

describe('testing the test api', () => { 
  const server = new Server().app
  it('check get api', async () => {
    const {statusCode} = await request(server).get("/api")

    expect(statusCode).toBe(200);
  })
 })