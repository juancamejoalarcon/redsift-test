/* eslint no-console: 0 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { translate } from 'react-i18next';

import Header from './Header';
import Message from './Message';
import Menu from './Menu';
import { SummaryChart } from "./SummaryChart";

class App extends Component {
  static propTypes = {
    t: PropTypes.function,
    data: PropTypes.any,
  }

  getTotalValidMessages = (messages) => {
    const total = {
      DKIM: 0,
      DMARC: 0,
      SPF: 0
    }
    messages.forEach((m) => {
      if (m.authResults) {
        ['DKIM', 'DMARC', 'SPF'].forEach(value => {
          if (m.authResults[value] === 'pass' || m.authResults[value] === 'bestguesspass') {
            total[value]++
          }
        })
      }
    })
    return total
  }

  render() {
    const { t, data } = this.props;
    const { counts, messages } = data;
    console.log(data)
    const totalValidMessages = this.getTotalValidMessages(messages)
    const Comp = SummaryChart({
      initData: [{
        label: `DKIM (${totalValidMessages.DKIM})`,
        value: totalValidMessages.DKIM
      }, {
        label: `DMARC (${totalValidMessages.DMARC})`,
        value: totalValidMessages.DMARC
      }, {
        label: `SPF (${totalValidMessages.SPF})`,
        value: totalValidMessages.SPF
      }]
    });

    return (
      <div>
        <Comp />
        <Header />
        <Menu />
        {/* <h1>{t('app:title-home')}</h1>
        <h4>{t('app:description-home', {count: counts.messageTotal})}</h4>
        { messages.map((m, key) => <div key={key}><p>{m.subject}</p></div>) } */}
        <div className="message-list">
          {messages.map((m, key) => <Message key={key} message={m} />)}
        </div>
      </div >
    );
  }
}

export default translate(['app'], { wait: true })(App);
