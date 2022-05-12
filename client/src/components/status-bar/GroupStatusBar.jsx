import React from 'react';
import ReactDOM from 'react-dom';
import AddPeople from '../group-chat/AddPeople';
import Homepage from '../homepage/Homepage';
import configFile from '../../config.json';
import './StatusBar.css';

function addPeople() {
  ReactDOM.render(
    <Homepage frame={<AddPeople />} />, document.getElementById('root')
  );
}

function leaveGroup() {
  const currentGroupData = JSON.parse(localStorage.getItem('currentGroupData'));
  const user = JSON.parse(localStorage.getItem('user'));

  //changing the users.json file using server
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      groupName: currentGroupData.groupName,
      userIndex: user.userIndex,
      username: user.username
    })
  }

  fetch(`${configFile.serverURL}/leave-group`, options);

  //changing chatData in localStorage()
  var chatData = JSON.parse(localStorage.getItem('chatData'));
  chatData.groups.splice(currentGroupData.groupName, 1);
  
  localStorage.setItem('chatData', JSON.stringify(chatData));

  window.location.reload();
}

function renderSettings() {
  //make a settings page
}

export default function GroupStatusBar() {
  const currentGroupData = JSON.parse(localStorage.getItem('currentGroupData'));

  return (
    <div className='groupStatusBar'>
      <h4>{currentGroupData.groupName}</h4>

      <button className='statusBarBtns' onClick={addPeople}>Add people</button>

      <button className='statusBarBtns' onClick={leaveGroup}>Leave</button>

      <button className='statusBarBtns' onClick={renderSettings}>Settings</button>
    </div>
  );
}
