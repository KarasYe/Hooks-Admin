import { ResPage, Menu } from '@/api/interface/index'
import { PORT1 } from '@/api/config/servicePort'

import http from '@/api'

/**
 * @name menu管理模块
 */
// * 获取Menu列表
export const getMenuList = (params: Partial<Menu.ReqGetParams>) => {
	return http.get<ResPage<Menu.ResList>>(`${PORT1}/menuList`, params)
}

// * 删除Menu
export const deleteMenu = (params: { ids: string }) => {
	return http.delete(`${PORT1}/menus`, params)
}

// * 新增Menu
export const createMenu = (params: Menu.ResList) => {
	return http.post(`${PORT1}/createMenu`, params)
}

// * 更新Menu
export const updateMenu = (params: Menu.ResList) => {
	return http.put(`${PORT1}/menus/${params.id}`, params)
}
