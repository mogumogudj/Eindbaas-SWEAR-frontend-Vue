<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("");
const password = ref("");

const error = ref("");

const Login = async () => {
  const response = await fetch("http://localhost:3000/api/v1/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  });
  const data = await response.json();
  if (data.status === "success") {
    localStorage.setItem("token", data.data.token);
    localStorage.setItem("user", JSON.stringify(data.data.user));
    router.push("/");
  } else {
    error.value = data.message;
  }
};
</script>

<template>
  <div
    class="flex items-center justify-center min-h-screen drop-shadow-[0_0px_60px_rgba(0,0,0,0.2)]"
  >
    <div class="w-[600px] h-[400px]">
      <img src="../assets/herobanner.jpg" alt="herobanner" />
    </div>
    <div class="w-[400px] h-[400px] bg-white">
      <div class="flex flex-col items-start justify-between h-full p-6">
        <div>
          <img
            class="w-auto h-[18px]"
            src="../assets/swear-logo-black.webp"
            alt=""
          />
        </div>
        <form class="flex flex-col w-full" @submit.prevent="Login">
          <div class="flex flex-col mb-12">
            <label for="email" class="font-semibold text-sm">Email</label>
            <input
              class="w-full h-[40px] px-4 mt-2 mb-4 bg-neutral-100 placeholder:text-neutral-300 placeholder:text-sm focus:outline-none focus:ring-1 focus:ring-primary-accent"
              type="text"
              name="email"
              id="email"
              v-model="email"
              placeholder="Enter your username"
            />
            <label for="password" class="font-semibold text-sm">Password</label>
            <input
              class="w-full h-[40px] px-4 my-2 bg-neutral-100 placeholder:text-neutral-300 placeholder:text-sm focus:outline-none focus:ring-1 focus:ring-primary-accent"
              type="password"
              name="password"
              id="password"
              v-model="password"
              placeholder="Enter your password"
            />
            <!-- <router-link
              to="/passwordreset"
              class="text-right text-xs text-primary-accent"
              >Password Forgotten?</router-link
            > -->
          </div>
          <p class="text-xs text-red-500">{{ error }}</p>

          <button
            type="submit"
            class="w-full h-[40px] my-2 text-white bg-black flex items-center justify-center"
          >
            LOG IN
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
