import { LoginState, loginFeatureKey } from './login/login.reducer';
import { ChatState, chatFeatureKey } from './chat/chat.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface AppState {
	login: LoginState;
	chat: ChatState;
}

export const selectLogin = createFeatureSelector<AppState, LoginState>(
	loginFeatureKey
);
export const selectChat = createFeatureSelector<AppState, ChatState>(
	chatFeatureKey
);

export const selectUser = createSelector(
	selectLogin,
	(state: LoginState) => state.user
);

export const selectMessages = createSelector(
	selectChat,
	(state: ChatState) => state.messages
);
