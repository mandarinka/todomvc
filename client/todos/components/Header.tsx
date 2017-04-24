import * as React from 'react';
import TodoTextInput from './TodoTextInput';
import { Todo } from '../model';

interface HeaderProps {
  addTodo: (text:string)=> any;
  todos: Todo[];
};

class Header extends React.Component<HeaderProps, void> {
  constructor(props, context) {
    super(props, context);
  }


  handleSave(text: string) {
    if (text.length !== 0) {
      this.props.addTodo(text);
    }
  }

  render() {
    const todos =  this.props.todos;
    return (
      <header className="header">
          <h1>todos</h1>
          <TodoTextInput
            newTodo
            onSave={this.handleSave.bind(this)}
            placeholder="What needs to be done?"
            todos={todos}
          />
      </header>
    );
  }
}

export default Header;
