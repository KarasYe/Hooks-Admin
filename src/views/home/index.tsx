import { Card } from 'antd'
import welcome from '@/assets/images/welcome01.png'
import './index.less'

const Home = () => {
	return (
		<Card className="home">
			<img src={welcome} alt="welcome" />
		</Card>
	)
}

export default Home
