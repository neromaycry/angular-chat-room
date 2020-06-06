import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user';

export const login = createAction(
	'[Login] Login',
	props<{ user: User }>()
);
