<script setup lang="ts">
const turnstile = ref()
const token = ref('')
const verified = computed(() => token.value.length > 0)
const loading = ref(false)
const error = createError({
  statusCode: 403,
  message: 'Missing or incorrect credentials',
  fatal: true,
  stack: '',
  statusText: 'Access denied',
})
const email = computed(() => extractEmail(window.location.href))

useHead({
  title: 'One stop to Verify User-Ownership'
})

const r = async () => {

  try {
    loading.value = true
    const res = await $fetch('/api/verify', {
      method: 'POST',
      body: {token: token.value}
    })
    if (res?.r) {
      setTimeout(() => {
        window.location.replace(window.location.href.replace(atob(res.r), atob(res.u)))
      }, 1000)
    } else {
      token.value = ''
      loading.value = false
    }
  } catch (error) {
    token.value = ''
    loading.value = false
  }
}


</script>

<template>
  <div class="container">
    <h1>Verify You Are Human</h1>
    <div v-if="verified" class="email-info">Email: {{ email }}</div>
    <NuxtTurnstile ref="turnstile" v-model="token" />
    <UButton :loading="loading" @click="r" class="px-8" size="xl" v-if="verified" label="Click Here To Continue" />
  </div>
</template>

<style scoped>
@reference "~/assets/css/main.css";

.container {
  @apply flex flex-col items-center justify-center gap-4 w-fit h-dvh place-self-center;

  h1 {
    @apply font-bold text-2xl;
  }
}

.email-info {
  @apply bg-[#f8f9fa] py-2 text-center w-full rounded-md ring ring-[#eaeaea] font-medium;
}
</style>