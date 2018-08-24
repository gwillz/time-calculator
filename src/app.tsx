
import * as React from 'react'
import {connect, DispatchProp} from 'react-redux'
import {Item, State} from './store'
import {ItemRow} from './item'
import {formatHours} from './core'

type Props = DispatchProp & {
    items: Item[];
    rate: number;
    minutes: number;
}

export class App extends React.Component<Props> {
    
    onAdd = () => {
        this.props.dispatch({ type: 'ITEM_NEW' });
    }
    
    render() {
        const {items, rate, minutes} = this.props;
        const amount = (minutes / 60 * rate).toFixed(2);
        const hours = formatHours(minutes);
        
        return (
            <div>
                <div>
                    {Object.values(items).map((item, i) => (
                        <ItemRow
                            dispatch={this.props.dispatch}
                            key={i} index={i}
                            name={item.name}
                            calc={item.calc}
                            minutes={item.minutes}
                            rate={rate}
                        />
                    ))}
                </div>
                <div>
                    Rate: {rate} &nbsp; Total ${amount} &nbsp; {hours} hrs
                </div>
                <button
                    type='button'
                    onClick={this.onAdd}>
                    Add
                </button>
            </div>
        )
    }
}

export function Loader() {
    return (
        <div>
            Loading...
        </div>
    )
}

export default connect((state: State) => ({
    items: state.items,
    rate: state.rate,
    minutes: state.minutes,
}))(App);
