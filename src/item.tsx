
import * as React from 'react'
import {connect, DispatchProp} from 'react-redux'
import {calculate, formatHours} from './core'

type Props = DispatchProp & {
    name?: string;
    calc?: string;
    index: number;
    rate: number;
    minutes: number;
}

type State = {
    [name: string]: string;
}

export class ItemRow extends React.Component<Props, State> {
    
    private timer: number;
    
    constructor(props: Props) {
        super(props);
        this.state = {
            name: props.name || '',
            calc: props.calc || '',
        }
    }
    
    onInput = (event: React.SyntheticEvent<HTMLInputElement>) => {
        const {name, value} = event.currentTarget;
        
        if (this.state[name] === value) return;
        
        this.setState({
            [name]: value,
        })
        
        window.clearTimeout(this.timer);
        this.timer = window.setTimeout(() => {
            const minutes = (name === 'calc')
            ? calculate(value) : this.props.minutes;
            
            this.props.dispatch({
                type: "ITEM_EDIT",
                index: this.props.index,
                item: {
                    [name]: value,
                    minutes,
                }
            })
        }, 300)
    }
    
    onDelete = () => {
        this.props.dispatch({
            type: 'ITEM_REMOVE',
            index: this.props.index,
        })
    }
    
    render() {
        const {minutes, rate} = this.props;
        const hours = formatHours(minutes);
        const amount = (minutes / 60 * rate).toFixed(2);
        
        return (
            <div>
                <input
                    type='text'
                    name='name'
                    onChange={this.onInput}
                    value={this.state.name}
                />
                <input
                    type='text'
                    name='calc'
                    onChange={this.onInput}
                    value={this.state.calc}
                />
                <span>
                    {hours} hrs
                </span>
                <span>
                    ${amount}
                </span>
                <button onClick={this.onDelete}>
                    X
                </button>
            </div>
        )
    }
}

export default connect()(ItemRow);
