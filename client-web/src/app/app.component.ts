import { Component, OnInit } from '@angular/core';
import { ChatSocketService } from './core/services/chat.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	constructor(private chatSocketService: ChatSocketService) {}

	ngOnInit(): void {
		this.chatSocketService.getMessage('getMsg').subscribe((data) => {
			console.log(data);
		});

		this.chatSocketService.getMessage('add').subscribe((data) => {
			console.log(data);
			console.log('。。。加入了群聊');
		});
	}
}
