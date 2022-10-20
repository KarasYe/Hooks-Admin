// import md5 from "js-md5";
import { useState } from 'react'
import { Button, Form, Input, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Login } from '@/api/interface'
import { login } from '@/api/modules/login'
import { HOME_URL } from '@/config/config'
import { connect } from 'react-redux'
import { setToken } from '@/redux/modules/global/action'
import { useTranslation } from 'react-i18next'
import { setTabsList } from '@/redux/modules/tabs/action'
import { MailOutlined, LockOutlined } from '@ant-design/icons'

const LoginForm = (props: any) => {
	const { t } = useTranslation()
	const { setToken, setTabsList } = props
	const navigate = useNavigate()
	const [form] = Form.useForm()
	const [loading, setLoading] = useState<boolean>(false)

	// 登录
	const onFinish = async (loginForm: Login.ReqLoginForm) => {
		try {
			setLoading(true)
			// loginForm.password = md5(loginForm.password);
			const { data } = await login(loginForm)
			setToken(data?.token)
			setTabsList([])
			message.success('登录成功！')
			navigate(HOME_URL)
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
			<Form.Item name="email" rules={[{ required: true, message: '请输入登录邮箱' }]}>
				<Input placeholder="请输入登录邮箱" prefix={<MailOutlined />} />
			</Form.Item>
			<Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
				<Input.Password autoComplete="new-password" placeholder="请输入密码" prefix={<LockOutlined />} />
			</Form.Item>
			<Form.Item className="login-btn">
				<Button type="primary" htmlType="submit" loading={loading}>
					{t('login.confirm')}
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

const mapDispatchToProps = { setToken, setTabsList }
export default connect(null, mapDispatchToProps)(LoginForm)
