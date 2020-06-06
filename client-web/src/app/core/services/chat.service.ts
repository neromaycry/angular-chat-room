import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable()
export class ChatSocketService extends Socket {
	constructor() {
		super({ url: 'http://localhost:8080', options: {} });
	}

	sendMessage(msgType: string, payload: any) {
		this.emit(msgType, payload);
	}

	getMessage(msgType: string): Observable<any> {
		return this.fromEvent(msgType);
	}
}
