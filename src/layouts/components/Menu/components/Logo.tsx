// import logo from '@/assets/images/logo.png'
import { connect } from 'react-redux'
import SvgIcon from '@/components/svgIcon'

const Logo = (props: any) => {
	const { isCollapse } = props
	return (
		<div className="logo-box">
			{/* <img src={logo} alt="logo" className="logo-img" /> */}
			<SvgIcon name="xianxingmaozi" iconStyle={{ width: '40px', height: '40px' }} />
			{!isCollapse ? <h2 className="logo-text">Green Admin</h2> : null}
		</div>
	)
}

const mapStateToProps = (state: any) => state.menu
export default connect(mapStateToProps)(Logo)
