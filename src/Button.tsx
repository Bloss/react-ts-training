import React, { SFC, MouseEvent } from 'react'
import { withDefaultProps } from './reactdf'

const defaultProps = { color: 'red' }

type DefaultProps = typeof defaultProps
type Props = { onClick(e: MouseEvent<HTMLElement>): void } & DefaultProps

const Button: SFC<Props> = ({ onClick: handleClick, children, color }) => (
	<button onClick={handleClick} style={{ color }}>{children}</button>
)

export default withDefaultProps(defaultProps, Button);