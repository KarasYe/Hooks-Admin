import { Form, Input, Row, Col, Button } from 'antd'
import { Menu } from '@/api/interface/index'

interface ASProps {
	search: (params: Menu.ReqGetParams) => void
	add: () => void
}

const App = (props: ASProps) => {
	const [form] = Form.useForm()

	const onFinish = (params: Menu.ReqGetParams) => {
		props.search(params)
	}

	return (
		<Form form={form} name="advanced_search" className="ant-advanced-search-form" onFinish={onFinish}>
			<Row gutter={24}>
				<Col span={6}>
					<Form.Item
						name="title"
						label="菜单标题"
						rules={[
							{
								required: false,
								message: '请输入菜单标题'
							}
						]}
					>
						<Input placeholder="请输入菜单标题" />
					</Form.Item>
				</Col>
				<Col span={6} offset={12} style={{ textAlign: 'right' }}>
					<Button type="primary" htmlType="submit">
						查询
					</Button>
					<Button
						style={{ margin: '0 8px' }}
						onClick={() => {
							form.resetFields()
						}}
					>
						清空
					</Button>
					<Button type="primary" onClick={props.add}>
						新增
					</Button>
				</Col>
			</Row>
		</Form>
	)
}

export default App
