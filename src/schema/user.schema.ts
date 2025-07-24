import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export enum UserRole {
  ADMIN = 'admin',
  TEACHER = 'teacher',
  STUDENT = 'student',
}

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
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

  @Prop({ type: [{ type: Types.ObjectId, ref: 'CourseEnrollment' }], default: [] })
  enrollments?: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);