import React, { Component } from "react";
import "./TodoApp.css";

export default class TodoApp extends Component {
  state = {
    input: "",
    items: [],
    editIndex: null, // Track the index of the item being edited
  };

  componentDidMount() {
    const storedItems = localStorage.getItem("todoItems");
    if (storedItems) {
      this.setState({ items: JSON.parse(storedItems) });
    }
  }

  componentDidUpdate() {
    localStorage.setItem("todoItems", JSON.stringify(this.state.items));
  }

  handleChange = (event) => {
    this.setState({
      input: event.target.value,
    });
  };

  storeItem = (event) => {
    event.preventDefault();
    const { input } = this.state;

    if (input.trim() !== "") {
      const { items, editIndex } = this.state;
      const updatedItems = [...items];

      if (editIndex !== null) {
        updatedItems[editIndex] = input;
      } else {
        updatedItems.push(input);
      }

      this.setState({
        items: updatedItems,
        input: "",
        editIndex: null,
      });
    }
  };

  deleteItem = (index) => {
    this.setState({
      items: this.state.items.filter((_, i) => i !== index),
    });
  };

  editItem = (index) => {
    const itemToEdit = this.state.items[index];
    this.setState({
      input: itemToEdit,
      editIndex: index,
    });
  };

  render() {
    const { input, items, editIndex } = this.state;
    return (
      <div className="todo-container">
        <form className="input-section" onSubmit={this.storeItem}>
          <h1>Todo App</h1>
          <input
            type="text"
            value={input}
            onChange={this.handleChange}
            placeholder="Enter Items..."
          />
        </form>

        <ul>
          {items.map((data, index) => (
            <li key={index}>
              {index === editIndex ? (
                <form onSubmit={this.storeItem}>
                  <input
                    className="edit-input-button"
                    type="text"
                    value={input}
                    onChange={this.handleChange}
                    onBlur={this.storeItem}
                  />
                </form>
              ) : (
                <span className="text-field">{data}</span>
              )}
              <i
                className="fa-solid fa-pen-to-square"
                onClick={() => this.editItem(index)}
              ></i>
              <i
                className="fa-solid fa-trash-can"
                onClick={() => this.deleteItem(index)}
              ></i>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
