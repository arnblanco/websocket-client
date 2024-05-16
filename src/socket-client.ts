import { Manager, Socket } from "socket.io-client"

let socket: Socket;

export const connectToServer = ( token: string ) => {

    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js', {
        extraHeaders: {
            authentication: token
        }
    });

    socket?.removeAllListeners();
    socket = manager.socket('/');

    addListeners()
}

const addListeners = () => {

    const serverStatuslabel = document.querySelector('#server-status')!;
    const clientsUl = document.querySelector('#clients-ul')!;

    const messgeForm = document.querySelector<HTMLFormElement>('#message-form')!;
    const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;

    const messagesUl = document.querySelector('#messages-ul')!;


    socket.on('connect', () => {
        serverStatuslabel.innerHTML = 'Connected';
    });

    socket.on('disconnect', () => {
        serverStatuslabel.innerHTML = 'Disconnected';
    });

    socket.on('clients-updated', ( clients: string[] ) => {
        let clientsHtml = '';
        clients.forEach( clientId => {
            clientsHtml += `
                <li>${ clientId }</li>
            `;
        });

        clientsUl.innerHTML = clientsHtml;
    });

    socket.on('message-from-server', ( payload: { fullName: string, message: string }) => {
        const newMessage = `
            <li>
                <strong>${ payload.fullName }</strong>
                <strong>${ payload.message }</strong>
            </li>
        `;

        const li = document.createElement('li');
        li.innerHTML = newMessage;
        messagesUl.append( li );
    })

    messgeForm.addEventListener('submit', ( event )=>{
        event.preventDefault();

        if( messageInput.value.trim().length <= 0 ) return;
        
        socket.emit('message-from-client', {
            id: 'YO!!',
            message: messageInput.value
        });

        messageInput.value = '';

    });
}

