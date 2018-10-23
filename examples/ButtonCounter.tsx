import React, { Component } from 'react'
import Button from '../src/button'

const initialState = { clicksCount: 0 }

type State = Readonly<typeof initialState>

export class ButtonCounter extends Component<object, State> {
	readonly state: State = initialState;

	private handleIncrement = () => this.setState(incrementClick)

	private handleDecrement = () => this.setState(decrementClick)

	render () {
		const { clicksCount } = this.state
		return (
			<>
				<Button onClick={this.handleIncrement} color='blue'>Increment</Button>
				<Button onClick={this.handleDecrement}>Decrement</Button>
				you've clicked me {clicksCount} times!
			</>
		)
	}
}

// 两个纯 state transfer 函数单独提取出来, 这样方便测试, 而不用关心 render 的逻辑
const incrementClick = (prevState: State) => ({
	clicksCount: prevState.clicksCount + 1
})

const decrementClick = (prevState: State) => ({
	clicksCount: prevState.clicksCount + 1
})