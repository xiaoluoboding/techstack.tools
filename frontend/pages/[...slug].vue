<template>
  <NuxtLayout>
    <ContentDoc
      class="h-full 2xl:w-200 px-8 2xl:px-0 flex flex-col items-center 2xl:block"
    />
  </NuxtLayout>
</template>

<script lang="ts" setup>
const { path } = useRoute()

console.log(path)
</script>

<style scoped></style>
