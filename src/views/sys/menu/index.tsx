import { Space, Table, message, Typography, Popconfirm, Card, Tooltip, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import React, { useState, useEffect, useRef } from 'react'
import { Result, ResultData, ResPage, Menu } from '@/api/interface/index'
import { getMenuList, deleteMenu } from '@/api/modules/menu'
import MenuFormModal from './components/MenuFormModal'
import { MFProps, MenuTree, NewMenu } from '@/views/sys/type'
import antdIcon from '@/components/AntdIcon'
import { addMenuTree } from '@/utils/util'
// import './index.less'

const App: React.FC = () => {
	const [data, setData] = useState<MenuTree[]>([])
	const [params, setParams] = useState<Menu.ReqGetParams>({
		page: 1,
		pageSize: 1000
	})
	const [loading, setLoading] = useState<boolean>(false)

	const MenuFormRef = useRef<MFProps>(null)

	const columns: ColumnsType<Menu.ResList> = [
		{
			title: '菜单标题',
			dataIndex: 'title',
			render: (_, { title, icon }) => (
				<Typography.Link>
					{antdIcon(icon)} | {title}
				</Typography.Link>
			)
		},
		{
			title: (
				<Typography.Link>
					<Tooltip placement="top" title="只对相同维度菜单排列生效">
						菜单序号
					</Tooltip>
				</Typography.Link>
			),
			dataIndex: 'index'
		},
		{
			title: '菜单路径',
			dataIndex: 'path'
		},
		{
			title: '外链',
			dataIndex: 'isLink',
			render: (_, { isLink }) => (
				<Space size="middle">{isLink === '1' ? <Tag color="warning">是</Tag> : <Tag color="success">否</Tag>}</Space>
			)
		},
		{
			title: '操作',
			key: 'action',
			width: 150,
			render: record => (
				<Space size="middle">
					<Typography.Link onClick={() => handleAddChild(record)}>新增</Typography.Link>
					<Typography.Link disabled={!record.id} onClick={() => handleUpdate(record)}>
						修改
					</Typography.Link>
					<Popconfirm
						title={`确定要删除菜单《${record.title}》及其子菜单?`}
						onConfirm={() => handleDelete(record)}
						okText="确定"
						cancelText="取消"
					>
						<Typography.Link disabled={!record.id}>删除</Typography.Link>
					</Popconfirm>
				</Space>
			)
		}
	]

	const fetchData = async (params: Menu.ReqGetParams) => {
		setLoading(true)
		const res: ResultData<ResPage<Menu.ResList>> = await getMenuList(params)
		const list: Menu.ResList[] = res.data?.list
		setData([
			{
				id: 0,
				title: 'root',
				icon: 'AntDesignOutlined',
				path: '',
				parentId: 'root',
				index: 0,
				isLink: '0',
				children: addMenuTree(0, list)
			}
		])
		setTimeout(() => setLoading(false), 500)
	}

	const handleFetch = () => {
		setParams({
			...params
		})
	}

	const handleUpdate = (menu?: MenuTree) => {
		MenuFormRef.current!.toggleModal(true, menu)
	}

	const handleAddChild = (menu: MenuTree) => {
		const newMenu: NewMenu = {
			...menu,
			index: menu.children ? menu.children.length : 0,
			title: menu.title + '子菜单',
			path: menu.path + '/childrenPath',
			parentId: menu?.id,
			newData: true
		}
		MenuFormRef.current!.toggleModal(true, newMenu)
	}

	const handleDelete = async (menus: MenuTree) => {
		const ids: Array<string | number> = []
		const setIds = (menus: MenuTree[]) => {
			menus.forEach((menu: MenuTree) => {
				ids.push(menu.id)
				menu.children?.length && setIds(menu.children)
			})
		}
		menus.children?.length && setIds(menus.children)
		ids.push(menus.id)
		const res: Result = await deleteMenu({
			ids: ids.join(',')
		})
		message.success(res.msg)
		setParams({
			...params
		})
	}

	useEffect(() => {
		fetchData(params)
	}, [params])

	return (
		<Card className="sys-menu-curd">
			<MenuFormModal innerRef={MenuFormRef} finish={handleFetch} menuTree={data} />
			<Table
				bordered
				defaultExpandAllRows={true}
				defaultExpandedRowKeys={[0]}
				rowKey="id"
				columns={columns}
				dataSource={data}
				loading={loading}
			/>
		</Card>
	)
}

export default App
