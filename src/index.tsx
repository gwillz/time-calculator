
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import {Item, Props as ItemProps} from './item'

type State = {
    items: ItemProps[];
}

class App extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            items: [{
                index: 0
            }],
        }
    }
    
    onAdd = () => {
        this.setState(state => (
            state.items.push({
                index: state.items.length + 1
            }), state
        ))
    }
    
    render() {
        return (
            <div>
                {this.state.items.map(item => (
                    <Item
                        key={item.index}
                        index={item.index}
                        name={item.name}
                        value={item.value}
                    />
                ))}
                <button
                    type='button'
                    onClick={this.onAdd}>
                    Add
                </button>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root') as HTMLElement);
