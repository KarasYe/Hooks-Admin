import { ResPage, User } from '@/api/interface/index'
import { PORT1 } from '@/api/config/servicePort'

import http from '@/api'

/**
 * @name 用户管理模块
 */
// * 获取用户列表
export const getUserList = (params: Partial<User.ReqGetParams>) => {
	return http.get<ResPage<User.ResList>>(`${PORT1}/userList`, params)
}

// * 新增用户
export const createUser = (params: User.ResList) => {
	return http.post(`${PORT1}/createUser`, params)
}

// * 批量添加用户
export const BatchAddUser = (params: FormData) => {
	return http.post(`${PORT1}/user/import`, params, { headers: { 'Content-Type': 'multipart/form-data' } })
}

// * 编辑用户
export const editUser = (params: { id: string }) => {
	return http.post(`${PORT1}/user/edit`, params)
}

// * 更新用户
export const updateUser = (params: User.ResList) => {
	return http.put(`${PORT1}/users/${params.id}`, params)
}

// * 删除用户
export const deleteUser = (params: { id: string | number }) => {
	return http.delete(`${PORT1}/users/${params.id}`)
}

// * 获取当前用户信息
export const getUserInfo = () => {
	return http.get<User.ResList>(`${PORT1}/userInfo`)
}

// * 更新当前用户信息
export const updateUserInfo = (params: Partial<User.ResList>) => {
	return http.put(`${PORT1}/userInfo`, params)
}

// * 重置当前用户密码
export const resetPassWord = (params: User.Password) => {
	return http.put(`${PORT1}/resetPassword`, params)
}

// * 切换用户状态
export const changeUserStatus = (params: { id: string; status: number }) => {
	return http.post(`${PORT1}/user/change`, params)
}

// * 重置用户密码
export const resetUserPassWord = (params: { id: string }) => {
	return http.post(`${PORT1}/user/rest_password`, params)
}

// * 导出用户数据
export const exportUserInfo = (params: User.ReqGetParams) => {
	return http.post<BlobPart>(`${PORT1}/user/export`, params, { responseType: 'blob' })
}
