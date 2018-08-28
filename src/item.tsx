
import * as React from 'react'
import {connect, DispatchProp} from 'react-redux'
import {calculate, formatHours} from './core'

type Props = DispatchProp & {
    value?: string;
    index: number;
    rate: number;
    minutes: number;
    insert: number | undefined;
}

type State = {
    value: string;
    clear_ready: boolean;
}

export class ItemRow extends React.Component<Props, State> {
    
    private timer: number;
    
    constructor(props: Props) {
        super(props);
        this.state = {
            value: props.value || '',
            clear_ready: false,
        }
    }
    
    onInput = (event: React.SyntheticEvent<HTMLInputElement>) => {
        let {value} = event.currentTarget;
        value = value.replace(/\./, ':').replace(/,/, '+');
        if (this.state.value === value) return;
        
        this.setState({ value });
        
        window.clearTimeout(this.timer);
        this.timer = window.setTimeout(() => {
            const minutes = calculate(value);
            
            this.props.dispatch({
                type: "ITEM_EDIT",
                index: this.props.index,
                item: {
                    value,
                    minutes,
                }
            })
        }, 300)
    }
    
    onDelete = () => {
        if (this.state.clear_ready) {
            this.props.dispatch({
                type: 'ITEM_REMOVE',
                index: this.props.index,
            })
        }
        this.setState(state => ({
            clear_ready: !state.clear_ready,
        }))
    }
    
    onCancel = () => {
        if (this.state.clear_ready) {
            this.setState({
                clear_ready: false,
            })
        }
    }
    
    onInsert = () => {
        if (!this.props.insert) return;
        const hours = formatHours(this.props.insert);
        
        this.setState(state => ({
            value: state.value + " + " + hours,
        }),
        () => {
            this.props.dispatch({
                type: 'ITEM_EDIT',
                index: this.props.index,
                item: {
                    value: this.state.value,
                    minutes: calculate(this.state.value),
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
                    className='input'
                    onChange={this.onInput}
                    value={this.state.value}
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
            <td className={(this.state.clear_ready ? 'control-focus' : '')}
                onClick={this.onCancel}>
                <span
                    onClick={this.onDelete}
                    className='inline-button icon is-small'>
                    <i className={'fas ' + (this.state.clear_ready
                            ? 'fa-check-circle' : 'fa-trash-alt')}/>
                </span>
            </td>
            </tr>
        )
    }
}

export default connect()(ItemRow);
