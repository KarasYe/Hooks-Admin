import * as types from '@/redux/mutation-types'
// import { getAuthMenu } from '@/api/modules/login'
// import { Dispatch } from 'react'

// * updateCollapse
export const updateCollapse = (isCollapse: boolean) => ({
	type: types.UPDATE_COLLAPSE,
	isCollapse
})

// * setMenuList
export const setMenuList = (menuList: Menus.MenuOptions[]) => ({
	type: types.SET_MENU_LIST,
	menuList
})

// ? 下面方法仅为测试使用，不参与任何功能开发
// interface MenuProps {
// 	type: string
// 	menuList: Menus.MenuOptions[]
// }
// * redux-thunk
// export const getAuthMenuActionThunk = () => {
// 	return async (dispatch: Dispatch<MenuProps>) => {
// 		const res = await getAuthMenu()
// 		dispatch({
// 			type: types.SET_MENU_LIST,
// 			menuList: (res.data as Menus.MenuOptions[]) ?? []
// 		})
// 	}
// }

// * redux-promise《async/await》
// export const getAuthMenuAction = async (): Promise<MenuProps> => {
// 	const res = await getAuthMenu()
// 	return {
// 		type: types.SET_MENU_LIST,
// 		menuList: res.data ? res.data : []
// 	}
// }

// * redux-promise《.then/.catch》
// export const getAuthMenuActionPromise = (): Promise<MenuProps> => {
// 	return getAuthMenu().then(res => {
// 		return {
// 			type: types.SET_MENU_LIST,
// 			menuList: res.data ? res.data : []
// 		}
// 	})
// }
