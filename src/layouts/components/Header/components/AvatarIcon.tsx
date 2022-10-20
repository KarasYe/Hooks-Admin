import { useRef, useEffect, useState } from 'react'
import { Avatar, Modal, Menu, Dropdown, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { HOME_URL } from '@/config/config'
import { connect } from 'react-redux'
import { setToken, setUserInfo } from '@/redux/modules/global/action'
import PasswordModal from './PasswordModal'
import InfoModal from './InfoModal'
// import avatar from '@/assets/images/avatar.png'
import SvgIcon from '@/components/svgIcon'
import { User, ResultData } from '@/api/interface/index'
import { getUserInfo } from '@/api/modules/user'

const AvatarIcon = (props: any) => {
	const { setToken, setUserInfo } = props
	const [user, setUser] = useState<Partial<User.ResList>>({
		name: 'Green Hat'
	})

	const [updateUser, setUpdateUser] = useState<boolean>(true)

	const navigate = useNavigate()

	interface ModalProps {
		showModal: (params: Partial<User.ResList>) => void
	}
	const passRef = useRef<ModalProps>(null)
	const infoRef = useRef<ModalProps>(null)

	// 退出登录
	const logout = () => {
		Modal.confirm({
			title: '温馨提示 🧡',
			icon: <ExclamationCircleOutlined />,
			content: '是否确认退出登录？',
			okText: '确认',
			cancelText: '取消',
			onOk: () => {
				setToken('')
				message.success('退出登录成功！')
				navigate('/login')
			}
		})
	}

	const getUser = async () => {
		const res: ResultData<User.ResList> = await getUserInfo()
		const userInfo: User.ResList = res.data
		setUser(userInfo)
		setUserInfo(userInfo)
		setUpdateUser(false)
	}

	useEffect(() => {
		updateUser && getUser()
	}, [updateUser])

	// Dropdown Menu
	const menu = (
		<Menu
			items={[
				{
					key: '1',
					label: <span className="dropdown-item">首页</span>,
					onClick: () => navigate(HOME_URL)
				},
				{
					key: '2',
					label: <span className="dropdown-item">个人信息</span>,
					onClick: () => infoRef.current!.showModal(user)
				},
				{
					key: '3',
					label: <span className="dropdown-item">修改密码</span>,
					onClick: () => passRef.current!.showModal(user)
				},
				{
					type: 'divider'
				},
				{
					key: '4',
					label: <span className="dropdown-item">退出登录</span>,
					onClick: logout
				}
			]}
		></Menu>
	)
	return (
		<>
			<span className="username">{user.name}</span>
			<Dropdown overlay={menu} placement="bottom" arrow trigger={['click']}>
				<Avatar size="large" src={<SvgIcon name="xianxingmaozi" iconStyle={{ width: '40px', height: '40px' }} />} />
			</Dropdown>
			<InfoModal innerRef={infoRef} update={() => setUpdateUser(true)}></InfoModal>
			<PasswordModal innerRef={passRef}></PasswordModal>
		</>
	)
}

const mapDispatchToProps = { setToken, setUserInfo }
export default connect(null, mapDispatchToProps)(AvatarIcon)
