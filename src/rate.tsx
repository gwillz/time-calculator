
import * as React from 'react'
import {connect, DispatchProp} from 'react-redux'
import {State as Store} from './store'

type Props = DispatchProp & {
    rate: number;
}

type State = {
    value: string;
}

export class RateInput extends React.Component<Props, State> {
    
    private timer: number;
    
    constructor(props: Props) {
        super(props);
        this.state = {
            value: props.rate.toFixed(2),
        }
    }
    
    onInput = (event: React.SyntheticEvent<HTMLInputElement>) => {
        const {value} = event.currentTarget;
        
        if (this.state.value === value) return;
        
        this.setState({ value });
        
        window.clearTimeout(this.timer);
        this.timer = window.setTimeout(() => {
            this.props.dispatch({
                type: 'RATE_EDIT',
                rate: parseInt(value || '0', 10),
            })
        }, 300);
    }
    
    render() {
        return (
            <input
                type='number'
                className='input'
                step='0.10'
                value={this.state.value}
                onChange={this.onInput}
                placeholder='0.00'
                autoComplete='off'
                autoCorrect='off'
            />
        )
    }
}

export default connect((store: Store) => ({
    rate: store.rate
}))(RateInput);
