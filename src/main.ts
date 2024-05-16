import { connectToServer } from './socket-client'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Websocker - Client</h1>
    <input id="jwt-token" placeholder0"Json Web Token" />
    <button id="btn-connect">Connect</button><br>
    <span id="server-status">offline</span>

    <h3>Clients Connected</h3>
    <ul id="clients-ul"></ul>

    <hr>
    <form id="message-form">
      <input placeholder="message" id="message-input" />
    </form>

    <hr><h3>Messages</h3>
    <ul id="messages-ul"></ul>
  </div>
`
//connectToServer();

const jwtToken = document.querySelector<HTMLInputElement>('#jwt-token')!;
const btnConnect = document.querySelector<HTMLButtonElement>('#btn-connect')!;

btnConnect.addEventListener('click', () => {

  if ( jwtToken.value.trim().length <= 0 ) return alert('Enter a valid JWT');

  connectToServer( jwtToken.value );
});

