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

export class Vendor {
  username: string;
  email: string;
  password: string;
  role: string;

  constructor() {
    this.username = '';
    this.email = '';
    this.password = '';
    this.role = 'VENDOR';
  }
}

export class Admin {
  username: string;
  email: string;
  password: string;
  role: string;

  constructor() {
    this.username = '';
    this.email = '';
    this.password = '';
    this.role = 'ADMIN';
  }
}
