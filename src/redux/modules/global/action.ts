import * as types from '@/redux/mutation-types'
import { ThemeConfigProp } from '@/redux/interface/index'
import { User } from '@/api/interface/index'
// import { getUserInfo } from '@/api/modules/user'
// import { AnyAction } from 'redux'

// * setToken
export const setToken = (token: string) => ({
	type: types.SET_TOKEN,
	token
})

// interface UserInfoProps extends AnyAction {
// 	userInfo: User.ResList
// }

// * setUserInfo
// export const setUserInfo = async (): Promise<UserInfoProps> => {
// 	const res: ResultData<User.ResList> = await getUserInfo()
// 	const userInfo: User.ResList = res.data
// 	console.log(userInfo)
// 	return {
// 		type: types.SET_USER_INFO,
// 		userInfo
// 	}
// }
export const setUserInfo = (userInfo: User.ResList) => ({
	type: types.SET_USER_INFO,
	userInfo
})

// * setAssemblySize
export const setAssemblySize = (assemblySize: string) => ({
	type: types.SET_ASSEMBLY_SIZE,
	assemblySize
})

// * setLanguage
export const setLanguage = (language: string) => ({
	type: types.SET_LANGUAGE,
	language
})

// * setThemeConfig
export const setThemeConfig = (themeConfig: ThemeConfigProp) => ({
	type: types.SET_THEME_CONFIG,
	themeConfig
})
