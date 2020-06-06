import { createReducer, on, Action } from '@ngrx/store';
import * as LoginActions from './login.actions';
import { User } from '../../models/user';

export const loginFeatureKey = 'login';

export interface LoginState {
	user: User;
}

export const initialState: LoginState = {
	user: null,
};

const loginReducer = createReducer(
	initialState,
	on(LoginActions.login, (state, { user }) => ({ user: user }))
);

export function reducer(state: LoginState | undefined, action: Action) {
	return loginReducer(state, action);
}
