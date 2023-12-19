<script setup>
import Sidebar from "../components/Sidebar.vue";
import Topbar from "../components/Topbar.vue";
import CardSmall from "../components/CardSmall.vue";
import OrderTable from "../components/OrderTable.vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const socket = new WebSocket("ws://localhost:3000/primus");

// onMounted(() => {
//   console.log("attempting to connect to server...");
//   // WebSocket setup
//   socket.onopen = () => {
//     console.log("Connected to server. WebSocket status:", socket.readyState);
//     sendInitialData();
//     fetchAllOrders();
//   };

//   socket.onmessage = (e) => {
//     const data = JSON.parse(e.data);

//     console.log("Message received:", e.data);

//     if (data.action === "initialData") {
//       console.log("initial data received", data);

//       totalOrders.value = data.data.totalOrders;
//       totalCustomers.value = data.data.totalCustomers;
//       totalRevenue.value = data.data.totalRevenue;
//     } else if (data.action === "newResult") {
//       console.log("new result received", data);

//       totalOrders.value = data.data.totalOrders;
//       totalCustomers.value = data.data.totalCustomers;
//       totalRevenue.value = data.data.totalRevenue;
//     }
//   };

//   socket.onclose = () => {
//     console.log("Connection closed. Reconnecting...");
//   };

//   socket.onerror = (err) => {
//     console.error("Socket encountered error: ", err.message, "Closing socket");
//     socket.close();
//   };
// });

onMounted(() => {
  fetchAllOrders();
  socket.onmessage = (e) => {
    const data = JSON.parse(e.data);
    console.log("Message received:", e.data);

    if (data.action === "newOrder") {
      console.log("new order received", data);
      handleNewOrder(data.data);
    }
  };
  fetchAllOrders();
});

const handleNewOrder = (order) => {
  totalOrders.value++;
  totalRevenue.value += order.price;
};

const showAllOrders = () => {
  router.push({ name: "Orders" });
};

let totalOrders = ref("");
let totalCustomers = ref("");
let totalRevenue = ref("");
let pending = ref("");
let inProgress = ref("");
let delivered = ref("");
let canceled = ref("");

const fetchAllOrders = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/v1/orders", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await response.json();

    if (data.status === "success") {
      totalOrders.value = data.data.orders.length;
      //totalrevenue is the sum of all the orders
      totalRevenue.value = data.data.orders.reduce(
        (acc, order) => acc + order.price,
        0
      );
      //total customers is the number of unique customers based on the customerName
      totalCustomers.value = data.data.orders.reduce((acc, order) => {
        if (!acc.includes(order.customerName)) {
          acc.push(order.customerName);
        }
        return acc;
      }, []).length;

      pending.value = data.data.orders.filter(
        (order) => order.status === "Pending"
      ).length;
      inProgress.value = data.data.orders.filter(
        (order) => order.status === "In Progress"
      ).length;
      delivered.value = data.data.orders.filter(
        (order) => order.status === "Completed"
      ).length;
      canceled.value = data.data.orders.filter(
        (order) => order.status === "Canceled"
      ).length;
    } else {
      console.error("Error fetching total orders:", data.message);
    }
  } catch (error) {
    console.error("Error fetching total orders:", error);
  }
};

const newestOrdersToShow = 4;
</script>

<template>
  <div class="w-screen h-screen flex bg-stone-100">
    <Sidebar />
    <div class="w-full">
      <Topbar />
      <div class="p-8">
        <h1 class="text-2xl font-semibold mb-2">Home</h1>
        <div class="w-fit p-4 pr-0 my-4">
          <h2 class="text-base font-semibold mb-2">Overview</h2>
          <div class="flex row">
            <CardSmall title="Total Orders" :content="totalOrders" />
            <CardSmall title="Total Customers" :content="totalCustomers" />
            <CardSmall title="Total Revenue" :content="totalRevenue" />
          </div>
        </div>
        <div class="w-fit p-4 pr-0 my-4">
          <h2 class="text-base font-semibold mb-2">Global Order Status</h2>
          <div class="flex row">
            <CardSmall
              icon="../src/assets/icons/pending.svg"
              title="Pending"
              :content="pending"
            />
            <CardSmall
              icon="../src/assets/icons/inprogress.svg"
              title="In Progress"
              :content="inProgress"
            />
            <CardSmall
              icon="../src/assets/icons/delivered.svg"
              title="Delivered"
              :content="delivered"
            />
            <CardSmall
              icon="../src/assets/icons/cancel.svg"
              title="Canceled"
              :content="canceled"
            />
          </div>
        </div>
        <div class="max-w-6xl p-4 pb-0 my-4">
          <div class="flex row items-center">
            <h2 class="text-base font-semibold">Newest Orders</h2>
            <img
              src="../assets/label-live.jpg"
              alt=""
              class="h-fit w-auto ml-2"
            />
          </div>
          <OrderTable :ordersToShow="newestOrdersToShow" />
          <div class="flex row items-center justify-end">
            <button
              class="py-2 px-4 bg-black text-primary-accent font-medium text-sm mt-2 cursor-pointer rounded"
              @click="showAllOrders"
            >
              See All Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
