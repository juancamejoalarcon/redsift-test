/* eslint no-console: 0 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { translate } from 'react-i18next';

import Header from './Header';
import Messages from './messages/Messages';
import SummaryContainer from "./summary/SummaryContainer"
import Tabs from "./tabs/Tabs";

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
        <Header />
        <div className="menu">
          <div className="menu-container">
            <Tabs>
              <div label={t('app:label-1')} icon="https://www.gstatic.com/images/icons/material/system/2x/inbox_gm_googlered600_20dp.png">
                <Messages messages={messages} />
              </div>
              <div label={t('app:label-2')} icon="https://www.iconpacks.net/icons/1/free-pie-chart-icon-683-thumb.png">
                <SummaryContainer messages={messages} />
              </div>
            </Tabs>
          </div>
        </div >
        {/* <h1>{t('app:title-home')}</h1>
        <h4>{t('app:description-home', {count: counts.messageTotal})}</h4>
        { messages.map((m, key) => <div key={key}><p>{m.subject}</p></div>) } */}
      </div >
    );
  }
}

export default translate(['app'], { wait: true })(App);
