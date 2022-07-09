<template>
  <div class="mt-5 mb-5">
    <div class="w-[45rem] bg-[#11111A]">
      <div class="px-5 py-5">
        <div class="border-b border-gray-600">
          <header class="flex items-center">
            <img
              class="rounded-full"
              :src="'https://ui-avatars.com/api/?name=jackrestler'"
              alt="img"
            />
            <p class="ml-5">Maia Nakashidze</p>
          </header>
          <p class="mt-5">"Follow your dream. movie quote"</p>
          <div class="my-6">
            <img
              src="@/assets/images/movies/Interstellar.png"
              alt="img"
              width="890"
            />
          </div>
          <div class="flex justify-around w-32 items-center mb-3">
            <p>3</p>
            <img src="@/assets/icons/heart.svg" alt="img" />
            <p>10</p>
            <img src="@/assets/icons/square.svg" alt="img" />
          </div>
        </div>
        <article class="mt-10">
          <div class="flex items-center">
            <div>
              <img
                class="rounded-full"
                :src="'https://ui-avatars.com/api/?name=jackrestler'"
                alt="img"
              />
            </div>
            <div>
              <p class="ml-5">Nina Baidadze</p>
            </div>
          </div>
          <div class="border-b border-gray-600 w-[37.5rem] ml-20">
            <p class="mb-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque nunc vel massa facilisis consequat elit morbi
              convallis convallis. Volutpat vitae et nisl et. Adipiscing enim
              integer mi leo nisl. Arcu vitae mauris odio eget.
            </p>
          </div>
        </article>
        <article class="mt-10">
          <div class="flex items-center">
            <div>
              <img
                class="rounded-full"
                :src="'https://ui-avatars.com/api/?name=jackrestler'"
                alt="img"
              />
            </div>
            <div>
              <p class="ml-5">Nikoloz</p>
            </div>
          </div>
          <div class="border-b border-gray-600 w-[37.5rem] ml-20">
            <p class="mb-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </article>
        <div class="flex mt-10 items-center">
          <img
            class="rounded-full"
            :src="null || 'https://ui-avatars.com/api/?name=jackrestler'"
            alt="img"
          />
          <div class="ml-5">
            <input
              class="bg-[#24222F] w-[37.5rem] pl-5 py-3 text-[#CED4DA] rounded-md"
              placeholder="Write a comment"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
