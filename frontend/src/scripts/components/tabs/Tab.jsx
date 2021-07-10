import React, { Component } from "react";
import PropTypes from "prop-types";

class Tab extends Component {
    static propTypes = {
        activeTab: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
    };

    onClick = () => {
        const { label, onClick } = this.props;
        onClick(label);
    };

    render() {
        const {
            onClick,
            props: { activeTab, label, icon },
        } = this;

        let className = "tab-list-item";

        if (activeTab === label) {
            className += " tab-list-active";
        }

        return (
            <div className={`${className} menu-tab`} onClick={onClick}>
                <div className="menu-tab-icon">
                    <img src={icon} />
                </div>
                <div className="menu-tab-label">
                    {label}
                </div>
            </div>
        );
    }
}

export default Tab;