import React from 'react'
import { withToggle } from '../src/ToggleHOC'
import { MenuItem } from '../src/ToggleableMenu'

const ToggleViaHoc = withToggle(MenuItem)

export const ToggleViaHocExample = () => (
	<ToggleViaHoc title='试试'>some content</ToggleViaHoc>
)