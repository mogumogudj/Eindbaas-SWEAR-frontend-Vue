<script setup>
import { onMounted, ref, defineProps, computed } from "vue";
import { useRouter } from "vue-router";
import OrderStatus from "./OrderStatus.vue";

const router = useRouter();

const goToOrderDetails = (orderid) => {
  router.push({ name: "OrderDetails", params: { id: orderid } });
};

const props = defineProps(["ordersToShow"]);

const orders = ref([]);

const getAllOrders = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/v1/orders", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await response.json();

    if (data.status === "success") {
      orders.value = data.data.orders;
    } else {
      console.error("Error fetching orders:", data.message);
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
};

const socket = new WebSocket("ws://localhost:3000/primus");

onMounted(() => {
  getAllOrders();
  socket.onmessage = (e) => {
    const data = JSON.parse(e.data);
    console.log("Message received:", e.data);

    if (data.action === "newOrder") {
      console.log("new order received", data);
      handleNewOrder(data.data);
    }
  };

  const handleNewOrder = (order) => {
    orders.value.unshift(order);
  };
  getAllOrders();
});

const limitedOrders = computed(() => orders.value.slice(0, props.ordersToShow));
</script>

<template>
  <table
    class="w-full max-w-6xl border-separate border-spacing-x-0 border-spacing-y-4"
  >
    <thead class="h-10 text-neutral-200 text-left">
      <tr class="text-xs">
        <th class="font-medium pl-4 rounded-l bg-stone-900">Order ID #</th>
        <th class="font-medium pl-4 bg-stone-900">Shipment From</th>
        <th class="font-medium pl-4 bg-stone-900">Shipment To</th>
        <th class="font-medium pl-4 bg-stone-900">Order Date</th>
        <th class="font-medium pl-4 bg-stone-900">Status</th>
        <th class="font-medium pr-4 rounded-r bg-stone-900 text-right">
          Invoice
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="order in limitedOrders"
        :key="order._id"
        class="h-10 text-sm cursor-pointer hover:text-primary-accent"
        @click="() => goToOrderDetails(order._id)"
      >
        <td class="pl-4 rounded-l bg-white">{{ order._id }}</td>
        <td class="pl-4 bg-white">{{ order.deliveryAdress.shippingFrom }}</td>
        <td class="pl-4 bg-white">{{ order.deliveryAdress.shippingTo }}</td>
        <td class="pl-4 bg-white">{{ order.orderDate }}</td>
        <td class="pl-4 bg-white">
          <OrderStatus title="OrderStatus" :content="order.status" />
        </td>
        <td class="pr-4 rounded-r bg-white font-semibold text-right">View</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped></style>
