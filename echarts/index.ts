import { http } from '@/utils/http'
import type { areaEchartsData, EchartsOptions, lineEchartsData, pieEchartsData } from '@/api/echarts/types'
// import type { EchartsData } from '@/Api/echarts/types'

export const getLineEchartsApi = () => {
  return http<lineEchartsData>({
    method: 'GET',
    url: '/getLineEchartsApi',
  })
}
export const getPieEchartsApi = () => {
  return http<pieEchartsData>({
    method: 'GET',
    url: '/getPieEchartsApi',
  })
}
export const getAreaEchartsApi = () => {
  return http<areaEchartsData>({
    method: 'GET',
    url: '/getAreaEchartsApi',
  })
}
//
export const getTodayApi = () => {
  return http<EchartsOptions>({
    method: 'GET',
    url: '/getTodayApi',
  })
}
