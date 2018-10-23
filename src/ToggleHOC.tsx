import React, { ComponentType, Component } from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics';
import Toggleable, { ToggleableProps as InjectProps, Props as TotalProps } from './toggleable'

export const getComponentName = (component: ComponentType<any>) =>
	component.displayName || (component as any).name

export const getHocComponentName = (hocName: string, component: ComponentType<any>) =>
	`${hocName}(${getComponentName(component)})`

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

type OwnProps = Pick<TotalProps, 'show'>

export const withToggle = <OriginalProps extends object>(
	UnwrapperComponent: ComponentType<OriginalProps & InjectProps>
) => {
	type Props = Omit<OriginalProps, keyof InjectProps> & OwnProps;

	class withToggle extends Component<Props> {
		static readonly displayName = getHocComponentName(
			withToggle.displayName,
			UnwrapperComponent
		)

		static readonly UnwrapperComponent = UnwrapperComponent

		render () {
			const { show, ...rest } = this.props as Pick<Props, 'show'>
			return (
				<Toggleable show={show} render={renderProps => (
					<UnwrapperComponent {...rest} {...renderProps} />
				)}/>
			)
		}
	}

	return hoistNonReactStatics(withToggle, UnwrapperComponent)
}