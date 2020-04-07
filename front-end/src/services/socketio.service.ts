import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  token = localStorage.getItem('_cu');
  
  socket;

  constructor() { }

  setupSocketConnection() {
    // this.socket = io(environment.SOCKET_ENDPOINT, {
    //   query: {
    //     token: this.token
    //   }
    // });

    // this.socket.on('listenOnNotificationService', (data: string) => {
    //   console.log(data);
    // });
  }
}
