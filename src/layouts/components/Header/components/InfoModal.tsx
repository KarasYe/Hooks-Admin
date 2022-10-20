import { useState, useImperativeHandle, Ref } from 'react'
import { Modal, message, Form, Row, Col, Input } from 'antd'
import { User, Result } from '@/api/interface/index'
import { updateUserInfo } from '@/api/modules/user'

interface Props {
	innerRef: Ref<{ showModal: (params: any) => void } | undefined>
	update: () => void
}

const InfoModal = (props: Props) => {
	const [form] = Form.useForm()

	const [modalVisible, setModalVisible] = useState(false)

	useImperativeHandle(props.innerRef, () => ({
		showModal
	}))

	const showModal = (user: Partial<User.ResList>) => {
		setModalVisible(true)
		form.setFieldsValue(user)
	}

	const handleOk = () => {
		form
			.validateFields()
			.then(async (values: Partial<User.ResList>) => {
				const res: Result = await updateUserInfo(values)
				message.success(res.msg)
				form.resetFields()
				setModalVisible(false)
				props.update()
			})
			.catch(errorInfo => {
				console.log(errorInfo.errorFields[0].errors[0])
			})
	}

	const handleCancel = () => {
		setModalVisible(false)
	}
	return (
		<Modal title="个人信息" visible={modalVisible} onOk={handleOk} onCancel={handleCancel} destroyOnClose={true}>
			<Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} name="formData" className="form">
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
							<Input placeholder="请输入邮箱" />
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
							<Input disabled placeholder="请输入邮箱" />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item
							name="phone"
							label="手机"
							rules={[
								{
									required: true,
									message: '请输入正确的手机',
									pattern: /^1(3|4|5|7|8|9)\d{9}$/
								}
							]}
						>
							<Input placeholder="请输入手机" />
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Modal>
	)
}
export default InfoModal
