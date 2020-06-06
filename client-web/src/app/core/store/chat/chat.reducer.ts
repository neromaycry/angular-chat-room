import { Message } from '../../models/message';
import { createReducer, on, State, Action } from '@ngrx/store';
import * as chatActions from './chat.actions';

export const chatFeatureKey = 'chat';

export interface ChatState {
	messages: Message[];
}

export const initialState = {
	messages: [],
};

const chatReducer = createReducer(
	initialState,
	on(chatActions.addMessage, (state, { message }) => ({
		messages: [...state.messages, message],
	}))
);

export function reducer(state: ChatState | undefined, action: Action) {
	return chatReducer(state, action);
}
