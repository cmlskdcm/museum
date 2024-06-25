<script setup lang="ts">

import { onLoad } from '@dcloudio/uni-app'
import { reactive, ref } from 'vue'
import type { exhibitItem_display } from '@/api/display/types'
import { getItemByID } from '@/api/display'
// import { postReserveApi } from '@/api/reserve'

const {safeAreaInsets} = uni.getSystemInfoSync()

const query = defineProps<{
  itemId?: string
}>()

onLoad((options: any) => {
  initData(options.itemId)
  console.log('options.itemId///// ',options.itemId)
})
const itemData = reactive<{
  object: exhibitItem_display
}>({
  object: {
    exhibitId: 'FCD-001',
    name: '方圆之境——湖南博物院藏铜镜展',
    nickname: '湖南省博馆藏',
    // time: '1640803200-1656806400',
    timeOpen: '1640803200',
    timeClose: '1656806400',
    site: '湖南博物馆 / 三楼特色展厅',
    introduction: '铜镜是我国古代青铜器中旁逸斜出又妙趣横生的一朵奇葩。近代国学大师罗振玉的《古镜图录》有云：“刻画之精巧，文字之瑰奇，辞旨之温雅，一器而三善备焉者，莫镜若也。”而事实上，铜镜之旨趣不止于此。'+
      '\n'+
      '青铜时代结束之后，鼎、簋、尊等青铜礼器逐渐退居庙堂、宗祠等专用场所，铜镜、铜钱等小件却日益深入百姓生活，生产规模逐渐扩大。尤其铜镜不断推陈出新，历经了两汉繁荣和魏晋南北朝的中衰，至唐代达到了发展巅峰，其后历经宋元明清时期的平稳发展，在清代中晚期玻璃镜出现之后才日渐式微。数千年间，铜镜在铸造工艺、造型、纹饰、铭文方面都与时俱进，花样翻新，异彩纷呈，可谓铜器中硕果仅存的不断生长的鲜活范本。' +
      '\n' +
      '中国古代铜镜，作为人民日常生活中不可或缺的器具，承载着宗教信仰、美好祝愿等诸多寓意，也频繁出现在诗词歌赋、传奇话本等历代文学作品中，产生了广为流传的破镜重圆、以人为镜等典故或故事，使得铜镜成为了一种无法替代的文学意象，并形成一种“镜鉴文化”。' +
      '\n' +
      '本次展览甄选湖南博物院院藏铜镜中200余面形态风格精绝于时代者，基本涵盖战国至明清等各个历史时期的主要镜种，旨在通过对不同时代铜镜的造型、纹饰、铭文等的展示，体现铜镜发展脉络，揭示铜镜延续数千年的旺盛生命力，发掘其文化内涵。' +
      '\n' +
      '明镜所以察形，述古所以知今。铜镜对于今天的我们而言，如同方方圆圆的窗口，由此可以窥见古人的生活、科技、艺术及审美情趣等。方圆之境，可观民风世情，可知兴亡得失，亦可明文化的累积与创新，从而照亮我们的今天。',
    picture: [
      'https://www.hnmuseum.com/sites/default/files/styles/zhuanti_squareimg/public/10067_A_0.jpg?itok=BEJGjfxe',
      'https://www.chnmus.net/webfile//images/attachement/jpg/site2/20120710/2c4138aa3db611662bf009.jpg',
      'https://www.chnmus.net/images/attachement/jpg/site2/20120710/2c4138aa3db611662f7f16.jpg',
      'https://www.chnmus.net/images/attachement/jpg/site2/20120710/2c4138aa3db611662f8517.jpg'],
  }
})
async function initData(itemId: string) {
  await getItemByID(itemId)
    .then((res) => {
      // itemData.object = res.result
      // console.log(itemData.object.name.split('-')[0])
    })
    .catch((res) => {
      console.log('失败了', res)
    })
}

//表单部分
const formData = reactive<{
  time: string,
  title: string,
  number: number,
  price: number,
  phone: string,
  member: string[],
  memberInfo: string[]

}>({
  time: '',
  title: itemData.object.name.split('——')[0],
  number: 1,
  price: 38,
  phone: '',
  member: [],
  memberInfo: [],
})
// const member:string[] = []
// member[2] = 'adwad'
// console.log(member)
let rules = reactive<any>({
  time: {
    rules: [{ required: true, errorMessage: '展览时间不能为空' }]
  },
  phone: {
    rules: [{ required: true, errorMessage: '联系人手机号不行为空'},
      { pattern: /^1[3-9]\d{9}$/, errorMessage: '手机号格式错误',}]
  },
  member: {
    rules: [{ required: true, errorMessage: '姓名信息不能为空' }]
  },
  memberInfo: {
    rules: [{ required: true, errorMessage: '身份证信息不能为空' }]
  },
})
function maskClick(res:any) {
  console.log('取消选择事件')
}
function change(res:any) {
  console.log('选择事件触发',res)
}
//简化
function add_numberBox(num: number) {
  if (num <= 9) {
    rules['member_'+ formData.number] ={
      rules: [{ required: true, errorMessage: '姓名信息不能为空' }]
    }
    rules['memberInfo_'+ formData.number] ={
      rules: [{ required: true, errorMessage: '身份证信息不能为空' }]
    }
    formData.number++
    console.log('rules/// ',rules)
    return formData.number
  }
  return num
}
function lose_numberBox(num: number) {
  if (num >= 2) return formData.number--
  return num
}

