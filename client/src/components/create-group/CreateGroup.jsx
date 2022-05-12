import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import configFile from '../../config.json';
import Homepage from '../homepage/Homepage';
import Logo from '../homepage/Logo';
import '../../App.css';

var chatData = JSON.parse(localStorage.getItem('chatData'));

async function saveGroup() {
    //posting data to server to create group 
    var user = JSON.parse(localStorage.getItem('user'));
    const groupName = document.getElementById('groupName').value;
    const trimedGroupName = groupName.replaceAll(' ', '-');

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            groupName: trimedGroupName,
            userIndex: user.userIndex,
            username: user.username
        })
    }

    await fetch(`${configFile.serverURL}/create-group`, options);

    //saving group to local storage
    chatData.groups.push(groupName);
    localStorage.setItem('chatData', JSON.stringify(chatData));

    window.location.reload();
}

const CreateGroup = (
    <div className='createGroup' id='createGroup'>
        <h1>Enter your group name: </h1>

        <br />
        <br />

        <input className='concInfoInps' id='groupName' placeholder='Enter group name' required />

        <br />
        <br />
        <br />

        <button className='loginBtn' onClick={saveGroup}>Create</button>
    </div >
);

export default CreateGroup;
