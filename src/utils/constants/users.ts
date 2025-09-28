export interface PlayerUser {
	id: number;
	username: string;
	email: string;
}

export const playerUsers: PlayerUser[] = [
	{
		id: 1,
		username: 'playerOne',
		email: 'playerone@example.com',
	},
	{
		id: 2,
		username: 'playerTwo',
		email: 'playertwo@example.com',
	},
	{
		id: 3,
		username: 'playerThree',
		email: 'playerthree@example.com',
	},
];
