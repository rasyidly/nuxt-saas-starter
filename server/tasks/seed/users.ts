export default defineTask({
    meta: {
        name: 'db:seed:user',
        description: 'Seed database with demo data'
    },
    async run() {
        const auth = useAuthServer()

        const { user } = await auth.api.createUser({
            body: {
                email: 'test@example.com',
                password: 'password',
                name: 'John Doe',
                role: 'admin',
                data: {
                    emailVerified: true
                }
            }
        })

        return { result: true, message: 'User created successfully with test@example.com and password "password"', user }
    }
})
