<template>
  <div>
    <TheHeader />
    <main
      class="max-w-screen-xl w-full mx-auto py-12 2xl:py-16 my-12 sm:rounded"
    >
      <article
        class="flex flex-col items-center justify-center prose text-zinc-800 dark:text-zinc-100 max-w-none"
      >
        <slot />
      </article>
    </main>
    <TheFooter />
  </div>
</template>
