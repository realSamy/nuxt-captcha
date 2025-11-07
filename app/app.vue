<template>
  <NuxtPage/>
</template>

<style>
@reference "~/assets/css/main.css";

html, body {
  @apply m-0 p-0 font-sans;
}

div#__nuxt {
  @apply h-screen w-screen;

  div:not(.container) {
    @apply w-full
  }
}
</style>