<script setup>
import Sidebar from "../components/Sidebar.vue";
import Topbar from "../components/Topbar.vue";
import OrderTable from "../components/OrderTable.vue";
</script>

<template>
  <div class="w-screen h-screen flex bg-stone-100">
    <Sidebar />
    <div class="w-screen">
      <Topbar />
      <div class="p-8">
        <h1 class="text-2xl font-semibold mb-4">All Orders</h1>
        <div class="w-full max-w-7xl p-4 pb-0 my-4">
          <OrderTable />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
