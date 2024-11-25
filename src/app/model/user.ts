export class User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;

  constructor(role: string) {
    this.id = 0;
    this.username = "";
    this.email = "";
    this.password = "";
    this.role = role;
  }
}

export class Vendor extends User{

  constructor() {
    super("VENDOR");
  }
}

export class Admin extends User{

  constructor() {
    super("ADMIN");
  }
}

export class Customer extends User{

  constructor() {
    super("CUSTOMER");
  }
}
