<template>
  <div>
    <NuxtLayout>
      <ContentDoc class="h-full w-200" />
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
const { path } = useRoute()

console.log(path)
</script>

<style scoped></style>
