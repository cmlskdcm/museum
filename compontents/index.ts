import { http } from '@/utils/http'
import type { routerItem,} from '@/api/compontents/types'

export const getRoutesApi = () => {
  return http<routerItem[]>({
    method: 'GET',
    url: '/roleMenu/getRoleMenu',
  })
}
