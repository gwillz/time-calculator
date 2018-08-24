
import * as React from 'react'
import {connect, DispatchProp} from 'react-redux'
import {Item, State} from './store'
import {ItemRow} from './item'
import RateInput from './rate'
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
    
    onClear = () => {
        this.props.dispatch({ type: 'ITEM_CLEAR' });
    }
    
    render() {
        const {items, rate, minutes} = this.props;
        const amount = (minutes / 60 * rate).toFixed(2);
        const hours = formatHours(minutes);
        
        return (
            <>
            <div className="hero is-small is-bold is-primary">
            <div className="hero-body">
            <div className="container is-squished">
                <h1 className="title">
                    Time Calculator
                </h1>
            </div>
            </div>
            </div>
            <div className="section container is-squished">
                <table className="table is-fullwidth">
                <tbody>
                    {items.map((item, i) => (
                        <ItemRow
                            dispatch={this.props.dispatch}
                            key={i} index={i}
                            name={item.name}
                            calc={item.calc}
                            minutes={item.minutes}
                            rate={rate}
                        />
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        {/* <td/> */}
                        <td/>
                        <td>{hours}</td>
                        <td>${amount}</td>
                        <td/>
                    </tr>
                </tfoot>
                </table>
                <div className='field is-grouped'>
                    <span className='control'>
                        <button
                            type='button'
                            className='button'
                            title='New Entry'
                            onClick={this.onAdd}>
                            <span className='icon is-small'>
                                <i className='fas fa-plus-circle'/>
                            </span>
                            <span>
                                Add
                            </span>
                        </button>
                    </span>
                    <span className='control'>
                        <button
                            type='button'
                            className='button'
                            title='Clear All'
                            onClick={this.onClear}>
                            <span className='icon is-small'>
                                <i className='fas fa-eraser'/>
                            </span>
                            <span>
                                Clear
                            </span>
                        </button>
                    </span>
                    <span className='control is-expanded has-icons-left'>
                        <RateInput/>
                        <span className='icon is-small is-left'>
                            <i className='fas fa-dollar-sign'/>
                        </span>
                    </span>
                </div>
            </div>
            </>
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
