import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatSocketService } from '../core/services/chat.service';
import { Store } from '@ngrx/store';
import { AppState, selectUser, selectMessages } from '../core/store/app.state';
import { addMessage } from '../core/store/chat/chat.actions';
import { MsgType } from '../core/enums/msg-type.enum';
import { User } from '../core/models/user';
import { Subscription, Observable } from 'rxjs';
import { Message } from '../core/models/message';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
	user: User;

	userSpt: Subscription;

	messages$: Observable<Message[]>;

	messageText = new FormControl('');

	constructor(
		private store: Store<AppState>,
		private router: Router,
		private chatSocketService: ChatSocketService
	) {
		this.userSpt = this.store.select(selectUser).subscribe((user) => {
			this.user = user;
			if (!this.user) {
				this.router.navigate(['./login']);
			}
		});

		this.messages$ = this.store.select(selectMessages);
	}

	ngOnInit(): void {
		this.chatSocketService.getMessage('receiveMessage').subscribe((data) => {
			console.log(data);
			this.store.dispatch(
				addMessage({
					message: {
						type: MsgType.User,
						content: data.content,
						user: data.user,
					},
				})
			);
		});

		this.chatSocketService.getMessage('add').subscribe((data) => {
			console.log(data);
			this.store.dispatch(
				addMessage({
					message: {
						type: MsgType.System,
						content: `${data}加入了群聊`,
						user: this.user,
					},
				})
			);
		});

		this.chatSocketService.getMessage('leave').subscribe((data) => {
			console.log(data);
		});
	}

	ngOnDestroy(): void {
		this.userSpt.unsubscribe();
	}

	sendMessage() {
		if (this.messageText.value) {
			this.chatSocketService.sendMessage('sendMessage', {
				type: MsgType.User,
				content: this.messageText.value,
				user: this.user,
			});
			this.messageText.setValue('');
		}
	}
}
