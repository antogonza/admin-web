import { Manager, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';

export const connectToServer = (): Socket => { // Asegúrate de devolver un Socket
    const manager = new Manager(environment.SOCKETS_URL);

    const socket = manager.socket('/');

    addListener(socket);

    return socket; // Devolver el socket
}

const addListener = (socket: Socket) => {

    socket.emit('register-local', { localId: localStorage.getItem('local') });

    // socket.on('new-order', (payload: any) => {
    //     console.log(payload);
    // });

    socket.on('connect', () => {
        console.log('connected');

    });

    socket.on('prueba', (payload) => {
        console.log(payload);

    })

}