<script setup>
import Sidebar from "../components/Sidebar.vue";
import Topbar from "../components/Topbar.vue";
import OrderStatus from "../components/OrderStatus.vue";
import { ref, watchEffect, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const previousRoute = ref(null);

// Watch for route changes
watchEffect(() => {
  previousRoute.value = router.currentRoute.value;
});

const orderId = ref(router.currentRoute.value.params.id);
const orderDetails = ref({});
const selectedStatus = ref("");

const fetchOrderDetails = async () => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/v1/orders/${orderId.value}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const data = await response.json();

    if (data.status === "success") {
      orderDetails.value = data.data.order;
      selectedStatus.value = orderDetails.value.status;
    } else {
      console.error("Error fetching order details:", data.message);
    }
  } catch (error) {
    console.error("Error fetching order details:", error);
  }
};

const updateOrderStatus = async () => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/v1/orders/${orderId.value}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: selectedStatus.value }),
      }
    );

    const data = await response.json();

    if (data.status === "success") {
      await fetchOrderDetails();
    } else {
      console.error("Error updating order status:", data.message);
    }
  } catch (error) {
    console.error("Error updating order status:", error);
  }
};

const deleteOrder = async () => {
  const isConfirmed = window.confirm(
    "Are you sure you want to delete this order?"
  );

  if (isConfirmed) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/orders/${orderId.value}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        router.push({ name: "Orders" });
      } else {
        console.error("Error deleting order:", data.message);
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  }
};

onMounted(() => {
  fetchOrderDetails();
});
</script>

<template>
  <div class="w-screen h-screen flex bg-stone-100">
    <Sidebar />
    <div class="w-full">
      <Topbar />
      <div class="p-8">
        <button @click="goBack" class="text-blue-500 hover:underline">
          Back
        </button>

        <h1 class="text-2xl font-semibold mb-2">Order</h1>
        <div class="flex flex-row justify-between items-center">
          <div class="flex flex-row items-center">
            <p class="text-base font-light mr-4 text-gray-500">{{ orderId }}</p>

            <OrderStatus title="OrderStatus" :content="orderDetails.status" />
          </div>

          <div>
            <!-- Dropdown menu for order status -->
            <select v-model="selectedStatus" class="text-sm py-2 px-4 rounded">
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <button
              @click="updateOrderStatus"
              class="text-sm text-neutral-700 p-2 ml-4 border border-neutral-400 rounded"
            >
              Update Status
            </button>
          </div>
        </div>

        <div class="w-full p-4 pr-0 my-4">
          <h2 class="text-base font-semibold mb-2">Overview</h2>
          <div
            class="w-full flex flex-row items-center justify-between bg-white p-4 rounded"
          >
            <div class="flex flex-row">
              <div class="mr-8">
                <img
                  :src="orderDetails.image"
                  alt="Card Image"
                  class="w-[200px] h-auto rounded"
                />
              </div>

              <div class="flex flex-row">
                <div class="mr-4">
                  <div class="mb-2">
                    <p class="text-sm text-gray-500 mb-1">Order ID</p>
                    <p class="text-base font-semibold">
                      {{ orderDetails._id }}
                    </p>
                  </div>

                  <div class="mb-2">
                    <p class="text-sm text-gray-500 mb-1">Article ID</p>
                    <p class="text-base font-semibold">
                      {{ orderDetails.orderNumber }}
                    </p>
                  </div>

                  <div>
                    <p class="text-sm text-gray-500 mb-1">Order Date</p>
                    <p class="text-base font-semibold">
                      {{ orderDetails.orderDate }}
                    </p>
                  </div>
                </div>
                <div class="">
                  <div class="mb-2">
                    <p class="text-sm text-gray-500 mb-1">Price</p>
                    <p class="text-base font-semibold">
                      {{ "€" + " " + orderDetails.price }}
                    </p>
                  </div>

                  <div class="mb-2">
                    <p class="text-sm text-gray-500">Quantity</p>
                    <p class="text-base font-semibold">
                      {{ orderDetails.quantity }}
                    </p>
                  </div>

                  <div>
                    <p class="text-sm text-gray-500 mb-1">Size</p>
                    <p class="text-base font-semibold">
                      {{ orderDetails.shoeSize }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-fit h-auto mr-2">
              <img
                src="../assets/swear-qr.png"
                alt="QR Code"
                class="w-40 h-auto rounded-lg"
              />
            </div>
          </div>
        </div>

        <!-- customer section -->
        <div class="w-full p-4 pr-0 my-4">
          <h2 class="text-base font-semibold mb-2">Customer</h2>
          <div
            class="flex items-center justify-left w-1/8 bg-white p-6 rounded-lg"
          >
            <div class="flex">
              <div class="mr-12">
                <p class="text-sm text-gray-500 mb-1">Customer ID</p>
                <p class="text-base font-semibold">
                  {{ orderDetails.customerId }}
                </p>
              </div>

              <div class="mr-12">
                <p class="text-sm text-gray-500 mb-1">Name</p>
                <p class="text-base font-semibold">
                  {{ orderDetails.firstName + " " + orderDetails.lastName }}
                </p>
              </div>

              <div>
                <p class="text-sm text-gray-500 mb-1">Email</p>
                <p class="text-base font-semibold">
                  {{ orderDetails.email }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- shipping section -->
        <div class="w-full p-4 pr-0 my-4">
          <h2 class="text-base font-semibold mb-2">Shipping</h2>
          <div
            class="flex items-center justify-left w-1/8 bg-white p-6 rounded-lg"
            v-if="orderDetails.deliveryAdress"
          >
            <div class="flex">
              <div class="mr-12">
                <p class="text-sm text-gray-500 mb-1">Shipping from</p>
                <p class="text-base font-semibold">
                  {{ orderDetails.deliveryAdress.shippingFrom }}
                </p>
              </div>

              <div class="mr-12">
                <p class="text-sm text-gray-500 mb-1">Shipping To</p>
                <p class="text-base font-semibold">
                  {{ orderDetails.deliveryAdress.shippingTo }}
                </p>
              </div>

              <div class="mr-12">
                <p class="text-sm text-gray-500 mb-1">Shipping Address</p>
                <p class="text-base font-semibold">
                  {{ orderDetails.deliveryAdress.fullAdress }}
                </p>
              </div>

              <div class="mr-44">
                <p class="text-sm text-gray-500 mb-1">Date</p>
                <p class="text-base font-semibold">
                  {{ orderDetails.orderDate }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-row justify-end items-center w-full my-4">
          <button
            @click="deleteOrder"
            class="p-2 text-sm font-normal border border-red-500 text-red-500 rounded"
          >
            Delete Order
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      // Use the previous route information to determine where to go back
      const backRoute = this.previousRoute?.value?.name || "/";
      this.$router.push(backRoute);
    },
  },
};
</script>

<style scoped></style>
