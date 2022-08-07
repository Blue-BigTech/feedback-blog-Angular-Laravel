export class User {
    _id?: any;
	  avatar?: string;
	  fname?: string;
	  lname?: string;
	  email?: string;
    email_verif_status?: boolean;
	  role?: string;
    badge?: string;

    displayName!: string;
    workType!: string;

	  password?: string;
	  token!: string;
    created_at!: Date;
}
