import React, { useState, useEffect, useImperativeHandle } from 'react'
import { Form, Input, Row, Col, Select, Drawer, message, Space, Button, Tree } from 'antd'
import type { DataNode, TreeProps } from 'antd/es/tree'
import { createPermission, updatePermission } from '@/api/modules/permission'
import { Result, Permission, Menu, ResultData, ResPage } from '@/api/interface/index'
import { PFProps, SysFormProps } from '@/views/sys/type'
import { getMenuList } from '@/api/modules/menu'
import antdIcon from '@/components/AntdIcon'

const { Option } = Select

const App = (props: SysFormProps<PFProps>) => {
	const [form] = Form.useForm()
	const [visible, setVisible] = useState(false)
	const [confirmLoading, setConfirmLoading] = useState(false)
	const [title, setTitle] = useState<string>('新增权限')
	const [id, setId] = useState<string | number>('')

	const [menuTree, setMenuTree] = useState<DataNode[]>([])
	const [params] = useState<Menu.ReqGetParams>({
		page: 1,
		pageSize: 1000
	})

	const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([])

	const handleOk = () => {
		setConfirmLoading(true)
		form
			.validateFields()
			.then(async (values: Permission.ResList) => {
				const api = id ? updatePermission : createPermission
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

	const toggleModal = (status: boolean, permission: Permission.ResList | undefined) => {
		setVisible(status)

		const menus = permission ? permission.menus.map(m => m.id.toString()) : []

		form.setFieldsValue({
			...permission,
			menus
		})

		setCheckedKeys(menus)
		setTitle(permission ? '修改权限' : '新增权限')
		setId(permission ? permission.id : '')
	}

	const onCheck: TreeProps['onCheck'] = checkedKeys => {
		form.setFieldValue('menus', checkedKeys)
		// type不兼容 checkedKeys不能直接赋值
		const newCheckedKeys: React.Key[] = JSON.parse(JSON.stringify(checkedKeys))
		setCheckedKeys(newCheckedKeys)
	}

	const fetchData = async (params: Menu.ReqGetParams) => {
		const res: ResultData<ResPage<Menu.ResList>> = await getMenuList(params)
		const list: Menu.ResList[] = res.data?.list
		const setOption = (id: string | number, list: Menu.ResList[]): DataNode[] => {
			return list
				.filter(e => e.parentId === id)
				.sort((a, b) => a.index - b.index)
				.map(i => {
					const children = setOption(i.id, list)
					return {
						key: i.id.toString(),
						title: i.title,
						icon: antdIcon(i.icon),
						children
					}
				})
		}
		setMenuTree([
			{
				key: '0',
				title: 'root',
				icon: antdIcon('AntDesignOutlined'),
				children: setOption(0, list)
			}
		])
	}

	useEffect(() => {
		fetchData(params)
	}, [params])

	return (
		<>
			<Drawer
				title={title}
				visible={visible}
				width={720}
				onClose={handleCancel}
				extra={
					<Space>
						<Button onClick={handleCancel}>取消</Button>
						<Button onClick={handleOk} loading={confirmLoading} type="primary">
							确认
						</Button>
					</Space>
				}
			>
				<Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} name="formData" className="form">
					<Row gutter={24}>
						<Col span={24}>
							<Form.Item
								name="name"
								label="权限"
								rules={[
									{
										required: true,
										message: '请输入权限'
									}
								]}
							>
								<Input placeholder="请输入权限" />
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item
								name="code"
								label="权限编码"
								rules={[
									{
										required: true,
										message: '请输入正确的权限编码'
									}
								]}
							>
								<Input placeholder="请输入权限编码" />
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item
								name="status"
								label="状态"
								rules={[
									{
										required: true,
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
						<Col span={24}>
							<Form.Item
								name="menus"
								label="菜单"
								rules={[
									{
										required: true,
										message: '请选择菜单'
									}
								]}
							>
								<Tree
									checkable
									showIcon={true}
									checkedKeys={checkedKeys}
									defaultExpandAll={true}
									onCheck={onCheck}
									treeData={menuTree}
								/>
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Drawer>
		</>
	)
}

export default App
