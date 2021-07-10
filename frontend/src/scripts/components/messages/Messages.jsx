import React, { Component } from "react";
import PropTypes from "prop-types";
import Message from './Message';

class Messages extends Component {
  static propTypes = {
    messages: PropTypes.instanceOf(Array).isRequired,
    geo: PropTypes.instanceOf(Object).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {

    const {
        props: { messages, geo }
      } = this;

    return (
      <div className="message-list">
          {messages.map((m, key) => {
            if (m.ip && geo[m.ip]) {
              m.geoCode = geo[m.ip]
            }
            return <Message key={key} message={m} />
          })}
      </div>
    );
  }
}

export default Messages;