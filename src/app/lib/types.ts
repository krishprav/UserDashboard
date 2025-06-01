// lib/types.ts

export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: {
      city: string;
      street: string;
      zipcode: string;
    };
}
export type UserFormData = {
    name: string;
    email: string;
    street: string;
    city: string;
    zip: string;
};