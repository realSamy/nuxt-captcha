<script setup lang="ts">
const turnstile = ref()
const token = ref('')
const verified = ref(false)

const email = computed(() => {
  try {
    const h = window.location.hash
    const p = h.split('=')
    return atob(p[p.length - 1])
  } catch (e) {
    createError({
      statusCode: 422
    })
  }
})

onMounted(() => {
  if (!email.value || email.value.length < 3) {
    createError({
      statusCode: 422
    })
  }
  console.log({e: email.value})
})


watch(token, (newToken) => {
  if (newToken && !verified.value) {
    verified.value = true
  }
})
</script>

<template>
  <div class="container">
    <h1>Verify You Are Human</h1>
    <div v-if="verified" class="email-info">Email: {{ email }}</div>
    <NuxtTurnstile ref="turnstile" v-model="token" />
    <UButton class="px-8" size="xl" v-if="verified" label="Click Here To Continue" />
  </div>
</template>

<style>
@reference "~/assets/css/main.css";
html, body {
  @apply m-0 p-0 font-sans;
}

div#__nuxt {
  @apply h-screen w-screen flex flex-col justify-center items-center;
  div:not(.container) {
    @apply w-full
  }
}

.container {
  @apply flex flex-col items-center justify-center gap-4 grow w-fit;
  h1 {
    @apply font-bold text-2xl;
  }
}

.email-info {
  @apply bg-[#f8f9fa] py-2 text-center w-full rounded-md ring ring-[#f8f9fa] font-medium;
}
</style>