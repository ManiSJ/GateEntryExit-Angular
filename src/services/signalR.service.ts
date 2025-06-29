import { Injectable } from "@angular/core";
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private hubConnection !: signalR.HubConnection

    gateCreationSignalR : BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
    gateCreationSignalR$ = this.gateCreationSignalR.asObservable();

    constructor() {
        this.createSignalR();
    }

    createSignalR(){
        this.create_singalR();
        this.start_signalR();
        this.close_signalR();
        this.reconnecting_signalR();
        this.reconnected_signalR();
    }

    create_singalR(){
      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl('https://localhost:5085/signalRHub', {
            accessTokenFactory: () => {
                // Get JWT token from localStorage or another secure place
                return localStorage.getItem('access_token') || '';
            }
        })
        .withAutomaticReconnect()
        .build();
    }

    start_signalR(){
        this.hubConnection
            .start()
            .then(() => {
                console.log('SignalR connected');
                this.addGateCreatedMessageListener();
            })
            .catch(err => console.error('SignalR connection error:', err));
    }

    close_signalR(){
        this.hubConnection.onclose((error) => {
            console.log('SignalR reconnecting', error);
        })
    }

    reconnecting_signalR(){
        this.hubConnection.onreconnecting((error) => {
            console.log('SignalR reconnecting', error);
        })
    }

    reconnected_signalR(){
        this.hubConnection.onreconnected((connectionId) => {
            console.log('SignalR reconnected');
        })
    }

    stop_signalR(){
        if(this.hubConnection)
            this.hubConnection.stop();
    }

    // from server
    addGateCreatedMessageListener(): void {
        this.hubConnection.on('GateCreated', (data : any) => {
            this.gateCreationSignalR.next(data);
        });
    }

    // to server
    sendMessage(user: string, message: string): void {
        this.hubConnection.invoke('SendMessage', user, message)
            .catch(err => console.error('SignalR send error:', err));
    }
}