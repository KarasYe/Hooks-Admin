import { ResPage, Permission } from '@/api/interface/index'
import { PORT1 } from '@/api/config/servicePort'

import http from '@/api'

/**
 * @name permission管理模块
 */
// * 获取Permission列表
export const getPermissionList = (params: Partial<Permission.ReqGetParams>) => {
	return http.get<ResPage<Permission.ResList>>(`${PORT1}/permissionList`, params)
}

// * 删除Permission
export const deletePermission = (params: { id: string | number }) => {
	return http.delete(`${PORT1}/permissions/${params.id}`)
}

// * 新增Permission
export const createPermission = (params: Permission.ResList) => {
	return http.post(`${PORT1}/createPermission`, params)
}

// * 更新Permission
export const updatePermission = (params: Permission.ResList) => {
	return http.put(`${PORT1}/permissions/${params.id}`, params)
}
