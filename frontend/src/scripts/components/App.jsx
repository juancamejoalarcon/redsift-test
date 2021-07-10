/* eslint no-console: 0 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { translate } from 'react-i18next';

import Header from './Header';
import Message from './Message';
import Menu from './Menu';

class App extends Component {
  static propTypes = {
    t: PropTypes.function,
    data: PropTypes.any,
  }

  render() {
    const { t, data } = this.props;
    const { counts, messages } = data;

    return (
      <div>
        <Header/>
        <Menu/>
        {/* <h1>{t('app:title-home')}</h1>
        <h4>{t('app:description-home', {count: counts.messageTotal})}</h4>
        { messages.map((m, key) => <div key={key}><p>{m.subject}</p></div>) } */}
        <div className="message-list">
          {messages.map((m, key) => <Message key={key} message={m} />)}
        </div>
      </div>
    );
  }
}

export default translate(['app'], { wait: true })(App);
