
import * as React from 'react'
import {connect, DispatchProp} from 'react-redux'
import {calculate, formatHours} from './core'

type Props = DispatchProp & {
    calc?: string;
    index: number;
    rate: number;
    minutes: number;
    insert: number | undefined;
}

type State = {
    calc: string;
}

export class ItemRow extends React.Component<Props, State> {
    
    private timer: number;
    
    constructor(props: Props) {
        super(props);
        this.state = {
            calc: props.calc || '',
        }
    }
    
    onInput = (event: React.SyntheticEvent<HTMLInputElement>) => {
        let {value} = event.currentTarget;
        value = value.replace(/\./, ':').replace(/,/, '+');
        if (this.state.calc === value) return;
        
        this.setState({
            calc: value,
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
    
    onInsert = () => {
        if (!this.props.insert) return;
        const hours = formatHours(this.props.insert);
        
        this.setState(state => ({
            calc: state.calc + " + " + hours,
        }),
        () => {
            this.props.dispatch({
                type: 'ITEM_EDIT',
                index: this.props.index,
                item: {
                    calc: this.state.calc,
                    minutes: calculate(this.state.calc),
                }
            })
            this.props.dispatch({ type: 'INSERT_DONE' });
        })
        
    }
     
    render() {
        const {minutes, rate} = this.props;
        const hours = formatHours(minutes);
        const amount = (minutes / 60 * rate).toFixed(2);
        const disabled = (this.props.insert ? '' : 'disabled');
        
        return (
            <tr>
            <td>
                <span
                    onClick={this.onInsert}
                    className={`inline-button icon is-small ${disabled}`}>
                    <i className='fas fa-angle-double-right'/>
                </span>
            </td>
            <td>
                <input
                    type='text'
                    name='calc'
                    className='input is-small'
                    onChange={this.onInput}
                    value={this.state.calc}
                    placeholder='1:00 + 2:30'
                    inputMode='numeric'
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
                    className='inline-button icon is-small'>
                    <i className='fas fa-trash-alt'/>
                </span>
            </td>
            </tr>
        )
    }
}

export default connect()(ItemRow);
