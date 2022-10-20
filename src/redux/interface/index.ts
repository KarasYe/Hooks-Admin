import type { SizeType } from 'antd/lib/config-provider/SizeContext'
import { User } from '@/api/interface/index'

/* themeConfigProp */
export interface ThemeConfigProp {
	primary: string
	isDark: boolean
	weakOrGray: string
	breadcrumb: boolean
	tabs: boolean
	footer: boolean
}

/* GlobalState */
export interface GlobalState {
	token: string
	userInfo: User.ResList
	assemblySize: SizeType
	language: string
	themeConfig: ThemeConfigProp
}

/* MenuState */
export interface MenuState {
	isCollapse: boolean
	menuList: Menus.MenuOptions[]
}

/* TabsState */
export interface TabsState {
	tabsActive: string
	tabsList: Menus.MenuOptions[]
}

/* BreadcrumbState */
export interface BreadcrumbState {
	breadcrumbList: {
		[propName: string]: any
	}
}

/* AuthState */
export interface AuthState {
	authButtons: {
		[propName: string]: any
	}
	authRouter: string[]
}