//检验方法
const formRef = ref<any>(null)
async function loseForce(type:string, data:any) {
  await formRef.value.setValue(type,data)
  console.log(type,data)
}
const handleSubmit = async () => {
  console.log('触发表单验证')
  console.log('formData',formData)
  try{
    await formRef.value.validate()
    console.log('formData',formData)
    //post请求
    // await postReserveApi(formData).then((res:any) => {console.log('请求成功',res)}).catch((res:any) => {console.log('请求失败',res)})
    setTimeout(() => {
      uni.navigateBack()
      uni.showToast({
        title: '预约成功'
      })
    },1500)
  }catch(error){
    console.log(error)
  }
}
</script>

<template>
  <view class="reserve_container">
    <view style="background-color: #101010;width: 100vw" :style="{height: safeAreaInsets?.top + 'px'}"></view>
    <scroll-view :scroll-y="true" class="reserve_context">
      <view class="reserve_context_part01">
        <!--        提取成组件-->
        <view class="icons">
          <image mode="aspectFit" src="/static/icons/profile.svg" class="icons_image"></image>
          <view class="icons_title">{{itemData.object?.nickname}}</view>
        </view>
        <view class="icons">
          <image mode="aspectFit" src="/static/icons/time.svg" class="icons_image"></image>
          <view class="icons_title">{{new Date(itemData.object!.timeOpen).toLocaleDateString() +'-' +new Date(itemData.object!.timeClose).toLocaleDateString() + '   9:00-18:00(17:00停止入场)'}}</view>
        </view>
        <view class="icons">
          <image mode="aspectFit" src="/static/icons/site.svg" class="icons_image"></image>
          <view class="icons_title">{{itemData.object?.site+'  湖南省长沙市雨花区环保科技产业园兴安路大观中心3-5层(高德可导航:大观中心)' }}</view>
        </view>
      </view>
      <!--      第二部分-->
      <uni-forms ref="formRef" :modelValue="formData" :rules="rules" validate-trigger="blur">
        <!--      订单部分-->
        <view class="reserve_context_part02" style="padding-bottom: 15px">
          <!--          预定日期-->
          <view class="formItem">
            <view class="review_title">
              <view style="width: 30%;display: flex;align-items: center;justify-content: center">预定日期</view>
              <view class="display-flex-row align-items-center justify-content-center" style="color:#949494;flex: 1;">
                <view class="example-body">
                  <uni-datetime-picker @change="change" start="2024-6-10" end="2024-6-17" return-type="timestamp" :border="false" type="date" :clear-icon="false" v-model="formData.time" @maskClick="maskClick" />
                </view>
              </view>
            </view>
          </view>
          <!--          预定门票 -->
          <view class="formItem margin-top-15">
            <view class="review_title">
              <view class="display-flex-row justify-content-center align-items-center" style="width: 30%;">预定门票</view>
              <view class="display-flex-row justify-content-center align-items-center" style="color:#949494;flex: 1;">{{formData.title}}</view>
            </view>
          </view>
          <!--          门票数量-->
          <view class="formItem margin-top-15">
            <view class="review_title">
              <view class="display-flex-row justify-content-center align-items-center" style="width: 30%;">门票数量</view>
              <view class="display-flex-row justify-content-center align-items-center" style="color:#949494;flex: 1;">
                <image @click="lose_numberBox(formData.number)" mode="aspectFit" class="numberBox" src="/static/icons/lose.svg"></image>
                <view class="numberBox">{{formData.number}}</view>
                <image @click="add_numberBox(formData.number)" mode="aspectFit" class="numberBox" src="/static/icons/add02.svg"></image>
              </view>
            </view>
          </view>
          <!--          合计金额-->
          <view class="formItem margin-top-15">
            <view class="review_title">
              <view class="display-flex-row justify-content-center align-items-center" style="width: 30%;">合计</view>
              <image mode="aspectFit" style="margin-left:25px;width: 20px;height: 20px;" src="/static/icons/money.svg"></image>
              <view class="display-flex-row justify-content-center align-items-center" style="margin-right:25px;font-size:1.1em;color:#949494;flex: 1;">{{formData.number * formData.price}}</view>
            </view>
          </view>
        </view>
        <!--      固定成员-->
        <view class="reserve_context_part02">
          <view class="formItem" style="color: #deb887;margin-bottom: 10px">看展人信息</view>
          <view class="formItem">
            <uni-forms-item name="phone">
              <input class="input_name" placeholder="请输入联系人手机号" placeholder-style="color:#949494" :maxlength="20" v-model="formData.phone"  :adjust-position=false :auto-blur="true" @blur="loseForce('phone',formData.phone)"/>
            </uni-forms-item>
          </view>
          <view class="formItem">
            <uni-forms-item name="member">
              <input class="input_name" placeholder="请输入姓名" placeholder-style="color:#949494" :maxlength="20" v-model="formData.member[0]"  :adjust-position=false :auto-blur="true" @blur="loseForce('member',formData.member[0])"/>
            </uni-forms-item>
          </view>
          <view class="formItem">
            <uni-forms-item name="memberInfo">
              <input class="input_name" placeholder="请输入身份证号" placeholder-style="color:#949494" :maxlength="20" v-model="formData.memberInfo[0]"  :adjust-position=false :auto-blur="true" @blur="loseForce('memberInfo',formData.memberInfo[0])"/>
            </uni-forms-item>
          </view>
        </view>
        <!--      额外成员-->
        <view v-for="item in formData.number - 1 " :key="item" class="reserve_context_part02">
          <view class="formItem" style="color: #deb887; margin-bottom: 10px">第 {{ item + 1 }} 位看展人信息</view>
          <view class="formItem">
            <uni-forms-item :name="'member_'+item">
              <input class="input_name" placeholder="请输入姓名" placeholder-style="color:#949494" :maxlength="20" v-model="formData.member[item+1]"  :adjust-position=false :auto-blur="true" @blur="loseForce('member_'+item,formData.member[item])"/>
            </uni-forms-item>
          </view>
          <view class="formItem">
            <uni-forms-item :name="'memberInfo_'+item">
              <input class="input_name" placeholder="请输入身份证号" placeholder-style="color:#949494" :maxlength="20" v-model="formData.member[item+1]"  :adjust-position=false :auto-blur="true" @blur="loseForce('memberInfo_'+item,formData.memberInfo[item])"/>
            </uni-forms-item>
          </view>
        </view>
      </uni-forms>
      <view class="reserve_context_part03">
        <p>&emsp;*65周岁(含65周岁)以上老年人、残疾人、现役军人、伤残军人、军队离退休干部、国家综合性消防救援队伍人员武警官兵、公安民警、省部级以上劳模、英模道德模范可享免费参观</p>
        <p>&emsp;*1.2m及以下婴幼儿(须成人陪同参观)无需购票即可参观</p>
      </view>
      <view style="width: 100vw" :style="{height: safeAreaInsets?.bottom as number + 130 + 'rpx'}"></view>
    </scroll-view>
    <view class="reserve_tabBar" :style="{height: safeAreaInsets?.bottom as number + 100 + 'rpx'}">
      <button class="reserve_tabBar_button">学生预约</button>
      <button style="background-color: #deb887;" class="reserve_tabBar_button" @click="handleSubmit">确定预约</button>
    </view>
  </view>
