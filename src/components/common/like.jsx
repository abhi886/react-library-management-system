import React, { Component } from "react";
class Like extends Component {
  render() {
    const { onClick } = this.props;
    let classes = "fa fa-heart";
    if (!this.props.liked) classes += "-o";
    return (
      <i
        className={classes}
        style={{ cursor: "pointer" }}
        aria-hidden='true'
        onClick={onClick}
      ></i>
    );
  }
}

export default Like;
