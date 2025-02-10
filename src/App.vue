<script setup>
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
import { useProductStore } from "@/stores/ProductStore";
import { useCartStore } from "@/stores/CartStore";
import { reactive, ref } from "vue";
const productStore = useProductStore();
const cartStore = useCartStore();

const addToCart = (count, product) => {

  count = parseInt(count)
  cartStore.$patch(state => {
    for (let index = 0; index < count; index++) {
      state.items.push(product)
    }
  })
}
productStore.fill();

cartStore.$onAction(({
  name,
  //store,
  args,
  after,
  onError
}) => {
  if (name === "addItems") {
    after(() => {
      console.log("cositas:", args[0])
    })
    onError((error) => {
      console.log("Hello error:", error.message)
    })
  }
})
cartStore.$subscribe((mutation, state) => {
  console.log({ mutation })
  console.log({ state })
})


//history

const history = reactive([])
const doingHistory = ref(false)
history.push(JSON.stringify(cartStore.$state));

const undo = () => {
  if (history.length === 1) return
  doingHistory.value = true
  history.pop()
  cartStore.$state = JSON.parse(history.at(-1))
  doingHistory.value = false
}

const future = reactive([])
history.push(JSON.stringify(cartStore.$state));

const redo = () => {
  const latestState = future.pop()
  if (!latestState) return;
  doingHistory.value = true;
  history.push(latestState)
  cartStore.$state = JSON.parse(latestState)
  doingHistory.value = false;
}

cartStore.$subscribe((mutation, state) => {
  if (!doingHistory.value) {
    history.push(JSON.stringify(state));
    future.splice(0, future.length)
    //no podem resetejar a zero ja que perdriem la reactivitat
  }
})

</script>

<template>
  <div class="container">
    <TheHeader />
    <div class="mb-5 flex justify-end">
      <AppButton @click="undo">Undo</AppButton>
      <AppButton class="ml-2" @click="redo">Redo</AppButton>
    </div>
    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <!--ProductCard
        v-for="product in productStore.products"
        :key="product.name"
        :product="product"
        @addToCart="cartStore.addItems($event, product)"
      /-->
      <ProductCard v-for="product in productStore.products" :key="product.name" :product="product"
        @addToCart="addToCart($event, product)" />
    </ul>
  </div>
</template>
