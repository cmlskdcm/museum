<script setup lang="ts">
import {ref} from 'vue'
import routerPopup from '@/components/routerPopup.vue'
import { onHide } from '@dcloudio/uni-app'
const {safeAreaInsets} = uni.getSystemInfoSync()
const searchData = ref<string>('')
defineProps<{
  isDisabled?: boolean
  isMore?: boolean
}>()
const popup = ref<{
  open: () => void,
  close: () => void
}>()
const openPopup = () => {
  popup.value?.open()
}
const closePopup = () => {
  popup.value?.close()
}
onHide(() => {
  // console.log('页面隐藏了')
  closePopup()
})
</script>

<template>
  <view class="navigateBar_contain">
    <view class="navbar" :style="{height: safeAreaInsets?.top + 'px'}"></view>
    <view class="navigateBar">
<!--      侧边框按钮-->
      <view v-if="isMore" class="navigateBar_icon" @click="openPopup()">
        <u-icon name="/static/icons/navigatePopup.svg" width="30px" height="30px" ></u-icon>
      </view>
<!--      搜索框-->
      <view class="navigateBar_search">
        <u-search v-model="searchData" shape="round" :clearabled="true" :showAction="false"
        actionText='' :disabled="isDisabled" searchIconSize="22" placeholder="请输入内容"
        bgColor="#2c2c2c" placeholderColor="#949494" color="#e3e4e7"></u-search>
      </view>
    </view>
  </view>
  <uni-popup ref="popup" type="left" background-color="#181818">
    <routerPopup @close="closePopup()"></routerPopup>
  </uni-popup>
</template>

<style scoped lang="scss">
.navigateBar_contain {
  width: 90vw;
  margin-left: 5vw;
  display: flex;
  flex-direction: column;
  .navigateBar{
    width: 100%;
    height: 60px;
    position: relative;
    display: flex;
    align-items: center;
    //border-bottom: #999999 solid 1rpx;
    .navigateBar_icon {
      width: 10%;
      height: 100%;
      margin-right: 3%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .navigateBar_search {
      width: 83%;
      height: 75%;
      border-radius: 20px;

      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
.navbar {
  width: 90vw;
  margin-left: -1px;
}
</style>
