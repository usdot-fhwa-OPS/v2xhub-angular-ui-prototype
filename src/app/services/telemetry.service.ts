import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket'

const WEBSOCKET_URL = "wss://127.0.0.1:19760";

export interface Message {
  author: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class TelemetryService {
  private  socket: WebSocketSubject<string>;
  constructor( ) { 
    this.socket = webSocket<string>({
      url: WEBSOCKET_URL,
      protocol: "base64",
      serializer: (t) => t,
      deserializer : ({data}) => data});
  }

  connect(): void {
    this.socket.subscribe({
      next: msg => 
      {
        console.log('Message received: ' + atob(msg))
      },
      error: e => console.error("Error occured during Websocket connection : ", e ),
      complete: () => console.log('Complete')
    })
    console.log("Successfully connected")
  }

  sendMsg(msg: Object): void {
    const encodedJson = btoa("\x02" + JSON.stringify(msg) + "\x03");
    this.socket.next(encodedJson);
    console.log('Sending message ' + JSON.stringify(msg) + " as " + encodedJson);
  }


}
