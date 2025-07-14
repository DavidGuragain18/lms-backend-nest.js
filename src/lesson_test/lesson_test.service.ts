import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CourseTest, CourseTestDocument } from 'src/schema/course.test.schema';
import { CourseLesson, CourseLessonDocument } from 'src/schema/course_lesson.schema';
import { CreateTestDto } from './create-test.dto';
import { UpdateTestDto } from './update-test.dto';

@Injectable()
export class LessonTestService {
  constructor(
    @InjectModel(CourseTest.name) 
    private readonly testModel: Model<CourseTestDocument>,
    @InjectModel(CourseLesson.name) 
    private readonly lessonModel: Model<CourseLessonDocument>,
  ) {}

  async create(createTestDto: CreateTestDto): Promise<CourseTest> {
    // Verify the lesson exists
    const lesson = await this.lessonModel.findById(createTestDto.lesson);
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    // Create the test
    const test = new this.testModel(createTestDto);
    const savedTest = await test.save();

    // Update lesson with test reference
    await this.lessonModel.findByIdAndUpdate(
      createTestDto.lesson,
      { $push: { tests: savedTest._id } },
      { new: true },
    );

    return savedTest;
  }

  async findAllByLesson(lessonId: string): Promise<CourseTest[]> {
    const lesson = await this.lessonModel.findById(lessonId).populate('tests');
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }
    return lesson.tests as CourseTest[];
  }

  async findOne(id: string): Promise<CourseTest> {
    const test = await this.testModel.findById(id).populate('lesson');
    if (!test) {
      throw new NotFoundException('Test not found');
    }
    return test;
  }

  async update(id: string, updateTestDto: UpdateTestDto): Promise<CourseTest> {
    const test = await this.testModel.findByIdAndUpdate(
      id,
      updateTestDto,
      { new: true },
    ).populate('lesson');
    
    if (!test) {
      throw new NotFoundException('Test not found');
    }
    return test;
  }

  async remove(id: string): Promise<{ deleted: boolean; message?: string }> {
    // Find the test to get lesson reference
    const test = await this.testModel.findByIdAndDelete(id);
    if (!test) {
      throw new NotFoundException('Test not found');
    }

    // Remove test reference from lesson
    await this.lessonModel.findByIdAndUpdate(
      test.lesson,
      { $pull: { tests: test._id } },
    );

    return { deleted: true, message: 'Test deleted successfully' };
  }

  async validateAnswer(testId: string, questionIndex: number, answerIndex: number): Promise<boolean> {
    const test = await this.testModel.findById(testId);
    if (!test) {
      throw new NotFoundException('Test not found');
    }

    if (questionIndex >= test.testQuestions.length || questionIndex < 0) {
      throw new NotFoundException('Question not found');
    }

    return test.testQuestions[questionIndex].correctAnswer === answerIndex;
  }
}