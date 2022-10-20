import * as Icons from '@ant-design/icons'
import React from 'react'

// 动态渲染 Icon 图标
const customIcons: { [key: string]: any } = Icons
export default function antdIcon(name: string | undefined) {
	return name ? React.createElement(customIcons[name]) : React.createElement(customIcons['QuestionOutlined'])
}
