import RegisterForm from '@/views/login/components/RegisterForm'

// * 请求响应参数(不包含data)
export interface Result {
	code: string
	msg: string
}

// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
	data: T
}

// * 分页响应参数
export interface ResPage<T> {
	list: T[]
	// page?: number;
	// pageSize?: number;
	total: number
}

// * 分页请求参数
export interface ReqPage {
	page?: number | undefined
	pageSize?: number
}

// * 登录
export namespace Login {
	export interface ReqLoginForm {
		email: string
		password: string
	}
	export interface ResLogin {
		token: string
	}
	export interface ResAuthButtons {
		[propName: string]: any
	}
}

// * 登录
export namespace RegisterForm {
	export interface ReqProps {
		name: string
		email: string
		phone: string
		password: string
		passwordConfirm: string
	}
}

// * 用户管理
export namespace User {
	export interface ReqGetParams extends ReqPage {
		name?: string
		email?: string
		phone?: string
		status?: string
	}
	export interface ResList {
		id: number | string
		name: string
		email: string
		phone: string
		status: string
		roleId: number
	}
	export interface Password {
		password: string
		passwordConfirm: string
	}
}

// * role管理
export namespace Role {
	export interface ReqGetParams extends ReqPage {
		name?: string
		status?: string
	}
	export interface ResList {
		id: number | string
		name: string
		permissions: Permission.ResList[]
		status: string
	}
}

// * permission管理
export namespace Permission {
	export interface ReqGetParams extends ReqPage {
		name?: string
		code?: string
		status?: string
	}
	export interface ResList {
		id: number | string
		name: string
		code: string
		menus: Menu.ResList[]
		status: string
	}
}

// * menu管理
export namespace Menu {
	export interface ReqGetParams extends ReqPage {
		title?: string
	}
	export interface ResList {
		id: number | string
		title: string
		icon: string
		path: string
		isLink: string
		index: number
		parentId: number | string
	}
}
