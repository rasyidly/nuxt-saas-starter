<script setup lang="ts">
import { Button, Tailwind, Text, Html, Head, Body, Container, Section, Heading, Link } from '@vue-email/components'

const runtimeConfig = useRuntimeConfig()

const props = defineProps<{
    user: {
        name: string
    }
    url: string
}>()

const auth = useAuthServer()

const expirationHours = auth?.options?.emailVerification?.expiresIn ? auth.options.emailVerification.expiresIn / 3600 : 24
</script>

<template>
    <Tailwind>
        <Html>
            <Head />

            <Body class="bg-white">
                <Container class="max-w-2xl px-6 py-8 mx-auto">
                    <Section>
                        <Link href="/">
                            <Heading class="text-lg font-bold text-gray-800">
                                {{ runtimeConfig.public.appName }}
                            </Heading>
                        </Link>
                    </Section>

                    <Section class="mt-8">
                        <Heading class="text-gray-700">
                            Hi {{ props.user.name }},
                        </Heading>

                        <Text class="mt-2 leading-loose text-gray-600">
                            We received a request to reset the password for your {{ runtimeConfig.public.appName }} account.
                            Click the button below to choose a new password. This link is single-use and will expire for security reasons.
                        </Text>

                        <Section class="mt-4">
                            <Button
                                :href="props.url"
                                class="px-6 py-2 mt-4 text-sm font-medium tracking-wider text-white bg-teal-600 rounded-lg hover:bg-teal-500"
                            >
                                Reset your password
                            </Button>
                        </Section>

                        <Text class="mt-6 text-gray-600">
                            This password reset link will expire in {{ expirationHours }} hours.
                        </Text>

                        <Text class="mt-6 text-gray-600">
                            If you did not request a password reset, you can safely ignore this email. If you have concerns, contact support.
                        </Text>

                        <Text class="mt-6 text-gray-600">
                            Thanks,
                            <br>
                            The {{ runtimeConfig.public.appName }} team
                        </Text>
                    </Section>

                    <Section class="mt-8">
                        <!-- <Text class="text-gray-500 text-sm">
                        This email was sent to
                        <Link href="#" class="text-teal-600">{{ props.user.email || 'your email' }}</Link>.
                        If you'd rather not receive this email, you can
                        <Link href="#" class="text-teal-600">unsubscribe</Link>.
                    </Text> -->
                        <Text class="mt-3 text-gray-500 text-sm">
                            © 2025 {{ runtimeConfig.public.appName }}. All Rights Reserved.
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    </Tailwind>
</template>
