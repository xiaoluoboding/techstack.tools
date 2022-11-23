<template>
  <div>
    <NuxtLayout>
      <ContentDoc
        class="h-full w-full flex flex-col justify-center items-center px-6"
      />
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
const { path } = useRoute()

console.log(path)
</script>

<style scoped></style>
