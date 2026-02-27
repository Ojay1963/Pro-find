import { beforeAll, afterAll, beforeEach, describe, expect, it } from 'vitest'
import request from 'supertest'
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

let mongo
let app

beforeAll(async () => {
  mongo = await MongoMemoryServer.create()
  process.env.MONGODB_URI = mongo.getUri()
  process.env.JWT_SECRET = 'integration_test_jwt_secret_that_is_long_enough'
  process.env.NODE_ENV = 'test'
  process.env.VERCEL = '1'
  const mod = await import('../index.js')
  app = mod.default
}, 120000)

beforeEach(async () => {
  const collections = mongoose.connection.collections
  for (const key of Object.keys(collections)) {
    await collections[key].deleteMany({})
  }
})

afterAll(async () => {
  await mongoose.connection.close()
  if (mongo) await mongo.stop()
})

describe('auth and security', () => {
  it('rejects admin role during registration', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'Bad Actor',
      email: 'bad@example.com',
      password: 'secret123',
      role: 'admin'
    })

    expect(res.status).toBe(400)
    expect(res.body.error).toBe('Invalid role')
  })

  it('sets auth cookie on login and allows /api/auth/me', async () => {
    await request(app).post('/api/auth/register').send({
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'secret123',
      role: 'seeker'
    })

    const login = await request(app).post('/api/auth/login').send({
      email: 'jane@example.com',
      password: 'secret123'
    })

    expect(login.status).toBe(200)
    const cookie = login.headers['set-cookie']?.[0]
    expect(cookie).toBeTruthy()

    const me = await request(app).get('/api/auth/me').set('Cookie', cookie)
    expect(me.status).toBe(200)
    expect(me.body.user.email).toBe('jane@example.com')
  })

  it('supports password reset request and confirm', async () => {
    await request(app).post('/api/auth/register').send({
      name: 'Reset User',
      email: 'reset@example.com',
      password: 'secret123',
      role: 'seeker'
    })

    const resetReq = await request(app).post('/api/auth/reset-password/request').send({
      email: 'reset@example.com'
    })

    expect(resetReq.status).toBe(200)
    expect(resetReq.body.ok).toBe(true)
    expect(resetReq.body.debugResetUrl).toBeTruthy()

    const url = new URL(resetReq.body.debugResetUrl)
    const token = url.searchParams.get('token')
    expect(token).toBeTruthy()

    const confirm = await request(app).post('/api/auth/reset-password/confirm').send({
      token,
      newPassword: 'newsecret123'
    })

    expect(confirm.status).toBe(200)
    expect(confirm.body.ok).toBe(true)

    const login = await request(app).post('/api/auth/login').send({
      email: 'reset@example.com',
      password: 'newsecret123'
    })

    expect(login.status).toBe(200)
  })

  it('enforces auth for protected listing creation', async () => {
    const unauth = await request(app).post('/api/listings').send({ title: 'House' })
    expect(unauth.status).toBe(401)

    const register = await request(app).post('/api/auth/register').send({
      name: 'Owner User',
      email: 'owner@example.com',
      password: 'secret123',
      role: 'owner'
    })
    const cookie = register.headers['set-cookie']?.[0]
    const csrfToken = register.body?.csrfToken
    expect(cookie).toBeTruthy()
    expect(csrfToken).toBeTruthy()

    const create = await request(app)
      .post('/api/listings')
      .set('Cookie', cookie)
      .set('x-csrf-token', csrfToken)
      .send({ title: 'House', location: 'Lagos' })

    expect(create.status).toBe(200)
    expect(create.body.listing.title).toBe('House')
  })

  it('exposes monetization plans and initializes paystack order flow', async () => {
    const plansRes = await request(app).get('/api/monetization/plans')
    expect(plansRes.status).toBe(200)
    expect(Array.isArray(plansRes.body.plans)).toBe(true)
    expect(plansRes.body.plans.length).toBeGreaterThan(0)

    const register = await request(app).post('/api/auth/register').send({
      name: 'Agent User',
      email: 'agent@example.com',
      password: 'secret123',
      role: 'agent'
    })
    const cookie = register.headers['set-cookie']?.[0]
    const csrfToken = register.body?.csrfToken
    expect(cookie).toBeTruthy()
    expect(csrfToken).toBeTruthy()

    const init = await request(app)
      .post('/api/payments/initialize')
      .set('Cookie', cookie)
      .set('x-csrf-token', csrfToken)
      .send({ planCode: 'agent_sub_monthly' })

    // Test env does not define PAYSTACK_SECRET_KEY, so initialize should fail gracefully.
    expect(init.status).toBe(502)
    expect(String(init.body.error || '')).toContain('PAYSTACK_SECRET_KEY')
  })
})
