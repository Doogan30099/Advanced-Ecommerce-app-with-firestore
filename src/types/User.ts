export interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  age: number;
  address: string;
  city: string;
  state: string;
  zipcode: string;
}

export class User {
  id: string;
  name: string;
  username: string;
  password: string;
  email: string;
  age: number;
  address: string;
  city: string;
  state: string;
  zipcode: string;

  constructor(
    id: string,
    name: string,
    username: string,
    password: string,
    email: string,
    age: number,
    address: string,
    city: string,
    state: string,
    zipcode: string
  ) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.password = password;
    this.email = email;
    this.age = age;
    this.address = address;
    this.city = city;
    this.state = state;
    this.zipcode = zipcode;
  }

  checkPassword(input: string): boolean {
    return this.password === input;
  }

  toFirestore(): UserProfile {
    return {
      id: this.id,
      name: this.name,
      username: this.username,
      email: this.email,
      age: this.age,
      address: this.address,
      city: this.city,
      state: this.state,
      zipcode: this.zipcode,
    };
  }
}