</template>

<style scoped lang="scss">
@import '@/styles/common.scss';
.reserve_context {
  width: 96vw;
  flex: 1;
  //background-color: #05c160;
  padding-left: 2%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .reserve_context_part01 {
    width: 96%;
    padding: 2% 2% 2% 3%;
    border-radius: 10px;
    font-size: 1.3em;
    display: flex;
    color: #deb887;
    background-color: #181818;
    flex-direction: column;
    justify-content: space-evenly;
  }
  .reserve_context_part02{
    //background-color: #2c2c2c;
    width: 90vw;
    height: auto;
    background-color: #181818;
    border-radius: 10px;
    padding-top: 10px;
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-direction: column;
    .formItem{
      width: 100%;
      margin-top: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      .input_name{
        width: 80vw;
        height: 50px;
        border-radius: 5px;
        padding-left: 5%;
        color:#f6f6f6;
        background-color: #2c2c2c;
      }
      .review_title{
        width: 90%;
        height: 48px;
        border-radius: 5px;
        background-color: #2c2c2c;
        display: flex;
        justify-content: space-around;
        align-items: center;
        color: #deb887;
        .numberBox{
          width: 18px;
          aspect-ratio: 1/1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          margin-left: 10px;
        }
      }
    }
  }
  .reserve_context_part03{
    width: 90%;
    height: auto;
    color: #949494;
    font-size: 0.9em;
    margin-top: 15px;
  }
}
.reserve_container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #101010;
}

.icons {
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  .icons_image{
    width: 24px;
    aspect-ratio: 1/1;
    margin-right: 8px;
  }
  .icons_title {
    flex: 1;
    height: auto;
    padding: 5px 0 5px 0;
    display: flex;
    align-items: center;
    color: #deb887;
    font-size: 0.9em;
  }
}
.reserve_tabBar {
  width: 100vw;
  position: fixed;
  bottom: 0;
  background-color: #050505;
  display: flex;
  justify-content: space-evenly;
  .reserve_tabBar_button{
    width: 45%;
    height: 50px;
    margin-top: 5px;
    background-color: #27ba9b;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(255, 255, 255, 0.7);
    font-size: 1.5em;
    font-weight: bold;
  }
}
::v-deep .uni-date__x-input{
  padding-left: 20% !important;
}
::v-deep .uni-forms-item__error{
  margin-top: 4px;
  margin-left: 4vw;
}
::v-deep .uni-date-x{
  background-color: #2c2c2c !important;
}

</style>
<!--<uni-forms-item name="memberInfo"></uni-forms-item>-->
