
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
            <tr>
            {/* <td>
                <input
                    type='text'
                    name='name'
                    className='input is-small'
                    onChange={this.onInput}
                    value={this.state.name}
                    placeholder='Job 1...'
                />
            </td> */}
            <td>
                <input
                    type='text'
                    name='calc'
                    className='input is-small'
                    onChange={this.onInput}
                    value={this.state.calc}
                    placeholder='1:00 + 2:30'
                    autoComplete='off'
                    autoCorrect='off'
                />
            </td>
            <td>
                {hours}
            </td>
            <td>
                ${amount}
            </td>
            <td>
                <span
                    onClick={this.onDelete}
                    className='icon is-small'>
                    <i className='fas fa-trash-alt'/>
                </span>
            </td>
            </tr>
        )
    }
}

export default connect()(ItemRow);
