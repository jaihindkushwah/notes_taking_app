export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface INote {
  id: string;
  title: string;
  body?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
