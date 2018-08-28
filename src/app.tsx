
import * as React from 'react'
import {connect, DispatchProp} from 'react-redux'
import {Item, State} from './store'
import {ItemRow} from './item'
import {AppControls} from './controls'
import {formatHours} from './core'

type Props = DispatchProp & {
    items: Item[];
    rate: number;
    minutes: number;
    insert: number | undefined;
    version: string;
}

function Header() {
    return (
        <header className="hero is-lou">
        <div className="hero-body">
        <div className="container is-squished">
            <h1 className="title">
                Time Calculator
            </h1>
        </div>
        </div>
        </header>
    )
}

function Footer() {
    return (
        <footer className="footer">
        <div className="container">
        <div className="content has-text-centered">
            <p>
                Time Calculator.
                &nbsp;&nbsp;
                <a className='icon' href="//gwillz.com">
                    <i className='fas fa-user-circle'/>
                </a>
                &nbsp;&nbsp;
                <a className='icon' href="//github.com/gwillz/time-calculator">
                    <i className='fab fa-github'/>
                </a>
            </p>
        </div>
        </div>
        </footer>
    )
}

export function Loader() {
    return (
        <div className='loading'>
            Loading...
        </div>
    )
}

export class App extends React.Component<Props> {
    render() {
        const {items, rate, minutes, version} = this.props;
        const amount = (minutes / 60 * rate).toFixed(2);
        const hours = formatHours(minutes);
        
        return (
            <>
            <Header/>
            <main className="section container is-squished">
                <table className="table is-fullwidth">
                <tbody>
                    {items.map((item, i) => (
                        <ItemRow
                            dispatch={this.props.dispatch}
                            key={i + version} index={i}
                            value={item.value}
                            minutes={item.minutes}
                            rate={rate}
                            insert={this.props.insert}
                        />
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td/>
                        <td/>
                        <td>{hours}</td>
                        <td>${amount}</td>
                        <td/>
                    </tr>
                </tfoot>
                </table>
                <AppControls
                    dispatch={this.props.dispatch}
                    rate={rate}
                    insert={this.props.insert}
                    minutes={this.props.minutes}
                />
            </main>
            <Footer/>
            </>
        )
    }
}

export default connect((state: State) => ({
    items: state.items,
    rate: state.rate,
    minutes: state.minutes,
    insert: state.insert,
    version: state.version,
}))(App);
