<template>
  <teleport to="body" v-if="visible">
    <div
      class="fixed flex flex-col items-center justify-start w-full inset-0 z-50 top-8"
    >
      <transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <aside
          class="max-w-sm flex items-center px-5 py-3 text-white bg-opacity-50 bg-slate-900 rounded-lg top-4 bg-glass"
        >
          <a
            href="/new-thing"
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm font-medium hover:opacity-75"
          >
            {{ msg }}
          </a>

          <button
            class="p-1 ml-3 rounded bg-white/20 hover:bg-white/10"
            aria-label="Dismiss Popup"
            @click="emit('close')"
          >
            <RiCloseLine />
          </button>
        </aside>
      </transition>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { RiCloseLine } from '@remixicon/vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  msg: {
    type: String,
    default: ''
  }
})
const emit = defineEmits<{ (e: 'close'): void }>()

let timer = null

watch(
  () => props.visible,
  (newVal) => {
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      emit('close')
    }, 2000)
  }
)
</script>
