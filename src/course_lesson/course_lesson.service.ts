import { HttpCode, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Course, CourseDocument } from 'src/schema/course.schema';
import { CourseLesson, CourseLessonDocument } from 'src/schema/course_lesson.schema';
import { CreateCourseLessonDto } from './create-course-lesson.dto';
import { UpdateCourseLessonDto } from './update-course-lesson.dto';

@Injectable()
export class CourseLessonService {
  constructor(
    @InjectModel(CourseLesson.name)
    private readonly lessonModel: Model<CourseLessonDocument>,
    @InjectModel(Course.name)
    private readonly courseModel: Model<CourseDocument>,
  ) { }

  async create(
    createCourseLessonDto: CreateCourseLessonDto,
    courseId: string,
    pdfUrl: Express.Multer.File,
  ): Promise<CourseLesson> {
    console.log(courseId);

    let pdf: string | null = null;
    pdf = "/course-covers/" + pdfUrl.path;
    console.log("pdf url", pdf);



    // Hardcoded ID for testing
    const hardcodedCourseId = new Types.ObjectId(courseId);


    // 1. Verify the course exists using hardcoded ID
    const course = await this.courseModel.findById(hardcodedCourseId);

    if (!course) {
      throw new NotFoundException('Course not found with hardcoded ID');
    }

    // 2. Create lesson data
    const lessonData = {
      ...createCourseLessonDto,
      course: hardcodedCourseId, // Using the hardcoded ObjectId
      pdfUrl: pdf
    };
    console.log('Lesson data:', lessonData);

    // 3. Create and save lesson
    try {
      const lesson = new this.lessonModel(lessonData);
      const savedLesson = await lesson.save();
      console.log('Saved lesson:', savedLesson);
      return savedLesson;
    } catch (error) {
      console.error('Save error:', error);
      throw error;
    }
  }

  async findAllByCourse(courseId: string): Promise<CourseLesson[]> {
    const course = await this.courseModel.findById(courseId).populate('lessons');
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return course.lessons as CourseLesson[];
  }

  async findOne(id: string): Promise<CourseLesson> {
    const lesson = await this.lessonModel.findById(id);
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }
    return lesson;
  }


  async update(
    lessonId: string,
    updateCourseLessonDto: UpdateCourseLessonDto,
    pdfUrl?: Express.Multer.File
  ): Promise<CourseLesson> {
    // Determine PDF path if a new file is uploaded
    let updatedFields: any = { ...updateCourseLessonDto };

    if (pdfUrl) {
      updatedFields.pdfUrl = "/course-covers/" + pdfUrl.filename;
    }

    // Hardcoded ID for testing
    const hardcodedLessonId = new Types.ObjectId(lessonId);

    const lesson = await this.lessonModel.findByIdAndUpdate(hardcodedLessonId, updatedFields, { new: true } );

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    return lesson;
  }


  async remove(id: string): Promise<{ deleted: boolean; message?: string }> {
    // Find the lesson to get the course reference
    const lesson = await this.lessonModel.findByIdAndDelete(id);
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    // Remove the lesson reference from the course
    await this.courseModel.findByIdAndUpdate(
      lesson.course,
      { $pull: { lessons: lesson._id } },
    );

    return { deleted: true };
  }
}