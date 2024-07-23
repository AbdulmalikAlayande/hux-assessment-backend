export interface IUser extends Document {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	phoneNumber: string;
	salt?: string;
}
