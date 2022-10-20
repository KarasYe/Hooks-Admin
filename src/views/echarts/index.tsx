import WaterChart from './waterChart'
import RadarChart from './radarChart'
import NestedChart from './nestedChart'
import ColumnChart from './columnChart'

import './index.less'

const App: React.FC = () => {
	return (
		<div className="echarts">
			<div className="echarts-gird">
				<div className="chart">
					<WaterChart />
				</div>
				<div className="chart">
					<RadarChart />
				</div>
				<div className="chart">
					<NestedChart />
				</div>
				<div className="chart">
					<ColumnChart />
				</div>
			</div>
		</div>
	)
}

export default App
