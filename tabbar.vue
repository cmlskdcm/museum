<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { routerItem } from '@/api/compontents/types'

const query = defineProps<{
  page: string
}>()
const routesTabBar = reactive<routerItem[]>([
  {
    name: '主页',
    path: '/pages/index/index',
    icon: '/static/tabbar/home.png',
    iconSelected: '/static/tabbar/home_selected.png',
  },
  {
    name: '数据',
    path: '/pages/data/data',
    icon: '/static/tabbar/data.png',
    iconSelected: '/static/tabbar/data_selected.png',
  },
  {
    name: '展览',
    path: '/pages/display/display',
    icon: '/static/tabbar/display.png',
    iconSelected: '/static/tabbar/display_selected.png',
  },
  {
    name: '我的',
    path: '/pages/my/my',
    icon: '/static/tabbar/profile.png',
    iconSelected: '/static/tabbar/profile_selected.png',
  },
])
function toPages(path: string) {
  uni.switchTab({
    url: path,
  })
}
const activeIndex = ref<string>(query.page)
const { safeAreaInsets } = uni.getSystemInfoSync()
</script>

<template>
  <view class="tabbar_contain">
    <view
      v-for="item in routesTabBar"
      :key="item.name"
      class="tabbar_item"
      @click="toPages(item.path)"
    >
      <image
        v-show="activeIndex! == item.name"
        :src="item.iconSelected as string"
        mode="aspectFit"
        class="tabbar_icon"
      ></image>
      <image
        v-show="activeIndex! != item.name"
        :src="item.icon"
        mode="aspectFit"
        class="tabbar_icon"
      ></image>
      <view class="tabbar_title" :class="{tabbar_select : activeIndex! == item.name }">{{
        item.name
      }}</view>
    </view>
  </view>
  <view class="safeBottom" :style="{ height: safeAreaInsets?.bottom }"></view>
</template>

<style scoped lang="scss">
.safeBottom {
  width: 100%;
  background-color: #181818;
}
.tabbar_select {
  color: #27ba9b !important;
}
.tabbar_contain {
  width: 100%;
  height: 75px;
  background-color: #181818;
  position: fixed;
  bottom: 0;
  display: flex;
  .tabbar_item {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .tabbar_icon {
      margin-top: 5px;
      width: 30px;
      height: 30px;
    }
    .tabbar_title {
      width: 100%;
      margin-top: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #949494;
      font-size: 0.7em;
    }
  }
}
</style>
