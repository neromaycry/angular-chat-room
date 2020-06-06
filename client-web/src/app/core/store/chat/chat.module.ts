import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import * as fromChat from './chat.reducer';

@NgModule({
	imports: [
		StoreModule.forFeature(fromChat.chatFeatureKey, fromChat.reducer),
	],
})
export class ChatModule {}
