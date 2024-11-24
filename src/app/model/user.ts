export class Customer {
  username: string;
  email: string;
  password: string;
  role: string;

  constructor() {
    this.username = '';
    this.email = '';
    this.password = '';
    this.role = 'CUSTOMER';
  }
}
