import React from 'react'
import lazyLoad from '@/routers/utils/lazyLoad'
import { LayoutIndex } from '@/routers/constant'
import { RouteObject } from '@/routers/interface'

// dashboard 模块
const dashboardRouter: Array<RouteObject> = [
	{
		path: '/workbenck',
		element: <LayoutIndex />,
		meta: {
			title: '工作区'
		},
		children: [
			{
				path: '/workbenck/dashboard',
				element: lazyLoad(React.lazy(() => import('@/views/dashboard/dataVisualize/index'))),
				meta: {
					requiresAuth: true,
					title: '用户面板',
					key: 'dashboard'
				}
			}
		]
	}
]

export default dashboardRouter
