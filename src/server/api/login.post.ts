const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { email, password } = body as { email: string; password: string }

    const errors = [] as string[]

    // check if email and password are valid
    if (!email || !password) errors.push('Email and password are required.')
    if (!emailRegex.test(email)) errors.push('Email must be valid.')
    if (password.length < 8) errors.push('Password must be at least 8 characters.')
    if (password.length > 50) errors.push('Password must be less than 50 characters.')

    if (errors.length)
        throw createError({
            statusCode: 400,
            data: errors,
        })

    // if valid, return 200 with a token (The email is the token, but in a real app it would be a JWT token)
    return {
        status: 200,
        token: email,
    }
})
