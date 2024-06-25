import { http } from '@/utils/http'
import type { displayItem, exhibitItem_display, relicItem, SearchItem, siteItem } from '@/api/display/types'
import type { PageParams, PageResult } from '@/types/global'

/**
 * 获取展品信息列表
 * @param {PageParams} PageParams - 分页参数对象,包含页码、每页数量等
 * @returns {Promise<PageResult<exhibitItem_display>>} - 返回包含展品信息列表的分页结果
 */
export const getExhibitItemApi = (PageParams: PageParams , searchData?: string) => {
  return http<PageResult<SearchItem>>({
    method: 'GET',
    url: '/exhibition/getAll',
    data: {
      // PageParams: PageParams,
      page: PageParams.page,
      pageSize: PageParams.pageSize,
      keyWord: searchData,
    }
  })
}
/**
 * 获取站点信息列表
 * @param {Array<string>} dataArray - 站点ID数组
 * @returns {Promise<siteItem>} - 返回站点信息对象
 */
export const getSiteItemApi = (dataArray: Array<string>) => {
  return http<siteItem>({
    method: 'POST',
    url: '/getSiteItemApi',
    data: {
      dataArray,
    },
  })
}

/**
 * 创建或更新展品信息
 * @param {exhibitItem_display} exhibitItem - 展品信息对象
 * @returns {Promise<string>} - 返回创建或更新的结果字符串
 */
export const postExhibitItemApi = (exhibition:exhibitItem_display , ids: string[]) => {
  console.log('exhibition//// ',exhibition)
  return http<string>({
    method: 'POST',
    url: '/exhibition',
    data:{
      exhibition: JSON.stringify(exhibition),
      ids: JSON.stringify(ids)
    }
  })
}

/**
 * 根据搜索条件获取搜索结果列表
 * @param {PageParams} PageParams - 分页参数对象,包含页码、每页数量等
 * @param {string} searchData - 搜索关键词
 * @returns {Promise<PageResult<SearchItem>>} - 返回包含搜索结果列表的分页结果
 */
// export const getSearchItemApi = (PageParams: PageParams, searchData: string) => {
//   return http<PageResult<SearchItem>>({
//     method: 'POST',
//     url: '/getSearchItemApi',
//     data: {
//       PageParams: PageParams,searchData
//     }
//   })
// }

/**
 * 根据 ID 获取文物或展品信息
 * @param {string} itemId - 要获取信息的文物或展品 ID
 * @returns {Promise<relicItem | exhibitItem_display>} - 返回文物或展品的详细信息
 */
export const getItemByID = (itemId: string) => {
  return http<displayItem>({
    method: 'GET',
    url: '/exhibition/getExh/'+ itemId,
  })
}
/**
 * 根据 ID 获取文物或展品信息
 * @param {string} itemId - 要获取信息的文物或展品 ID
 * @returns {Promise<relicItem | exhibitItem_display>} - 返回文物或展品的详细信息
 */
export const getItemByID_relic = (itemId: string) => {
  return http<relicItem>({
    method: 'GET',
    url: '/relics/' + itemId,
  })
}
/**
 * 根据 ID 删除文物或展品信息
 * @param {string} objectId - 要删除的文物或展品 ID
 * @returns {Promise<any>} - 返回删除操作的结果
 */
export const deleteObject_relicsByID = (objectId :string) => {
  return http<any>({
    method: 'DELETE',
    url: '/relics/' + objectId,
  })
}
export const deleteObject_exhibitByID = (objectId :string) => {
  return http<any>({
    method: 'DELETE',
    url: '/exhibition/cancelExh/' + objectId,
  })
}

export const getRelicsApi = (number: number) => {
  return http<any>({
    method: 'GET',
    url: '/relics/getAll',
  })
}

export const getReviewApi = () => {
  return http<any>({
    method: 'GET',
    url: '/user/getUnserve',
  })
}

export const postReview = (type: number, id: UnwrapRef<exhibitItem_display['exhibitId']>) => {
  return http<any>({
    method: 'GET',
    url: '/user/exhPassOrNot',
    data:{
      statusId:type,
      id:id
    }
  })
}

