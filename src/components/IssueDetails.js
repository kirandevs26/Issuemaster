import React from 'react'
import IssuesData from './issues.json';

export default ({match}) => {
    const issueItem = IssuesData.find(obj => obj.value == match.params.id);
    if(!issueItem) return null;
    const issueTitle = `Issue#${issueItem.value} ${issueItem.label}`
  return (
    <div>
        <h3>{issueTitle}</h3>
      <code style={{backgroundColor: '#ccc', width: '300px'}}>
        Error: {issueItem.info}
        <br/>
        : <br/>
        : Error Information <br/>
        :
      </code>
    </div>
  )
}
