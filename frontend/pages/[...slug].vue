<template>
  <div>
    <NuxtLayout>
      <ContentDoc
        class="h-full px-6"
      />
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
const { path } = useRoute()

console.log(path)
</script>

<style scoped></style>
