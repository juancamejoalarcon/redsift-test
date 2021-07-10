import React, { Component } from "react";
import PropTypes from "prop-types";
import Message from './Message';

class Messages extends Component {
  static propTypes = {
    messages: PropTypes.instanceOf(Array).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {

    const {
        props: { messages }
      } = this;

    return (
      <div className="message-list">
          {messages.map((m, key) => <Message key={key} message={m} />)}
      </div>
    );
  }
}

export default Messages;