import { User, Role, Permission, Menu } from '@/api/interface/index'
import { Ref } from 'react'

export interface UFProps {
	toggleModal: (status: boolean, user?: User.ResList) => void
}

export interface PFProps {
	toggleModal: (status: boolean, permission?: Permission.ResList) => void
}

export interface RFProps {
	toggleModal: (status: boolean, role?: Role.ResList) => void
}

export interface MFProps {
	toggleModal: (status: boolean, menu?: Menu.ResList) => void
}

export interface MenuTree extends Menu.ResList {
	close?: boolean
	children?: MenuTree[]
}

export interface NewMenu extends Menu.ResList {
	newData?: boolean
}

export interface SysFormProps<T> {
	finish: () => void
	innerRef: Ref<T>
}
