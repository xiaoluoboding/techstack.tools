<template>
  <TheHeader />
  <main class="max-w-screen-xl w-full mx-auto py-12 2xl:py-16 my-12 sm:rounded">
    <article class="flex flex-col items-center justify-center  prose text-zinc-800 dark:text-zinc-100 max-w-none">
      <slot />
    </article>
  </main>
  <TheFooter />
</template>

<style>
/* Customize Prose Styles */
.prose h1,
.prose h2 a,
.prose h3 a,
.prose h4 a {
  @apply no-underline;
  @apply text-zinc-800 dark:text-zinc-50;
}

.prose p,
.prose ul > li,
.prose ol > li {
  @apply text-zinc-700 dark:text-zinc-300;
}

.prose ul > li > li {
  @apply list-circle list-inside;
}
.prose ul > li > li::marker {
  @apply text-zinc-200 dark:text-zinc-100;
}

.prose h2 a:hover,
.prose h3 a:hover {
  @apply border-b border-zinc-600 dark:border-zinc-300;
}

.prose a {
  @apply text-lochmara-500 dark:text-lochmara-400;
}

.prose pre {
  @apply bg-zinc-900;
}

.prose strong {
  @apply text-lochmara-500 dark:text-lochmara-400;
}

.prose code,
.prose kbd {
  @apply px-2 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-700 dark:text-lochmara-400;
}

.prose code::before,
.prose code::after {
  content: '';
}

.prose hr {
  @apply dark:border-zinc-500;
}
</style>
