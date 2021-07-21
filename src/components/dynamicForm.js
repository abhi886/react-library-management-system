import React, { Component } from "react";
import Input from "./common/input";

// import Form from "./common/form";
import ParentComponent from "./parentComponent";

class DynamicForm extends Component {
  state = {
    numChildren: 0,
  };

  renderInput(name, label, type = "text") {
    return (
      <Input
        type={type}
        name={name}
        // value={data[name]}
        label={label}
        // onChange={this.handleChange}
        // error={errors[name]}
      />
    );
  }
  render() {
    const children = [];

    for (var i = 0; i < this.state.numChildren; i += 1) {
      children.push(this.renderInput("title", "Title"));
    }

    return (
      <ParentComponent addChild={this.onAddChild}>
        <form>{children}</form>
      </ParentComponent>
      // <>
      //   <form>
      //     {this.renderInput("title", "Title")}
      //     {this.renderInput("title", "Title")}
      //   </form>
      // </>
    );
  }

  onAddChild = () => {
    this.setState({
      numChildren: this.state.numChildren + 1,
    });
  };
}
export default DynamicForm;
