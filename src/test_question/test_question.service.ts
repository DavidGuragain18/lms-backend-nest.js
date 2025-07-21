import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTestQuestionDto } from './create-test-question.dto';
import { UpdateTestQuestionDto } from './update-test-question.dto';
import { Types } from 'mongoose';
import { TestQuestion, TestQuestionDocument } from 'src/schema/course.test.schema';

@Injectable()
export class TestQuestionService {
  constructor(
    @InjectModel(TestQuestion.name) private testQuestionModel: Model<TestQuestionDocument>,
  ) {}

  async create(createTestQuestionDto: CreateTestQuestionDto): Promise<TestQuestion> {
    const createdTestQuestion = new this.testQuestionModel(createTestQuestionDto);
    return createdTestQuestion.save();
  }

  async findAll(): Promise<TestQuestion[]> {
    return this.testQuestionModel.find().exec();
  }

  async findOne(id: string): Promise<TestQuestion> {
    let testQuestion;
    try {
      testQuestion = await this.testQuestionModel.findById(new Types.ObjectId(id)).exec();
    } catch (error) {
      throw new NotFoundException('Invalid test question ID format');
    }
    if (!testQuestion) {
      throw new NotFoundException(`Test question with ID ${id} not found`);
    }
    return testQuestion;
  }

  async update(id: string, updateTestQuestionDto: UpdateTestQuestionDto): Promise<TestQuestion> {
    let testQuestion;
    try {
      testQuestion = await this.testQuestionModel.findByIdAndUpdate(
        new Types.ObjectId(id),
        { $set: updateTestQuestionDto },
        { new: true, runValidators: true },
      ).exec();
    } catch (error) {
      throw new NotFoundException('Invalid test question ID format');
    }
    if (!testQuestion) {
      throw new NotFoundException(`Test question with ID ${id} not found`);
    }
    return testQuestion;
  }

  async remove(id: string): Promise<void> {
    let testQuestion;
    try {
      testQuestion = await this.testQuestionModel.findByIdAndDelete(new Types.ObjectId(id)).exec();
    } catch (error) {
      throw new NotFoundException('Invalid test question ID format');
    }
    if (!testQuestion) {
      throw new NotFoundException(`Test question with ID ${id} not found`);
    }
  }
}