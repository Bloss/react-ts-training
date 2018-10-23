import React, { SFC } from 'react'

import Toggleable from '../src/toggleable'
import ToggleMenu, { ToggleMenuProps, MenuItem } from '../src/ToggleableMenu'

export const toggleCommonExample = () => (
	<Toggleable>
		{({ show, toggle }) => (
			<>
				<div onClick={toggle}>
					<h1>点击显示正文</h1>
				</div>
				{ show ? <p>我是正文</p> : null }
			</>
		)}
	</Toggleable>
)

export const toggleMenuExample = () => (
	<ToggleMenu title="点击我显示正文">我是正文</ToggleMenu>
)

const ToggleWithTitle = Toggleable.ofType<ToggleMenuProps>();

export const toggleViaInjectExample: SFC<ToggleMenuProps> = ({
	title,
	children
}) => (
	<ToggleWithTitle component={ MenuItem } props={{ title }}>
		{children}
	</ToggleWithTitle>
)