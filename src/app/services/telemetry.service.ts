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
  private socket: WebSocketSubject<string>;

  private isConnected: boolean = false;
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
        console.log('Message received: ' + msg);
        this.handleMsgs(msg);
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

  handleMsgs(msg:  string): void {
    const decodedMsg = atob(msg);
    // Check for multiple packets in message
    let msgBuffer = decodedMsg;
    // Look for the end of text character as the message terminator
    if (msgBuffer.indexOf("\x03") >= 0) {
        const newMessages = msgBuffer.split("\x03");
        console.log("Processing " + newMessages.length + " messages ...");
        for (const element of newMessages) {
            this.handleMsg(element);
        }
    }
  }

  handleMsg(msg: string ): void {
    console.log("Handling message : " + msg);
  }


}
