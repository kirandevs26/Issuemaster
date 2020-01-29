import React, { PureComponent } from 'react';
import Dropdown from './SearchDropdown';
import IssuesData from './issues.json';
import './Issues.css';

export default class Issues extends PureComponent {
    state = {
        selectedIssue: ''
    }

    onSelectIssue = ({value}) => {
        this.setState({
            selectedIssue: value
        });
        this.props.history.push(`/issue/${value}`)
    }

    render() {
        return (
            <div>
                <div className="issues_selection">
                    <h1>Issues</h1>
                    <Dropdown
                        options={IssuesData}
                        placeholder="select an Issue"
                        onChange={this.onSelectIssue}
                        value={this.state.selectedIssue}
                    />
                </div>
            </div>
        )
    }
}