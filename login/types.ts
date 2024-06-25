export type loginStoreType = {
  token: string | null,
  userInfo: userInfoItem | null,
}
export type userInfoItem = {
  nickname: string,
  avatar: string, //头像路径
  email?: string,
  phone?: string,
  sex?: string,
  city?: string,
  roleId?: number,
}
