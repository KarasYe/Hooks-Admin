import { Space, Table, message, Typography, Popconfirm, Card, Tag } from 'antd'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import React, { useState, useEffect, useRef } from 'react'
import { Result, ResultData, ResPage, Permission } from '@/api/interface/index'
import { getPermissionList, deletePermission } from '@/api/modules/permission'
import PermSearch from './components/PermSearch'
import PermFormModal from './components/PermFormModal'
import { PFProps } from '@/views/sys/type'

// import './index.less'

const App: React.FC = () => {
	const [data, setData] = useState<Permission.ResList[]>([])
	const [params, setParams] = useState<Permission.ReqGetParams>({
		status: '',
		page: 1,
		pageSize: 10
	})
	const [total, setTotal] = useState<number>(0)
	const [loading, setLoading] = useState<boolean>(false)

	const PermFormRef = useRef<PFProps>(null)

	const columns: ColumnsType<Permission.ResList> = [
		{
			title: '权限',
			dataIndex: 'name',
			render: text => <a>{text}</a>
		},
		{
			title: '权限编码',
			dataIndex: 'code'
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
						title={`确定要删除权限《${record.name}》?`}
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

	const fetchData = async (params: Permission.ReqGetParams) => {
		setLoading(true)
		const res: ResultData<ResPage<Permission.ResList>> = await getPermissionList(params)
		const list: Permission.ResList[] = res.data?.list
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

	const handleSearch = (searchParams?: Permission.ReqGetParams) => {
		setParams({
			...params,
			page: 1,
			pageSize: 10,
			...searchParams
		})
	}

	const handleAdd = (permission: Permission.ResList | undefined) => {
		PermFormRef.current!.toggleModal(true, permission)
		console.log(permission)
	}

	const handleDelete = async (record: Permission.ResList) => {
		const res: Result = await deletePermission({
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
		<Card className="sys-permission-curd">
			<PermSearch search={handleSearch} add={() => handleAdd(undefined)} />
			<PermFormModal innerRef={PermFormRef} finish={handleSearch} />
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
