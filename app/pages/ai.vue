<script lang="ts" setup>
import { Chat } from '@ai-sdk/vue'
import { getTextFromMessage } from '@nuxt/ui/utils/ai'
import { ulid } from 'ulid'

const input = ref('')

const chat = new Chat({
    messages: [{
        id: ulid(),
        role: 'system',
        parts: [{
            type: 'text',
            text: 'Hi! I\'m your AI assistant. How can I help you today?'
        }]
    }],
    onError(error) {
        handleError(error)
    }
})

function onSubmit() {
    chat.sendMessage({ text: input.value })

    input.value = ''
}

useHead({
    title: 'Ask AI'
})
</script>

<template>
    <div class="flex flex-1 overflow-hidden">
        <UDashboardPanel>
            <template #header>
                <UDashboardNavbar title="Ask AI">
                    <template #leading>
                        <UDashboardSidebarCollapse />
                    </template>
                </UDashboardNavbar>
            </template>
            <template #body>
                <UContainer>
                    <UChatMessages
                        :messages="chat.messages"
                        :status="chat.status"
                        :should-scroll-to-bottom="false"
                        :user="{
                            avatar: { icon: 'i-lucide-user' },
                            variant: 'soft',
                            side: 'right'
                        }"
                        :assistant="{
                            avatar: { icon: 'i-lucide-sparkles' },
                            side: 'left'
                        }"
                    >
                        <template #indicator>
                            <UButton
                                class="px-0"
                                color="neutral"
                                variant="link"
                                loading
                                loading-icon="i-lucide-loader"
                                label="Thinking..."
                            />
                        </template>
                        <template #content="{ message }">
                            <MDC
                                :value="getTextFromMessage(message)"
                                :cache-key="message.id"
                                class="*:first:mt-0 *:last:mb-0 text-sm"
                            />
                        </template>
                    </UChatMessages>
                </UContainer>
            </template>

            <template #footer>
                <UContainer class="pb-4 sm:pb-6">
                    <UChatPrompt
                        v-model="input"
                        :error="chat.error"
                        variant="subtle"
                        icon="i-lucide-pencil"
                        @submit="onSubmit"
                    >
                        <UChatPromptSubmit
                            :status="chat.status"
                            icon="i-lucide-send"
                            @stop="chat.stop"
                            @reload="chat.regenerate"
                        />
                    </UChatPrompt>
                </UContainer>
            </template>
        </UDashboardPanel>
    </div>
</template>
