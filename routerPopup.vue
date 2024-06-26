<script setup lang="ts">
import { reactive , ref } from 'vue'
import type { routerItem } from '@/api/compontents/types'
import { useLoginStore } from '@/stores/modules/login'
import { deleteLoginApi } from '@/api/login'
import { onLoad } from '@dcloudio/uni-app'
import { useRouterStore } from '@/stores'

const emits = defineEmits(['close'])
const curPage = ref<string>('/pages/index/index')
const { safeAreaInsets } = uni.getSystemInfoSync()
// let routesTabBar = reactive<routerItem[]>([
//   {
//     name: '主页',
//     path: '/pages/index/index',
//     icon: '/static/tabbar/home.png',
//     iconSelected: '/static/tabbar/home_selected.png',
// },
//   {
//     name: '数据',
//     path: '/pages/data/data',
//     icon: '/static/tabbar/data.png',
//     iconSelected: '/static/tabbar/data_selected.png',
// },
//   {
//     name: '个人中心',
//     path: '/pages/my/my',
//     icon: '/static/tabbar/profile.png',
//     iconSelected: '/static/tabbar/profile_selected.png',
//   }
// ])
// let routesPages = reactive<routerItem[]>([
//   {
//     name: '录入',
//     path: '/pagesDisplay/exhibitAdd/exhibitAdd',
//     icon: '/static/icons/add.svg',
//   },
//   {
//     name: '审核',
//     path: '/pagesDisplay/review/review',
//     icon: '/static/icons/review.svg',
//   },
//   {
//     name: '查询',
//     path: '/pagesDisplay/exhibit/exhibit',
//     icon: '/static/icons/search.svg',
//   },
//   {
//     name: '设置',
//     path: '/pagesProfile/setting/setting',
//     icon: '/static/icons/setting.svg',
//   }
// ])
function toTabBar(path: string) {
  curPage.value = path
  emits('close')
  setTimeout(() => {
    uni.switchTab({
      url: path,
    })
  }, 700)
}
function toPages(path: string) {
  curPage.value = path
  setTimeout(() => {
    emits('close')
    uni.navigateTo({
      url: path,
    })
  }, 700)
}
const routerStore = useRouterStore()
const loginStore = useLoginStore()
const routesTabBar = routerStore.getTabBar()
const routesPages = routerStore.getPages()

//退出登录
async function toLogin() {
  await deleteLoginApi(loginStore.getToken())
    .then((res) => {
      loginStore.resetLoginStore()
      uni.redirectTo({
        url: '/pages/login/login',
        success: (res: any)=> {
          console.log('页面跳转成功',res)
        },
        fail: (res: any) => {
          console.log('页面跳转成功',res)
        },
      })
    })
    .catch((res:any) => {
      console.log('退出登录失败',res)
    })
}
</script>

<template>
  <view class="router_contain">
    <view class="avatar_contain">
      <view class="avatar" :style="{marginTop: safeAreaInsets!.top + 3 + 'px'}"></view>
    </view>
    <view :class="{router_item_selected: curPage == item.path}" class="router_item" v-for="item in routesTabBar" :key="item.name" @click="toTabBar(item.path)">
      <u-icon :name="item.icon" size="30"></u-icon>
      <view style="margin-left: 5px">{{item.name}}</view>
    </view>
    <view class="router_item" v-for="item in routesPages" :key="item.name" @click="toPages(item.path)">
      <u-icon :name="item.icon" size="30"></u-icon>
      <view style="margin-left: 5px">{{item.name}}</view>
    </view>
    <view class="router_item" @click="toLogin()">
      <u-icon name="/static/icons/unLogin.svg" size="30"></u-icon>
      <view style="margin-left: 5px">退出登录</view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.router_contain{
  width: 78vw;
  height: 100vh;
  background: #323232;
  display: flex;
  flex-direction: column;
  align-items: center;
  .avatar_contain{
    width: 100%;
    aspect-ratio: 1/0.55;
    background-color: #999999;
    position: relative;
    display: flex;
    .avatar {
      width: 23%;
      aspect-ratio: 1/1;
      border-radius: 50%;
      background-color: #05c160;
      margin-left: 5%;
      position: absolute;
      left: 5%;
    }
  }
  .router_item{
    width: 94%;
    height: 45px;
    margin-top: 10px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 15px;
    color: #fdfdfd;
    font-size: 1em;
    font-weight: bold;
    //background-color: #27ba9b;
  }
  .router_item_selected{
    color: #009788 !important;
    background-color: #2c3e40 !important;
  }
}
.navbar {
  width: 100%;
  background: #050505;
}
</style>
