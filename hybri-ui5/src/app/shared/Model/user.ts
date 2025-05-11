import { Deserializable } from '../interfaces/deserializable';

// export class User implements Deserializable {
//   id?: number;
//   name: string = '';
//   email: string = '';
//   phone: string = '';
//   created_at?: string;
//   updated_at?: string;

//   deserialize(input: any): this {
//     if (input) {
//       Object.assign(this, input);
//     }
//     return this;
//   }

//   toOdata(): Object {
//     return {
//       ...this,
//       created_at: undefined,
//       updated_at: undefined,
//     };
//   }
// }
export class User implements Deserializable {
  id?: number;
  name: string = '';
  email: string = '';
  phone: string = '';
  created_at?: string;
  updated_at?: string;
  is_active?: boolean; // Add is_active to match the filter query

  deserialize(input: any): this {
    if (!input) {
      return this;
    }
    this.id = input.id ?? this.id;
    this.name = input.name ?? this.name;
    this.email = input.email ?? this.email;
    this.phone = input.phone ?? this.phone;
    this.created_at = input.created_at ?? this.created_at;
    this.updated_at = input.updated_at ?? this.updated_at;
    this.is_active = true;

    return this;
  }

  toOdata(): Object {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      is_active: this.is_active,
      created_at: undefined,
      updated_at: undefined,
    };
  }
}
