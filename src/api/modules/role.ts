import { ResPage, Role } from '@/api/interface/index'
import { PORT1 } from '@/api/config/servicePort'

import http from '@/api'

/**
 * @name role管理模块
 */
// * 获取role列表
export const getRoleList = (params: Partial<Role.ReqGetParams>) => {
	return http.get<ResPage<Role.ResList>>(`${PORT1}/roleList`, params)
}

// * 删除role
export const deleteRole = (params: { id: string | number }) => {
	return http.delete(`${PORT1}/roles/${params.id}`)
}

// * 新增role
export const createRole = (params: Role.ResList) => {
	return http.post(`${PORT1}/createRole`, params)
}

// * 更新role
export const updateRole = (params: Role.ResList) => {
	return http.put(`${PORT1}/roles/${params.id}`, params)
}
