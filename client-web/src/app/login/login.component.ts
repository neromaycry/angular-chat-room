import { Component, OnInit } from '@angular/core';
import { ChatSocketService } from '../core/services/chat.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../core/store/app.state';
import { login } from '../core/store/login/login.actions';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	username = new FormControl('');

	constructor(
		private store: Store<AppState>,
		private router: Router,
		private chatSocketService: ChatSocketService
	) {}

	sendMsg() {
		this.chatSocketService.sendMessage('send', '发送一个消息');
	}

	login() {
		if (this.username.value) {
			this.chatSocketService.sendMessage('login', {
				username: this.username.value,
			});
		}
	}

	ngOnInit(): void {
		this.chatSocketService.getMessage('loginFail').subscribe((data) => {
			console.log(data);
			alert(data);
		});
		this.chatSocketService.getMessage('loginSuccess').subscribe((data) => {
			console.log(data);
			this.store.dispatch(login({ user: { username: data.username } }));
			this.router.navigate(['/chat']);
		});
	}
}
