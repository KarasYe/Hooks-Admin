import { useState, useEffect, useImperativeHandle } from 'react'
import { Form, Input, Row, Col, Select, Drawer, Space, Button, message } from 'antd'
import { getPermissionList } from '@/api/modules/permission'
import { createRole, updateRole } from '@/api/modules/role'
import { Role, Permission, ResultData, ResPage, Result } from '@/api/interface/index'
import { RFProps, SysFormProps } from '@/views/sys/type'

const { Option } = Select

const App = (props: SysFormProps<RFProps>) => {
	const [form] = Form.useForm()
	const [visible, setVisible] = useState(false)
	const [confirmLoading, setConfirmLoading] = useState(false)
	const [title, setTitle] = useState<string>('新增权限')
	const [id, setId] = useState<string | number>('')

	const [permissionList, setPermissionList] = useState<Permission.ResList[]>([])

	const [params] = useState<Role.ReqGetParams>({
		status: '',
		page: 1,
		pageSize: 1000
	})

	const handleOk = () => {
		setConfirmLoading(true)
		form
			.validateFields()
			.then(async (values: Role.ResList) => {
				const api = id ? updateRole : createRole
				const newVal = id
					? {
							...values,
							id
					  }
					: values
				const res: Result = await api(newVal)
				message.success(res.msg)
				form.resetFields()
				setId('')
				props.finish()
				setVisible(false)
			})
			.catch(errorInfo => {
				console.log(errorInfo.errorFields[0].errors[0])
			})
		setTimeout(() => {
			setConfirmLoading(false)
		}, 2000)
	}

	const handleCancel = () => {
		form.resetFields()
		setVisible(false)
	}

	const toggleModal = (status: boolean, role: Role.ResList | undefined) => {
		setVisible(status)
		form.setFieldsValue({
			...role,
			permissions: role?.permissions.map(item => {
				return item.id.toString()
			})
		})
		setTitle(role ? '修改角色' : '新增角色')
		setId(role ? role.id : '')
	}

	const fetchData = async (params: Permission.ReqGetParams) => {
		const res: ResultData<ResPage<Permission.ResList>> = await getPermissionList(params)
		const list: Permission.ResList[] = res.data?.list.map(e => {
			return {
				...e,
				id: e.id.toString()
			}
		})
		setPermissionList(list)
	}

	const children: React.ReactNode[] = permissionList.map(item => {
		return (
			<Option key={item.id} value={item.id}>
				{item.name}
			</Option>
		)
	})

	useImperativeHandle(props.innerRef, () => ({
		toggleModal
	}))

	useEffect(() => {
		fetchData(params)
	}, [params])

	return (
		<>
			<Drawer
				title={title}
				visible={visible}
				width={720}
				onClose={handleCancel}
				extra={
					<Space>
						<Button onClick={handleCancel}>取消</Button>
						<Button onClick={handleOk} loading={confirmLoading} type="primary">
							确认
						</Button>
					</Space>
				}
			>
				<Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} name="formData" className="form">
					<Row gutter={24}>
						<Col span={24}>
							<Form.Item
								name="name"
								label="角色"
								rules={[
									{
										required: true,
										message: '请输入角色'
									}
								]}
							>
								<Input placeholder="请输入角色" />
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item
								name="status"
								label="状态"
								rules={[
									{
										required: true,
										message: '请选择状态'
									}
								]}
							>
								<Select allowClear placeholder="请选择状态">
									<Option value="0">弃用</Option>
									<Option value="1">启用</Option>
								</Select>
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item
								name="permissions"
								label="权限组"
								rules={[
									{
										required: true,
										message: '请选择权限组'
									}
								]}
							>
								<Select mode="multiple" allowClear style={{ width: '100%' }} placeholder="请选择权限组">
									{children}
								</Select>
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Drawer>
		</>
	)
}

export default App
