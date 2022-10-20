import { Form, Input, Row, Col, Select, Button } from 'antd'
import { User } from '@/api/interface/index'

const { Option } = Select

interface ASProps {
	search: (params: User.ReqGetParams) => void
	add: () => void
}

const App = (props: ASProps) => {
	const [form] = Form.useForm()

	const onFinish = (params: User.ReqGetParams) => {
		props.search(params)
	}

	return (
		<Form form={form} name="advanced_search" className="ant-advanced-search-form" onFinish={onFinish}>
			<Row gutter={24}>
				<Col span={6}>
					<Form.Item
						name="name"
						label="姓名"
						rules={[
							{
								required: false,
								message: '请输入姓名'
							}
						]}
					>
						<Input placeholder="请输入邮箱" />
					</Form.Item>
				</Col>
				<Col span={6}>
					<Form.Item
						name="email"
						label="邮箱"
						rules={[
							{
								required: false,
								message: '请输入邮箱'
							}
						]}
					>
						<Input placeholder="请输入邮箱" />
					</Form.Item>
				</Col>
				<Col span={6}>
					<Form.Item
						name="status"
						label="状态"
						rules={[
							{
								required: false,
								message: '请选择状态'
							}
						]}
					>
						<Select allowClear placeholder="请选择状态">
							<Option value="0">弃用</Option>
							<Option value="1">启用</Option>
						</Select>
					</Form.Item>
				</Col>
				<Col span={6} style={{ textAlign: 'right' }}>
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
