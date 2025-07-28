import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { request } from 'http';
import { Model, Types } from 'mongoose';
import { Course, CourseDocument } from 'src/schema/course.schema';
import { CourseEnrollmentDocument } from 'src/schema/course_enrollment.schema';
import { Notification, NotificationDocument, NotificationStatus, NotificationType } from 'src/schema/notification.schema';
import { User } from 'src/schema/user.schema';


@Injectable()
export class NotificationService {
    constructor(
        @InjectModel(Notification.name)
        private notificationModel: Model<NotificationDocument>,
        @InjectModel(Course.name)
        private courseModel: Model<CourseDocument>,
        @InjectModel(Course.name)
        private courseEnrollmentModel: Model<CourseEnrollmentDocument>,
        @Inject(REQUEST) private request: Request,
    ) { }

    async createNotification(
        title: string,
        body: string,
        type: NotificationType = NotificationType.SYSTEM,
        data?: Record<string, any>,
        imageUrl?: string,
        actionUrl?: string
    ): Promise<NotificationDocument> {
        const notification = new this.notificationModel({
            title,
            body,
            type,
            status: NotificationStatus.SENT,
            isRead: false,
            data,
            imageUrl,
            actionUrl
        });

        return notification.save();
    }

async createTestNotification({
  courseId,
  title,
  body,
  image,
  status,
  type
}: {
  courseId: string,
  title: string,
  body: string,
  image?: string,
  status: NotificationStatus,
  type: NotificationType
}): Promise<NotificationDocument> {
  // 1. Validate course exists
  const courseExists = await this.courseModel.exists({ _id: courseId });
  if (!courseExists) {
    throw new NotFoundException('Course not found');
  }

  // 2. Get enrolled users (or use test recipients in development)
  let recipients: Types.ObjectId[];
  if (process.env.NODE_ENV === 'production') {
    const enrollments = await this.courseEnrollmentModel.find({ course: courseId });
    recipients = enrollments.map(e => e.studentId);
  } else {
    recipients = [new Types.ObjectId()]; // Test recipient
  }

  if (recipients.length === 0) {
    throw new BadRequestException('No recipients found for this course');
  }

  const notification = await this.notificationModel.create({
    recipients: recipients,
    title,
    body,
    type,
    status,
    isRead: false,
    data: {courseId},
    readAt: null // Explicitly set to null initially
  })

  return notification;
}


    async getNotificationById(id: string): Promise<NotificationDocument> {
        const notification = await this.notificationModel.findById(id).exec();
        if (!notification) {
            throw new NotFoundException('Notification not found');
        }
        return notification;
    }

async getUserNotifications(): Promise<NotificationDocument[]> {
    const userId = this.request.user.sub; // Get authenticated user's ID

    console.log('User ID:', userId);
    
    
    const notifications = await this.notificationModel
        .find({
            $or: [
                { recipients: new Types.ObjectId(userId) }, // User is in recipients array
                { recipients: null }               // OR recipients is null (public)
            ]
        })
        .sort({ createdAt: -1 }) // Newest first
        .populate('recipients')  // Optional: populate recipient details
        .exec();

        console.log('Notifications found:', notifications);
        

        return notifications;
}

    async getUnreadNotificationsCount(
        userId: Types.ObjectId | string
    ): Promise<number> {
        return this.notificationModel
            .countDocuments({
                recipient: userId,
                isRead: false
            })
            .exec();
    }

    async markAsRead(
        notificationId: string
    ): Promise<NotificationDocument> {
        const updatedNotification = await this.notificationModel.findByIdAndUpdate(
            notificationId,
            {
                isRead: true,
                readAt: new Date(),
                status: NotificationStatus.READ
            },
            { new: true }
        ).exec();

        if (!updatedNotification) {
            throw new NotFoundException(`Notification with ID ${notificationId} not found`);
        }

        return updatedNotification;
    }

    async markAllAsRead(
        userId: Types.ObjectId | string
    ): Promise<{ modifiedCount: number }> {
        const result = await this.notificationModel.updateMany(
            { recipient: userId, isRead: false },
            {
                isRead: true,
                readAt: new Date(),
                status: NotificationStatus.READ
            }
        ).exec();

        return { modifiedCount: result.modifiedCount };
    }

    async updateNotificationStatus(
        notificationId: string,
        status: NotificationStatus
    ): Promise<NotificationDocument> {
        const updated = await this.notificationModel.findByIdAndUpdate(
            notificationId,
            { status },
            { new: true }
        ).exec();

        if (!updated) {
            throw new NotFoundException('Notification not found');
        }

        return updated;
    }

    async deleteNotification(notificationId: string): Promise<boolean> {
        const result = await this.notificationModel
            .deleteOne({ _id: notificationId })
            .exec();

        return result.deletedCount > 0;
    }

    async getNotificationsByType(
        userId: Types.ObjectId | string,
        type: NotificationType,
        limit: number = 10
    ): Promise<NotificationDocument[]> {
        return this.notificationModel
            .find({ recipient: userId, type })
            .sort({ createdAt: -1 })
            .limit(limit)
            .exec();
    }

    async searchNotifications(
        userId: Types.ObjectId | string,
        searchTerm: string,
        limit: number = 10
    ): Promise<NotificationDocument[]> {
        return this.notificationModel
            .find({
                recipient: userId,
                $or: [
                    { title: { $regex: searchTerm, $options: 'i' } },
                    { body: { $regex: searchTerm, $options: 'i' } }
                ]
            })
            .sort({ createdAt: -1 })
            .limit(limit)
            .exec();
    }
}