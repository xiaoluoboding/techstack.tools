<template>
  <footer class="bg-white">
    <div
      class="max-w-screen-2xl px-4 pt-16 pb-6 mx-auto sm:px-6 lg:px-8 lg:pt-24"
    >
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div>
          <div class="flex justify-center text-violet-500 sm:justify-start">
            <img src="/logo-light.svg" class="h-6" />
          </div>

          <p
            class="max-w-md mx-auto mt-6 leading-relaxed text-center text-gray-500 sm:max-w-xs sm:mx-0 sm:text-left"
          >
            Discover our curated list of creative tools to
            <span class="text-neon">supercharge</span> your next project.
          </p>

          <div class="mt-6 flex justify-center sm:justify-start">
            <a
              href="https://www.producthunt.com/posts/tech-stack-tools?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tech&#0045;stack&#0045;tools"
              target="_blank"
              ><img
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=351122&theme=neutral"
                alt="tech&#0045;stack&#0046;tools - Discover&#0032;our&#0032;curated&#0032;list&#0032;of&#0032;creative&#0032;tools | Product Hunt"
                style="width: 250px; height: 54px"
                width="250"
                height="54"
            /></a>
          </div>

          <ul
            class="flex justify-center gap-x-6 mt-6 md:gap-x-8 sm:justify-start"
          >
            <li>
              <a
                href="https://twitter.com/TechStackTools"
                rel="noopener noreferrer"
                target="_blank"
                class="text-violet-700 transition hover:text-violet-700/75"
              >
                <span class="sr-only">Twitter</span>
                <svg
                  class="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                  />
                </svg>
              </a>
            </li>

            <li>
              <a
                href="https://github.com/xiaoluoboding/techstack.tools"
                rel="noopener noreferrer"
                target="_blank"
                class="text-violet-700 transition hover:text-violet-700/75"
              >
                <span class="sr-only">GitHub</span>
                <RiGithubFill class="h-6 w-6" />
              </a>
            </li>
          </ul>
        </div>

        <div
          class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 md:grid-cols-4"
        >
          <div class="text-center lg:text-left">
            <p class="text-lg font-medium text-gray-900">About Us</p>

            <nav class="mt-8">
              <ul class="space-y-4 text-sm">
                <li>
                  <a
                    class="flex justify-center sm:justify-start space-x-2 text-gray-700 transition hover:text-gray-700/75"
                    href="https://xiaoluoboding.github.io/monthly/"
                  >
                    <RiBookOpenLine /> <span>Predecessor Story</span>
                  </a>
                </li>

                <li>
                  <a
                    class="flex justify-center sm:justify-start space-x-2 text-gray-700 hover:text-blue-500 transition"
                    href="https://twitter.com/xiaoluoboding"
                  >
                    <RiTwitterXLine />
                    <span>Follow me on Twitter</span>
                  </a>
                </li>

                <li>
                  <a
                    class="flex justify-center sm:justify-start space-x-2 text-gray-700 transition hover:text-amber-900/75"
                    href="https://www.buymeacoffee.com/xlbd"
                  >
                    <RiCupLine />
                    <span>Buy me a coffee</span>
                  </a>
                </li>

                <li>
                  <a
                    class="flex justify-center sm:justify-start space-x-2 text-gray-700 transition hover:text-gray-700/75"
                    href="https://github.com/sponsors/xiaoluoboding"
                  >
                    <RiGithubFill /> <span>Sponsor me on GitHub</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div class="text-center sm:text-left">
            <p class="text-lg font-medium text-gray-900">Collection</p>

            <nav class="mt-8">
              <ul class="space-y-4 text-sm">
                <li>
                  <a
                    class="flex justify-center sm:justify-start space-x-2 text-gray-700 transition hover:text-teal-500"
                    href="#"
                  >
                    <RiMagicLine />
                    <span>Coming soon</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div class="text-center sm:text-left">
            <p class="text-lg font-medium text-gray-900">Subscribe</p>

            <nav class="mt-8">
              <ul class="space-y-4 text-sm">
                <li>
                  <a
                    class="flex justify-center sm:justify-start space-x-2 text-gray-700 transition hover:text-violet-500"
                    href="https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MjM5OTY2MjAwNg==&action=getalbum&album_id=2319237207234134019&scene=173&from_msgid=2247487927&from_itemidx=1&count=3&nolastread=1#wechat_redirect"
                  >
                    <RiWechat2Line />
                    <span>公众号专栏</span>
                  </a>
                </li>

                <li>
                  <a
                    class="flex justify-center sm:justify-start space-x-2 text-gray-700 transition hover:text-violet-500"
                    href="https://fe-share-weekly.zhubai.love/"
                  >
                    <RiMailLine />
                    <span>竹白专栏</span>
                  </a>
                </li>

                <li>
                  <a
                    class="flex group justify-center gap-1.5 sm:justify-start"
                    href="https://techstacktools.substack.com/?showWelcome=true"
                  >
                    <div
                      class="flex space-x-2 text-gray-700 transition group-hover:text-blue-500"
                    >
                      <RiMailLine />
                      <span>Tech Stack Share Newsletter</span>
                    </div>

                    <span class="relative flex w-2 h-2 -mr-2">
                      <span
                        class="absolute inline-flex w-full h-full bg-violet-400 rounded-full opacity-75 animate-ping"
                      ></span>
                      <span
                        class="relative inline-flex w-2 h-2 bg-violet-500 rounded-full"
                      ></span>
                    </span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div class="text-center sm:text-left">
            <p class="text-lg font-medium text-gray-900">Contribute</p>

            <ul class="mt-8 space-y-4 text-sm">
              <li>
                <a
                  class="flex items-center justify-center gap-1.5 sm:justify-start text-gray-700 hover:text-violet-500"
                  :href="GITHUB_ISSUE_URL"
                >
                  <RiLightbulbFlashLine />

                  <span>Suggest a Change</span>
                </a>
              </li>

              <li>
                <a
                  class="flex items-center justify-center gap-1.5 sm:justify-start text-gray-700 hover:text-violet-500"
                  :href="GITHUB_ISSUE_URL"
                >
                  <RiToolsLine />

                  <span class="text-gray-700">Request a Feature</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="pt-6 mt-12 border-t border-gray-100">
        <div class="text-center sm:flex sm:justify-between sm:text-left">
          <p class="text-sm text-gray-500">
            <a
              class="inline-block text-violet-500 underline transition hover:text-violet-500/75"
              href="/terms-of-services"
            >
              Terms & Conditions
            </a>

            <span> | </span>

            <a
              class="inline-block text-violet-500 underline transition hover:text-violet-500/75"
              href="/privacy-policy"
            >
              Privacy Policy
            </a>
          </p>

          <p class="mt-4 text-sm text-gray-500 sm:order-first sm:mt-0">
            Tech Stack Tools &copy; 2022
            <a
              class="inline-block text-violet-500 underline transition hover:text-violet-500/75"
              href="/"
              >techstack.tools</a
            >
            All rights reserved
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { GITHUB_ISSUE_URL } from '@/composables/constants'
import {
  RiBookOpenLine,
  RiCupLine,
  RiGithubFill,
  RiLightbulbFlashLine,
  RiMagicLine,
  RiMailLine,
  RiToolsLine,
  RiTwitterXLine,
  RiWechat2Line
} from '@remixicon/vue'
</script>
