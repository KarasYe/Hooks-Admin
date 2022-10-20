// import md5 from "js-md5";
import { useState } from 'react'
import { Button, Form, Input, message } from 'antd'
import { RegisterForm } from '@/api/interface'
import { register } from '@/api/modules/login'
import { useTranslation } from 'react-i18next'
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons'

const App = () => {
	const { t } = useTranslation()
	const [form] = Form.useForm()
	const [loading, setLoading] = useState<boolean>(false)

	// 登录
	const onFinish = async (registerForm: RegisterForm.ReqProps) => {
		try {
			setLoading(true)
			const { msg } = await register(registerForm)
			message.success(msg)
		} finally {
			setLoading(false)
		}
	}

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo)
	}

	return (
		<Form
			form={form}
			name="basic"
			labelCol={{ span: 5 }}
			initialValues={{ remember: true }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			size="large"
			autoComplete="off"
		>
			<Form.Item name="name" rules={[{ required: true, message: '请输入用户名' }]}>
				<Input placeholder="请输入用户名" prefix={<UserOutlined />} />
			</Form.Item>
			<Form.Item
				name="email"
				rules={[
					{
						required: true,
						message: '请输入正确的邮箱',
						pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
					}
				]}
			>
				<Input placeholder="请输入登录邮箱" prefix={<MailOutlined />} />
			</Form.Item>
			<Form.Item
				name="phone"
				rules={[
					{
						required: true,
						message: '请输入正确的手机号码',
						pattern: /^1(3|4|5|7|8|9)\d{9}$/
					}
				]}
			>
				<Input placeholder="请输入手机号码" prefix={<PhoneOutlined />} />
			</Form.Item>
			<Form.Item
				hasFeedback
				name="password"
				rules={[
					{
						required: true,
						message: '6~16位(不含特殊字符)大小写字母和数字的组合',
						pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$/
					}
				]}
			>
				<Input.Password placeholder="请输入密码" prefix={<LockOutlined />} />
			</Form.Item>
			<Form.Item
				hasFeedback
				name="passwordConfirm"
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
				<Input.Password placeholder="请输入确认密码" prefix={<LockOutlined />} />
			</Form.Item>
			<Form.Item className="login-btn">
				<Button type="primary" htmlType="submit" loading={loading}>
					{t('login.register')}
				</Button>
				<Button
					onClick={() => {
						form.resetFields()
					}}
				>
					{t('login.reset')}
				</Button>
			</Form.Item>
		</Form>
	)
}

export default App
