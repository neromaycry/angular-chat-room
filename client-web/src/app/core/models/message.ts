import { User } from './user';

export interface Message {
	type: number;
	content: string;
	user: User;
}
