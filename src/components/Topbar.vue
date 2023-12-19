<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const showDropdown = ref(false);

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const signOut = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/v1/users/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await response.json();

    if (data.status === "success") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/login");
      console.log("Logged out successfully");
    } else {
      console.error("Error logging out:", data.message);
    }
  } catch (error) {
    console.error("Error logging out:", error);
  }
};
</script>

<template>
  <div
    class="w-full h-[64px] p-2 bg-white flex row items-center justify-between rounded-l"
  >
    <div class="flex items-center relative ml-2">
      <input
        type="text"
        placeholder="Search"
        class="h-[32px] min-w-[400px] px-4 bg-stone-100 border-none rounded focus:outline-none placeholder:text-sm placeholder:text-neutral-400 focus:ring-1 focus:ring-primary-accent"
      />
      <img
        src="../assets/icons/search.svg"
        alt="Search Icon"
        class="absolute right-4"
      />
    </div>
    <div
      class="flex flex-row gap-4 items-center justify-center mr-4 cursor-pointer relative"
      @click="toggleDropdown"
    >
      <img
        src="../assets/profilepic.jpg"
        alt="profile picture"
        class="w-[32px] h-[32px] rounded-full"
      />

      <div class="flex flex-col">
        <span class="text-sm font-semibold">Joris Hens</span>
        <span class="text-xs text-neutral-400">Admin</span>
      </div>
      <img
        src="../assets/caret-down-thin.svg"
        alt="arrow down"
        class="w-[24px] h-[24px]"
      />
    </div>
  </div>
  <div
    :class="{ block: showDropdown, hidden: !showDropdown }"
    class="w-[240px] absolute top-[68px] right-1 bg-white rounded"
  >
    <button
      class="w-full h-[44px] pl-4 rounded flex items-center hover:bg-primary-accent"
    >
      Account
    </button>
    <button
      class="w-full h-[44px] pl-4 rounded flex items-center hover:bg-primary-accent"
    >
      Settings
    </button>
    <button
      @click="signOut"
      class="w-full h-[44px] pl-4 rounded flex items-center hover:bg-primary-accent"
    >
      Sign out
    </button>
  </div>
</template>

<style scoped></style>
