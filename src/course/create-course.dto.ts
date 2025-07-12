// create-course.dto.ts
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CourseLesson } from 'src/schema/course_lesson.schema';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  coverImage?: string;

  @IsArray()
  @IsOptional()
  lessons?: CourseLesson[];

  @IsString()
  @IsNotEmpty()
  author: string; // This should be the user ID
}


