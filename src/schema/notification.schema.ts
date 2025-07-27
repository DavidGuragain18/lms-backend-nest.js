import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { User } from './user.schema';

export enum NotificationType {
  SYSTEM = 'system',
  MESSAGE = 'message',
  ALERT = 'alert',
  PROMOTIONAL = 'promotional',
  TEST = "test"
}

export enum NotificationStatus {
  SENT = 'sent',
  DELIVERED = 'delivered',
  READ = 'read',
  FAILED = 'failed',
}

@Schema({ timestamps: true })
export class Notification {
  @Prop({
    type: [{
      type: Types.ObjectId,
      ref: 'User'
    }],
    required: true
  })
  recipients: User[];  // Changed from recipient (singular) to recipients (plural)

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  body: string;

  @Prop({ type: Object, default: {} })
  data?: Record<string, any>;

  @Prop({
    type: String,
    enum: NotificationType,
    default: NotificationType.SYSTEM
  })
  type: NotificationType;

  @Prop({
    type: String,
    enum: NotificationStatus,
    default: NotificationStatus.SENT
  })
  status: NotificationStatus;

  @Prop({ type: Boolean, default: false })
  isRead: boolean;

  @Prop({ type: Date })
  readAt?: Date;

  @Prop({ type: String })
  imageUrl?: string;

  @Prop({ type: String })
  actionUrl?: string;
}

export type NotificationDocument = HydratedDocument<Notification>;
export const notificationSchema = SchemaFactory.createForClass(Notification);