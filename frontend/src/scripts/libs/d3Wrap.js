/* eslint react/no-find-dom-node: 0 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import throttle from 'lodash.throttle';

export default function d3Wrap(methods) {
  const defaultMethods = {
    initialize(/* div, data, options */) { },
    update(/* div, data, options */) { },
    destroy() { }
  };

  class D3Wrap extends Component {
    static propTypes = {
      data: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
      ]).isRequired,
      options: PropTypes.object,
      className: PropTypes.string
    }

    constructor(props) {
      super(props);
      this.onResize = throttle(this.componentDidUpdate.bind(this), 500);
    }

    componentDidMount() {
      const { data, options } = this.props;

      window.addEventListener('resize', this.onResize);
      this.initialize.call(this, findDOMNode(this), data, options);
      this.update.call(this, findDOMNode(this), data, options);
    }

    componentDidUpdate() {
      const { data, options } = this.props;
      this.update.call(this, findDOMNode(this), data, options);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.onResize);
      this.destroy.call(this);
    }

    render() {
      const { className } = this.props;
      let classes = 'd3-wrap';
      if (className) { classes = classes.concat(' ', this.props.className); }

      return <div className={classes} width="100%" />;
    }
  }

  Object.assign(D3Wrap.prototype, defaultMethods, methods);

  return D3Wrap;
}