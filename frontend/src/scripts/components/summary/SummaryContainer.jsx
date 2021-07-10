import React, { Component } from "react";
import PropTypes from "prop-types";
import { SummaryChart } from "./SummaryChart";

class SummaryContainer extends Component {
  static propTypes = {
    messages: PropTypes.instanceOf(Array).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {};
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

    const {
        props: { messages }
      } = this;

      const totalValidMessages = this.getTotalValidMessages(messages)
      const Summary = SummaryChart({
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
      <div className="summary-container">
          <Summary />
      </div>
    );
  }
}

export default SummaryContainer;