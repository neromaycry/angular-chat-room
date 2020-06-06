import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import * as fromLogin from './login.reducer';

@NgModule({
	imports: [
		StoreModule.forFeature(fromLogin.loginFeatureKey, fromLogin.reducer),
	],
})
export class LoginModule {}
