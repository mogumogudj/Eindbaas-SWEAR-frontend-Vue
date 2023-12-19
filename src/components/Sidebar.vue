<script setup></script>

<template>
  <div
    class="min-w-[240px] h-screen bg-white border-r-4 border-stone-100 rounded-r"
  >
    <div class="flex flex-col items-center justify-start h-full p-6">
      <div>
        <img
          class="w-auto h-[23px]"
          src="../assets/swear-logo-black.webp"
          alt=""
        />
      </div>
      <div class="p-4 mt-16 w-full">
        <router-link
          to="/"
          class="flex items-center justify-start w-full h-[40px] my-2 text-base font-semibold hover:text-primary-accent"
          ><img
            class="w-auto h-auto mr-2"
            src="../assets/icons/home.svg"
            alt=""
          />Home</router-link
        >
        <router-link
          to="/orders"
          class="flex items-center justify-start w-full h-[40px] my-2 text-base font-semibold hover:text-primary-accent"
          ><img
            class="w-auto h-auto mr-2"
            src="../assets/icons/allorders.svg"
            alt=""
          />All Orders</router-link
        >
      </div>
    </div>
  </div>
</template>

<style scoped></style>
