
import * as React from 'react'

const RATE = 26.0;

import {calculate, formatHours} from './core'

export type Props = {
    name?: string;
    value?: string;
    index: number;
}

type State = {
    [key: string]: string;
}

export class Item extends React.Component<Props, State> {
    state = {
        name: '',
        hours: '',
        total_hours: '0:00',
        total_money: '0.00',
    }
    
    static getDerivedStateFromProps(props: Props, state: State) {
        for (let key in props) {
            state[key] = props[key];
        }
        return state;
    }
    
    onInput = (event: React.SyntheticEvent<HTMLInputElement>) => {
        const {name, value} = event.currentTarget;
        
        this.setState({
            [name]: value,
        })
        
        if (name === 'hours') {
            const minutes = calculate(value);
            this.setState({
                total_hours: formatHours(minutes),
                total_money: (minutes / 60 * RATE).toFixed(2),
            })
        }
    }
    
    onDelete = () => {
        console.log('delete', this.props.index);
    }
    
    render() {
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
                    name='hours'
                    onChange={this.onInput}
                    value={this.state.hours}
                />
                <span>
                    {this.state.total_hours} hrs
                </span>
                <span>
                    $ {this.state.total_money}
                </span>
                <button onClick={this.onDelete}>
                    X
                </button>
            </div>
        )
    }
}
