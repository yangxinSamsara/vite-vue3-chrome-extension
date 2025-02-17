<template>
  <el-button type="primary" @click="increment">Primary{{ count }}</el-button>
  <el-button type="success" @click="goTop">goTop</el-button>
</template>

<script setup lang="ts">
import { ElButton } from "element-plus";
import { useCounterStore } from "../store/counter";
import { storeToRefs } from "pinia";
const counterStore = useCounterStore();

const { count } = storeToRefs(counterStore);

const increment = () => {
  counterStore.increment();
};

const goTop = () => {
  // 让当前浏览器所在页面滚动到顶部
  console.log("goTop");
  window.parent.postMessage({ action: "scrollToTop" }, "*");
};
</script>
