import React, { useState, useImperativeHandle } from 'react'
import { Form, Input, InputNumber, Row, Col, TreeSelect, Modal, Select, message, Radio } from 'antd'
import { createMenu, updateMenu } from '@/api/modules/menu'
import { Result, Menu } from '@/api/interface/index'
import { MenuTree, MFProps, SysFormProps, NewMenu } from '@/views/sys/type'
import * as Icons from '@ant-design/icons'

interface MenuProps extends SysFormProps<MFProps> {
	menuTree?: MenuTree[]
}

const { Option } = Select

const customIcons: { [key: string]: any } = Icons

const iconOption = Object.keys(Icons).map(key => {
	return (
		<Option key={key} value={key}>
			{React.createElement(customIcons[key])} | {key}
		</Option>
	)
})

const App = (props: MenuProps) => {
	const [form] = Form.useForm()
	const [visible, setVisible] = useState(false)
	const [confirmLoading, setConfirmLoading] = useState(false)
	const [title, setTitle] = useState<string>('新增权限')
	const [id, setId] = useState<string | number>('')

	const handleOk = () => {
		setConfirmLoading(true)
		form
			.validateFields()
			.then(async (values: Menu.ResList) => {
				const api = id ? updateMenu : createMenu
				const newVal = id
					? {
							...values,
							id
					  }
					: values
				const res: Result = await api(newVal)
				message.success(res.msg)
				form.resetFields()
				setId('')
				props.finish()
				setVisible(false)
			})
			.catch(errorInfo => {
				console.log(errorInfo.errorFields[0].errors[0])
			})
		setTimeout(() => {
			setConfirmLoading(false)
		}, 2000)
	}

	const handleCancel = () => {
		form.resetFields()
		setVisible(false)
	}

	useImperativeHandle(props.innerRef, () => ({
		toggleModal
	}))

	const toggleModal = (status: boolean, menu?: NewMenu) => {
		setVisible(status)
		form.setFieldsValue(menu)
		setTitle(menu?.newData ? '新增菜单' : '修改菜单')
		setId(menu?.newData ? '' : menu!.id)
	}

	return (
		<>
			<Modal
				title={title}
				visible={visible}
				width="500px"
				onOk={handleOk}
				confirmLoading={confirmLoading}
				onCancel={handleCancel}
			>
				<Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} name="formData" className="form">
					<Row gutter={24}>
						<Col span={24}>
							<Form.Item
								name="parentId"
								label="父级菜单"
								rules={[
									{
										required: true,
										message: '请选择父级菜单'
									}
								]}
							>
								<TreeSelect fieldNames={{ label: 'title', value: 'id' }} treeData={props.menuTree} placeholder="请选择父级菜单" />
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item
								name="title"
								label="菜单标题"
								rules={[
									{
										required: true,
										message: '请输入菜单标题'
									}
								]}
							>
								<Input placeholder="请输入菜单标题" />
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item
								name="icon"
								label="菜单图标"
								rules={[
									{
										required: true,
										message: '请选择菜单图标'
									}
								]}
							>
								<Select allowClear showSearch placeholder="请选择菜单图标">
									{iconOption}
								</Select>
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item
								name="index"
								label="菜单序号"
								rules={[
									{
										required: true,
										message: '请输入菜单序号'
									}
								]}
							>
								<InputNumber style={{ width: '100%' }} min={0} placeholder="请输入菜单序号" />
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item
								name="isLink"
								label="外链"
								rules={[
									{
										required: true,
										message: '请选择'
									}
								]}
							>
								<Radio.Group>
									<Radio value="1">是</Radio>
									<Radio value="2">否</Radio>
								</Radio.Group>
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item
								name="path"
								label="菜单路径"
								rules={[
									{
										required: true,
										message: '请输入菜单路径'
									}
								]}
							>
								<Input placeholder="请输入菜单路径" />
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Modal>
		</>
	)
}

export default App
