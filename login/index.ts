// 登录界面的背景图片网络请求
import { http } from '@/utils/http'
import type { loginStoreType, userInfoItem } from '@/api/login/types'

export const LoginImageApi = () => {
  return http<string>({
    method: 'GET',
    url: '/getLoginImageURL',
  })
}

export const wechatLoginApi = ( code :string, encryptedData :string ,iv: string) => {
  return http<any>({
    method: 'POST',
    url: '/user/login',
    data: {
      iv: iv,
      encryptedData: encryptedData,
      code: code,
    },
  })
}
export const postCode = (account: string) => {
  return http<any>({
    method: 'POST',
    url: '/user/sendEmail',
    data: {
      account: account,
    }
  })
}
export const phoneLoginApi = ( code :string,encryptedData:string,iv: string ,account: string, loginCode: string,) => {
  return http<string>({
    method: 'POST',
    url: '/user/loginByEmail',
    data: {
      account: account,
      code: code,
      iv: iv,
      encryptedData: encryptedData,
      codeLogin: loginCode,
    },
  })
}

export const LoginUserInfoApi = () => {
  return http<userInfoItem>({
    method: 'GET',
    url: '/user',
  })
}

export const postMessageApi = ( nickname: string = 'defaultNickname',email:string = "xxx@163.com", avatar: string ) => {
  return http<any>({
    method: 'POST',
    url: '/user/editUserInfo',
    data: {
      nickname: nickname,
      email: email,
      avatar: avatar,
    },
  })
}
// 退出登录
export const deleteLoginApi = (token: string) => {
  return http<any>({
    method: 'DELETE',
    url: '/deleteLoginApi',
    data: token,
  })
}
