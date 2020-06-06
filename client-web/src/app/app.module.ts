import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { ChatSocketService } from './core/services/chat.service';
import { StoreModule } from '@ngrx/store';
import { LoginModule } from './core/store/login/login.module';
import { ChatModule } from './core/store/chat/chat.module';

@NgModule({
	declarations: [AppComponent, LoginComponent, ChatComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule,
		StoreModule.forRoot({}),
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: false,
			features: {
				pause: false,
				lock: true,
				persist: true,
			},
		}),
		LoginModule,
		ChatModule,
	],
	providers: [ChatSocketService],
	bootstrap: [AppComponent],
})
export class AppModule {}
