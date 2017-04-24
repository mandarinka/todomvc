import * as React from 'react';
import * as classNames from 'classnames';
import { Todo } from '../model';
import AutoComplete from './AutoComplete';

interface TodoTextInputProps {
  onSave: (text:string)=>void;
  text?: string;
  placeholder?: string,
  editing?: boolean;
  newTodo?: boolean;
  todos?: Todo[];
}
interface TodoTextInputState {
  text: string;
  searchString: string;
  autocomplete: boolean;
}

class TodoTextInput extends React.Component<TodoTextInputProps, TodoTextInputState> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      text: this.props.text || '',
      searchString: '',
      autocomplete: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleUpdateInputText = this.handleUpdateInputText.bind(this);
  }

  handleSubmit(e) {
    const text = e.target.value.trim();

    if (e.which === 13) {
      this.props.onSave(text);
      if (this.props.newTodo) {
        this.setState({
          text: '',
          searchString: '',
          autocomplete: false
        });
      }
    }
  }

  handleChange(e) {
    this.setState({
      text: e.target.value,
      searchString: e.target.value,
      autocomplete: (e.target.value.length > 0) ? true : false
    });
  }

  handleBlur(e) {
    if (!this.props.newTodo) {
      this.props.onSave(e.target.value);
    }
  }

  handleUpdateInputText(text){
    this.setState({
      text,
      autocomplete: false
    });
  }

  render() {
    let autocompleteClass = this.state.autocomplete ? 'autocomplete' : 'hidden';
    const todos = this.props.todos;
    let searchString = this.state.searchString.trim().toLowerCase();
    let filteredTodos = [];

    if(searchString.length > 0){
      filteredTodos = todos.filter(todo => todo.text.toLowerCase().match( searchString ));
    }

    return (
      <div className="autocomplete-container">
        <input className={
              classNames({
                      edit: this.props.editing,
                    'new-todo': this.props.newTodo
              })}
               tabIndex={1}
               type="text"
               placeholder={this.props.placeholder}
               autoFocus={true}
               value={this.state.text}
               onBlur={this.handleBlur}
               onChange={this.handleChange}
               onKeyDown={this.handleSubmit}

        />
        <AutoComplete
            autocompleteClass={autocompleteClass}
            filteredTodos={filteredTodos}
            updateInputText={this.handleUpdateInputText}
        />
      </div>
  );
  }
}


export default TodoTextInput;
