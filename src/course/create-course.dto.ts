import { IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CourseLesson } from 'src/schema/course_lesson.schema'; // Adjust path as needed

// Optional: Define a DTO for CourseLesson if needed for API input
export class CourseLessonDto {
  @ApiProperty({
    description: 'The title of the lesson',
    example: 'Introduction to TypeScript Basics',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The content or description of the lesson',
    example: 'Learn the basics of TypeScript syntax and types.',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  // Add other properties as defined in your CourseLesson schema
}

// Main DTO for creating a course
export class CreateCourseDto {
  @ApiProperty({
    description: 'The title of the course',
    example: 'Introduction to TypeScript',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'A brief description of the course',
    example: 'A beginner-friendly course on TypeScript fundamentals.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'URL or path to the course cover image',
    example: 'https://example.com/images/typescript-course.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  coverImage?: string;

  @ApiProperty({
    description: 'List of lessons in the course',
    type: [CourseLessonDto],
    example: [
      { title: 'Introduction to TypeScript Basics', content: 'Learn the basics of TypeScript syntax and types.' },
      { title: 'Advanced TypeScript Features', content: 'Explore advanced types and interfaces.' },
    ],
    required: false,
  })
  
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CourseLessonDto)
  lessons?: CourseLessonDto[];

  @ApiProperty({
    description: 'The ID of the user who authored the course (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439011',
  })
  @IsMongoId()
  @IsNotEmpty()
  author: string; // MongoDB ObjectId as string
}