type User = {
  id: string;
  username: string;
  password?: string;
  name: string;
  email: string;
  age: number;
  address: Address;
};

type Address = {
  street: string;
  city: string;
  state: string;
  zipcode: string;
};
