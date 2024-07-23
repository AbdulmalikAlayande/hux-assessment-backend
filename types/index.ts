export interface IUser extends Document {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	phoneNumber: string;
	salt?: string;
}

export interface IContact extends Document {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	createdAt: Date;
	updatedAt: Date;
}
