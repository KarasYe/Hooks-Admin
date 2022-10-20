import { Typography } from 'antd'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import SwitchDark from '@/components/SwitchDark'
import loginLeft from '@/assets/images/login_left.png'
import loginRight from '@/assets/images/login_right.png'
// import logo from '@/assets/images/logo.png'
import SvgIcon from '@/components/svgIcon'
import './index.less'
import { useState } from 'react'

const Login = () => {
	const [pageStatus, setPageStatus] = useState<'login' | 'register'>('login')

	return (
		<div className="login-container">
			<SwitchDark />
			<div className="login-box">
				<div className="login-left">
					{pageStatus === 'login' ? <img src={loginLeft} alt="login" /> : <img src={loginRight} alt="register" />}
				</div>
				<div className="login-form">
					<div className="login-logo">
						{/* <img className="login-icon" src={logo} alt="logo" /> */}
						<SvgIcon name="xianxingmaozi" iconStyle={{ width: '50px', height: '50px' }} />
						<span className="logo-text">Green-Admin</span>
					</div>
					{pageStatus === 'login' ? <LoginForm /> : <RegisterForm />}
					<p className="tip">
						{pageStatus === 'login' ? (
							<span>
								尚无账号，可点此 <Typography.Link onClick={() => setPageStatus('register')}>注册</Typography.Link>
							</span>
						) : (
							<span>
								已有账号，可点此 <Typography.Link onClick={() => setPageStatus('login')}>登录</Typography.Link>
							</span>
						)}
					</p>
				</div>
			</div>
		</div>
	)
}

export default Login
