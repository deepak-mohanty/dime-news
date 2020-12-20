
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TabManager extends Component {
    state = {}
    render() {
        const { activeTab, handleTab, tabs } = this.props;
        return (
            <div className="tab-manager">
                {
                    tabs.map(({label, value}) => {
                        return <div key={value} className={`tab ${value === activeTab ? 'selected-tab' : '' }`} onClick={ () => handleTab(value)} >
                            {label}
                        </div>
                    })
                }
            </div>
        )
    }
}

TabManager.propTypes = {
    activeTab: PropTypes.number.isRequired,
    handleTab: PropTypes.func.isRequired,
    tabs: PropTypes.arrayOf(Object).isRequired
}

export default TabManager;

