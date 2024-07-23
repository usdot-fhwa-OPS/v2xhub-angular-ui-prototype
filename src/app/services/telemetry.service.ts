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

  private msgBuffer: string = "";

  constructor( ) { 
    this.socket = webSocket<string>({
      url: WEBSOCKET_URL,
      protocol: "base64",
      serializer: (t) => t,
      deserializer: ({ data }) => data
    });
    this.connect();
  }

  connect(): void {
    this.socket.subscribe({
      next: msg => 
      {
        this.handleMsgs(msg);
      },
      error: e => console.error("Error occured during Websocket connection : ", e ),
      complete: () => console.log('Connection Complete.')
    })
    this.isConnected = true;
  }

  sendMsg(msg: Object): void {
    const encodedJson = btoa("\x02" + JSON.stringify(msg) + "\x03");
    this.socket.next(encodedJson);
    console.log('Sending message ' + JSON.stringify(msg) + " as " + encodedJson);
  }

  handleMsgs(msg:  string): void {
    const decodedMsg = atob(msg);
    // Check for multiple packets in message
    this.msgBuffer += decodedMsg;
    // Look for the end of text character as the message terminator
    let completeMsgs = this.msgBuffer.endsWith("\x03");
    if (this.msgBuffer.indexOf("\x03") >= 0) {
      let newMessages = this.msgBuffer.split("\x03");
      for (let i = 0; i < newMessages.length; i++) {
          // not last message
          if (i < newMessages.length - 1) {
            this.handleMsg(newMessages[i]);
          }
          // last complete message
          else if (completeMsgs) {
            this.handleMsg(newMessages[i]);
            this.msgBuffer = "";
          } 
          // last incomplete message  
          else {
              this.msgBuffer = newMessages[i];
          }
      }
  }
  }

  handleMsg(msg: string): void {
    // Check if msg empty.
    if (msg.length > 0) {
      msg = msg.replace(/[^\x20-\x7E]/g, "");
      let messageObject = JSON.parse(msg);
      console.log("Parsed JSON ", messageObject);
      if (messageObject.header.type.toUpperCase() == "TELEMETRY") {
        if (messageObject.header.subtype.toUpperCase() === "LIST") {
          // Handle List Message 
        }
        else if (messageObject.header.subtype.toUpperCase() === "STATUS") {
          // Handle Status Message
        }
        else if (messageObject.header.subtype.toUpperCase() === "STATE") {
          // Handle State Message
        }
        else if (messageObject.header.subtype.toUpperCase() === "CONFIG") {
          // Handle Config Message
        }
        else {
          // None of the above
        }
        console.log("Payload : " + messageObject.payload);
      }
    }
  }

  connected(): boolean {
    return this.isConnected;
  }


}
