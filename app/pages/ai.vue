<script lang="ts" setup>
import { Chat } from '@ai-sdk/vue'
import { getTextFromMessage } from '@nuxt/ui/utils/ai'

const input = ref('')

const chat = new Chat({
    onError(error) {
        handleError(error)
    }
})

function onSubmit() {
    chat.sendMessage({ text: input.value })

    input.value = ''
}

function submitPrefilled(text: string) {
    input.value = text
    onSubmit()
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
                <UContainer v-if="chat.messages.length">
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
                <UEmpty
                    v-else
                    variant="naked"
                    icon="i-lucide-sparkles"
                    title="Ask AI"
                    description="Ask questions about your data and get insights powered by AI."
                    class="h-full"
                    :ui="{ actions: 'flex gap-2 w-full' }"
                >
                    <template #actions>
                        <UButton
                            variant="outline"
                            icon="i-lucide-users"
                            label="How many users in database?"
                            size="sm"
                            class="rounded-full"
                            :ui="{ leadingIcon: 'text-primary' }"
                            @click="submitPrefilled('How many users in database?')"
                        />
                        <UButton
                            variant="outline"
                            icon="i-lucide-code"
                            label="Write direct simple markdown"
                            size="sm"
                            class="rounded-full"
                            :ui="{ leadingIcon: 'text-warning' }"
                            @click="submitPrefilled('Write direct simple markdown')"
                        />
                    </template>
                </UEmpty>
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
