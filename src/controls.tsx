
import * as React from 'react'
import {connect, DispatchProp} from 'react-redux'
import RateInput from './rate'
import {State as Store} from './store'


type Props = DispatchProp & {
    rate: number;
    insert: number | undefined;
    minutes: number;
}

type State = {
    beginning: string;
    ending: string;
    clear_ready: boolean;
}

export class AppControls extends React.Component<Props, State> {
    
    private beginning: HTMLInputElement | null;
    private ending: HTMLInputElement | null;
    
    constructor(props: Props) {
        super(props);
        this.state = {
            beginning: '',
            ending: '',
            clear_ready: false,
        }
    }
    
    componentDidUpdate(props: Props) {
        if (!this.props.insert && !!props.insert) {
            this.setState(state => ({
                beginning: state.ending,
                ending: '',
            }))
        }
    }
    
    getTime() {
        if (!this.beginning || !this.ending) return;
        if (!this.state.beginning || !this.state.ending) return;
        
        let start = this.beginning.valueAsDate as Date;
        let end   = this.ending.valueAsDate as Date;
        let minutes = (end.getTime() - start.getTime()) / 60000;
        
        if (minutes < 0) minutes += 24 * 60;
        
        return Math.round(minutes);
    }
    
    onInput = (event: React.SyntheticEvent<HTMLInputElement>) => {
        const {name, value, valueAsDate} = event.currentTarget;
        
        if (!this.state.hasOwnProperty(name)) return;
        if (this.state[name] === value) return;
        if (!(valueAsDate instanceof Date)) return;
        
        this.setState(state => ({
            ...state,
            [name]: value,
        }),
        () => {
            const insert = this.getTime();
            if (insert) {
                this.props.dispatch({
                    type: 'INSERT_READY',
                    insert,
                })
            }
        })
    }
    
    onAdd = () => {
        this.props.dispatch({
            type: 'ITEM_NEW',
            minutes: this.getTime(),
        });
    }
    
    onClear = (event: React.SyntheticEvent) => {
        event.stopPropagation();
        
        if (this.state.clear_ready || this.props.minutes == 0) {
            this.props.dispatch({ type: 'ITEM_CLEAR' });
        }
        if (this.props.minutes > 0) {
            this.setState(state => ({
                clear_ready: !state.clear_ready,
            }))
        }
    }
    
    onCancel = () => {
        if (this.state.clear_ready) {
            this.setState({ clear_ready: false });
        }
    }
    
    render() {
        return (
            <>
            <div className='field is-grouped'>
                <span className='control is-expanded'>
                    <input
                        type='time'
                        className='input'
                        title='Beginning'
                        name='beginning'
                        ref={r => this.beginning = r}
                        value={this.state.beginning}
                        onChange={this.onInput}
                    />
                </span>
                <span className='control is-expanded'>
                    <input
                        type='time'
                        className='input'
                        title='Ending'
                        name='ending'
                        ref={r => this.ending = r}
                        value={this.state.ending}
                        onChange={this.onInput}
                    />
                </span>
            </div>
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
                <span
                    className={'control' +
                        (this.state.clear_ready ? ' control-focus' : '')}
                    onClick={this.onCancel}>
                    <button
                        type='button'
                        className='button'
                        title='Clear All'
                        onClick={this.onClear}>
                        <span className='icon is-small'>
                            <i className='fas fa-eraser'/>
                        </span>
                        <span>
                            {this.state.clear_ready ? 'Confirm' : 'Clear'}
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
            </>
        )
    }
}

export default connect((state: Store) => ({
    rate: state.rate,
    insert: state.insert,
    minutes: state.minutes,
}))(AppControls);
