import React, { SFC } from 'react'
import Toggleable, { ToggleableProps } from './toggleable'

type MenuItemProps = { title: string }
export const MenuItem: SFC<MenuItemProps & ToggleableProps> = ({ title, children, toggle, show }) => (
	<>
		<div onClick={toggle}>
			<h1>{title}</h1>
		</div>
		{ show ? children : null }
	</>
)

export type ToggleMenuProps = { title: string } & { show?: boolean }
const ToggleMenu: SFC<ToggleMenuProps> = ({ title, children, show: showContent }) => (
	<Toggleable show={showContent}>
		{({ show, toggle }) => (
			<MenuItem show={show} title={title} toggle={toggle}>
				{children}
			</MenuItem>
		)}
	</Toggleable>
)

export default ToggleMenu;