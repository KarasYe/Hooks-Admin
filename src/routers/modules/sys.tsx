import React from 'react'
import lazyLoad from '@/routers/utils/lazyLoad'
import { LayoutIndex } from '@/routers/constant'
import { RouteObject } from '@/routers/interface'

// dashboard 模块
const dashboardRouter: Array<RouteObject> = [
	{
		path: '/sys',
		element: <LayoutIndex />,
		meta: {
			title: '系统设置'
		},
		children: [
			{
				path: '/sys/user',
				element: lazyLoad(React.lazy(() => import('@/views/sys/user/index'))),
				meta: {
					requiresAuth: true,
					title: '用户管理',
					key: 'userManage'
				}
			},
			{
				path: '/sys/role',
				element: lazyLoad(React.lazy(() => import('@/views/sys/role/index'))),
				meta: {
					requiresAuth: true,
					title: '角色管理',
					key: 'roleManage'
				}
			},
			{
				path: '/sys/permission',
				element: lazyLoad(React.lazy(() => import('@/views/sys/permission/index'))),
				meta: {
					requiresAuth: true,
					title: '权限管理',
					key: 'permissionManage'
				}
			},
			{
				path: '/sys/menu',
				element: lazyLoad(React.lazy(() => import('@/views/sys/menu/index'))),
				meta: {
					requiresAuth: true,
					title: '菜单管理',
					key: 'menuManage'
				}
			}
		]
	}
]

export default dashboardRouter
