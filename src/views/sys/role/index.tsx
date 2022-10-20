import { Space, Table, message, Typography, Popconfirm, Card, Tag, Tooltip } from 'antd'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import React, { useState, useEffect, useRef } from 'react'
import { Result, ResultData, ResPage, Role } from '@/api/interface/index'
import { getRoleList, deleteRole } from '@/api/modules/role'
import RoleSearch from './components/RoleSearch'
import RoleFormDrawer from './components/RoleFormDrawer'
import { RFProps } from '@/views/sys/type'

// import './index.less'

const App: React.FC = () => {
	const [data, setData] = useState<Role.ResList[]>([])
	const [params, setParams] = useState<Role.ReqGetParams>({
		status: '',
		page: 1,
		pageSize: 10
	})
	const [total, setTotal] = useState<number>(0)
	const [loading, setLoading] = useState<boolean>(false)

	const roleFormRef = useRef<RFProps>(null)

	const columns: ColumnsType<Role.ResList> = [
		{
			title: '角色',
			dataIndex: 'name',
			render: text => <a>{text}</a>
		},
		{
			title: (
				<Typography.Link>
					<Tooltip placement="top" title="灰色标签代表禁用中">
						权限组
					</Tooltip>
				</Typography.Link>
			),
			dataIndex: 'permissions',
			render: (_, { permissions }) => (
				<>
					{permissions.map(permission => {
						const color = permission.status === '1' ? 'processing' : 'default'
						const name = permission.status === '1' ? permission.name : permission.name + '(弃用)'
						return (
							<Tag color={color} key={permission.id}>
								{name}
							</Tag>
						)
					})}
				</>
			)
		},
		{
			title: '状态',
			dataIndex: 'status',
			render: (_, { status }) => (
				<Space size="middle">{status === '1' ? <Tag color="success">启用</Tag> : <Tag color="error">弃用</Tag>}</Space>
			)
		},
		{
			title: '操作',
			key: 'action',
			width: 150,
			render: record => (
				<Space size="middle">
					<Typography.Link onClick={() => handleAdd(record)}>修改</Typography.Link>
					<Popconfirm
						title={`确定要删除角色《${record.name}》?`}
						onConfirm={() => handleDelete(record)}
						okText="确定"
						cancelText="取消"
					>
						<a href="#">删除</a>
					</Popconfirm>
				</Space>
			)
		}
	]

	const fetchData = async (params: Role.ReqGetParams) => {
		setLoading(true)
		const res: ResultData<ResPage<Role.ResList>> = await getRoleList(params)
		const list: Role.ResList[] = res.data?.list
		setData(list)
		setTotal(res.data.total)
		setTimeout(() => setLoading(false), 500)
	}

	const handleTableChange = (newPagination: TablePaginationConfig) => {
		setParams({
			...params,
			page: newPagination.current
		})
	}

	const handleSearch = (searchParams?: Role.ReqGetParams) => {
		setParams({
			...params,
			page: 1,
			pageSize: 10,
			...searchParams
		})
	}

	const handleAdd = (role: Role.ResList | undefined) => {
		roleFormRef.current!.toggleModal(true, role)
		console.log(role)
	}

	const handleDelete = async (record: Role.ResList) => {
		const res: Result = await deleteRole({
			id: record.id
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
		<Card className="sys-role-curd">
			<RoleSearch search={handleSearch} add={() => handleAdd(undefined)} />
			<RoleFormDrawer innerRef={roleFormRef} finish={handleSearch} />
			<Table
				bordered
				rowKey="id"
				columns={columns}
				pagination={{ pageSize: params.pageSize, current: params.page, total: total }}
				dataSource={data}
				loading={loading}
				onChange={handleTableChange}
			/>
		</Card>
	)
}

export default App
