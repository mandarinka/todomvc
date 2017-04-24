import * as React from 'react';
import * as classNames from 'classnames';
import { Todo } from '../model';

interface AutoCompleteProps {
    filteredTodos: Todo[];
    autocompleteClass: string;
    updateInputText: (text: string) => void;
}

class AutoComplete extends React.Component<AutoCompleteProps, void> {
    constructor(props, context) {
        super(props, context);
        this.handleUpdateTextInput = this.handleUpdateTextInput.bind(this);
    }

    handleUpdateTextInput(e) {
        const text = e.target.textContent;
        this.props.updateInputText(text);
    }

    render() {
        const todos = this.props.filteredTodos;
        const autocompleteClass = this.props.autocompleteClass;

        return(
            <ul className={autocompleteClass}>
                {
                    todos.map(todo => {return <li onClick={this.handleUpdateTextInput} key={todo.id} data-todo={todo}>{todo.text}</li>;})
                }
            </ul>
        );
    }
}

export default AutoComplete;