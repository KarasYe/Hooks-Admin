import { useState, useImperativeHandle, Ref } from 'react'
import { Modal, message, Form, Row, Col, Input } from 'antd'
import { User, Result } from '@/api/interface/index'
import { resetPassWord } from '@/api/modules/user'
import { connect } from 'react-redux'
import { setToken } from '@/redux/modules/global/action'
import { useNavigate } from 'react-router-dom'

interface Props {
	innerRef: Ref<{ showModal: (params: any) => void }>
}

const PasswordModal = (props: Props) => {
	const [form] = Form.useForm()
	const navigate = useNavigate()
	const [isModalVisible, setIsModalVisible] = useState(false)

	useImperativeHandle(props.innerRef, () => ({
		showModal
	}))

	const showModal = (params: { name: number }) => {
		console.log(params)
		setIsModalVisible(true)
	}

	const handleOk = () => {
		form
			.validateFields()
			.then(async (values: User.Password) => {
				const res: Result = await resetPassWord(values)
				message.success(res.msg)
				form.resetFields()
				setIsModalVisible(false)
				setToken('')
				navigate('/login')
			})
			.catch(errorInfo => {
				console.log(errorInfo)
				// message.error(errorInfo.msg)
			})
	}

	const handleCancel = () => {
		setIsModalVisible(false)
	}
	return (
		<Modal title="修改密码" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} destroyOnClose={true}>
			<Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 18 }} name="formData" className="form">
				<Row gutter={24}>
					<Col span={24}>
						<Form.Item
							hasFeedback
							name="password"
							label="密码"
							rules={[
								{
									required: true,
									message: '6~16位(不含特殊字符)大小写字母和数字的组合',
									pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$/
								}
							]}
						>
							<Input.Password placeholder="请输入密码" />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item
							hasFeedback
							name="passwordConfirm"
							label="确认密码"
							rules={[
								{
									required: true,
									message: '请输入确认密码'
								},
								({ getFieldValue }) => ({
									validator(_, value) {
										if (!value || getFieldValue('password') === value) {
											return Promise.resolve()
										}
										return Promise.reject(new Error('前后密码不一致!'))
									}
								})
							]}
						>
							<Input.Password placeholder="请输入确认密码" />
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Modal>
	)
}

export default connect(null, { setToken })(PasswordModal)
