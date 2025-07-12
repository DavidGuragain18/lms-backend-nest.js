import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export enum UserRole {
  ADMIN = 'admin',
  TEACHER = 'teacher',
  STUDENT = 'student',
}

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  image?: string;

  @Prop({
    type: String,
    enum: UserRole,
    default: UserRole.STUDENT, // Default role if not specified
  })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);