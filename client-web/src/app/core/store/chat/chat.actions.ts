import { createAction, props } from '@ngrx/store';
import { Message } from '../../models/message';

export const addMessage = createAction(
    '[Chat] Add Message',
    props<{message: Message}>()
)