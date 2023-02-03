import { Space, Table, message, Typography, Popconfirm, Card, Tag, Tooltip } from 'antd'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import React, { useState, useEffect, useRef } from 'react'
import { Result, ResultData, ResPage, User, Role } from '@/api/interface/index'
import { getUserList, deleteUser } from '@/api/modules/user'
import { getRoleList } from '@/api/modules/role'
import UserFormModal from './components/UserFormModal'
import UserSearch from './components/UserSearch'
import { UFProps } from '../type'
import './index.less'

const App: React.FC = () => {
	const [data, setData] = useState<User.ResList[]>([])
	const [params, setParams] = useState<User.ReqGetParams>({
		status: '',
		page: 1,
		pageSize: 10
	})
	const [total, setTotal] = useState<number>(0)
	const [loading, setLoading] = useState<boolean>(false)

	const [roleList, setRoleList] = useState<Role.ResList[]>([])

	const [paramsRole] = useState<Role.ReqGetParams>({
		status: '',
		page: 1,
		pageSize: 1000
	})

	const userFormRef = useRef<UFProps>(null)

	const columns: ColumnsType<User.ResList> = [
		{
			title: '姓名',
			dataIndex: 'name',
			render: text => <a>{text}</a>
		},
		{
			title: '邮箱',
			dataIndex: 'email'
		},
		{
			title: (
				<Typography.Link>
					<Tooltip placement="top" title="灰色标签代表禁用中">
						角色
					</Tooltip>
				</Typography.Link>
			),
			dataIndex: 'roleId',
			render: (_, { roleId }) => {
				const role = roleList.find(role => role.id === roleId)
				return <Tag color={role?.status === '1' ? 'processing' : 'default'}>{role?.name}</Tag>
			}
		},
		{
			title: '手机',
			dataIndex: 'phone'
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
					<Typography.Link disabled onClick={() => handleAdd(record)}>
						修改
					</Typography.Link>
					<Popconfirm
						title={`确定要删除用户《${record.name}》?`}
						onConfirm={() => handleDelete(record)}
						okText="确定"
						cancelText="取消"
					>
						<Typography.Link disabled>删除</Typography.Link>
					</Popconfirm>
				</Space>
			)
		}
	]

	const fetchData = async (params: User.ReqGetParams) => {
		setLoading(true)
		const res: ResultData<ResPage<User.ResList>> = await getUserList(params)
		const list: User.ResList[] = res.data?.list
		setData(list)
		setTotal(res.data.total)
		setTimeout(() => setLoading(false), 500)
	}

	const fetchRoleData = async (params: Role.ReqGetParams) => {
		const res: ResultData<ResPage<Role.ResList>> = await getRoleList(params)
		const list: Role.ResList[] = res.data?.list
		setRoleList(list)
	}

	const handleTableChange = (newPagination: TablePaginationConfig) => {
		setParams({
			...params,
			page: newPagination.current
		})
	}

	const handleSearch = (searchParams?: User.ReqGetParams) => {
		setParams({
			...params,
			page: 1,
			pageSize: 10,
			...searchParams
		})
	}

	const handleAdd = (user: User.ResList | undefined) => {
		userFormRef.current!.toggleModal(true, user)
	}

	const handleDelete = async (record: User.ResList) => {
		const res: Result = await deleteUser({
			id: record.id
		})
		message.success(res.msg)
		setParams({
			...params
		})
	}

	useEffect(() => {
		fetchRoleData(paramsRole)
		fetchData(params)
	}, [params])

	return (
		<Card className="sys-user-curd">
			<UserSearch search={handleSearch} add={() => handleAdd(undefined)} />
			<UserFormModal innerRef={userFormRef} finish={handleSearch} roleList={roleList} />
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
