import { useState, useImperativeHandle } from 'react'
import { Form, Input, Row, Col, Select, Modal, message } from 'antd'
import { createUser, updateUser } from '@/api/modules/user'
import { Result, User, Role } from '@/api/interface/index'
import { UFProps, SysFormProps } from '@/views/sys/type'

const { Option } = Select

interface UserProps extends SysFormProps<UFProps> {
	roleList?: Role.ResList[]
}

const App = (props: UserProps) => {
	const [form] = Form.useForm()
	const [visible, setVisible] = useState(false)
	const [confirmLoading, setConfirmLoading] = useState(false)
	const [title, setTitle] = useState<string>('新增用户')
	const [id, setId] = useState<string | number>('')

	const handleOk = () => {
		setConfirmLoading(true)
		form
			.validateFields()
			.then(async (values: User.ResList) => {
				const api = id ? updateUser : createUser
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

	useImperativeHandle(props.innerRef, () => ({
		toggleModal
	}))

	const toggleModal = (status: boolean, user: User.ResList | undefined) => {
		setVisible(status)
		form.setFieldsValue(user)
		setTitle(user ? '修改用户' : '新增用户')
		setId(user ? user.id : '')
	}

	return (
		<>
			<Modal title={title} visible={visible} onOk={handleOk} confirmLoading={confirmLoading} onCancel={handleCancel}>
				<Form form={form} name="formData" className="form">
					<Row gutter={24}>
						<Col span={24}>
							<Form.Item
								name="name"
								label="姓名"
								rules={[
									{
										required: true,
										message: '请输入姓名'
									}
								]}
							>
								<Input placeholder="请输入姓名" />
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item
								name="email"
								label="邮箱"
								rules={[
									{
										required: true,
										message: '请输入正确的邮箱',
										pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
									}
								]}
							>
								<Input placeholder="请输入邮箱" />
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
								name="roleId"
								label="角色"
								rules={[
									{
										required: true,
										message: '请选择角色'
									}
								]}
							>
								<Select allowClear placeholder="请选择角色">
									{props.roleList?.map(role => {
										return (
											<Option key={role.id} value={role.id}>
												{role.name}
											</Option>
										)
									})}
								</Select>
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item
								name="phone"
								label="手机"
								rules={[
									{
										required: true,
										message: '请输入正确的手机号码',
										pattern: /^1(3|4|5|7|8|9)\d{9}$/
									}
								]}
							>
								<Input placeholder="请输入手机号码" />
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Modal>
		</>
	)
}

export default App
