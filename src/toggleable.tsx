import React, { Component, ComponentType, MouseEvent, ReactNode } from 'react'

const isFunction = <T extends Function>(t: any): t is T => (typeof t) === 'function'

const initialState = { show: false }

type State = Readonly<typeof initialState>

export type ToggleableProps<P extends object = object> = {
	show: State['show'],
	toggle: Toggleable['toggle']
} & P;

type RenderCallback = (args: ToggleableProps) => JSX.Element

type DefaultProps<P extends object = object> = { props: P } & Pick<State, 'show'>;
const defaultProps: DefaultProps = { ...initialState, props: {} };

export type Props<P extends object = object> = Partial<{
	children: RenderCallback | ReactNode,
	render: RenderCallback,
	component: ComponentType<ToggleableProps<P>>
} & DefaultProps<P>>

type Constructor<T = {}> = new (...args: any[]) => T

export default class Toggleable<T extends object = object> extends Component<Props<T>, State> {

	static ofType<T extends object>() {
		return Toggleable as Constructor<Toggleable<T>>;
	}

	static readonly defaultProps: Props = defaultProps
	readonly state: State = { show: this.props.show! };

	private toggle = (event: MouseEvent<HTMLElement>) => this.setState(updateShowState)

	componentWillReceiveProps(nextProps: Props<T>, nextContext: any) {
		const currentProps = this.props

		if (nextProps.show !== currentProps.show) {
			this.setState({ show: Boolean(nextProps.show) })
		}
	}

	render () {
		const { children, render, component: InjectComponent, props } = this.props

		const renderProps = {
			show: this.state.show,
			toggle: this.toggle
		}

		if (InjectComponent) {
			return (
				<InjectComponent {...props} {...renderProps}>
					{children}
				</InjectComponent>
			)
		}

		if (render) return render(renderProps)

		if (children) return isFunction(children) ? children(renderProps) : null;

		return null;
	}
}

const updateShowState = (prevstate: State) => ({
	show: !prevstate.show
})