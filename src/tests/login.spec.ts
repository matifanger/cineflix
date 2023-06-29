import { describe, expect, test } from 'vitest'
import { setup, fetch } from '@nuxt/test-utils'

describe('POST /api/login', async () => {
    await setup({
        dev: true,
    })
    test('POST /api/login success', async () => {
        const res = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({
                email: 'admin@admin.com', // this email is valid
                password: 'password', // this password is valid
            }),
        })
        expect(res.status).toBe(200)
    })

    test('POST /api/login failed', async () => {
        const res = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({
                email: 'admin@admin.com', // this email valid
                password: 'pasrd', // this password is less than 8 characters
            }),
        })
        expect(res.status).toBe(400)
    })

    test('GET /api/getdata', async () => {
        const res = await fetch('/api/getdata?s=fast')
        const data = await res.json()

        expect(data.Search.length).toBeGreaterThan(0)
        expect(res.status).toBe(200)
    })
})
