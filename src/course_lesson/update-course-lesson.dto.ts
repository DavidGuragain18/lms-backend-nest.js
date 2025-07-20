import { ApiProperty } from '@nestjs/swagger';
import { 
  IsString, 
  IsOptional, 
  IsNumber, 
  Min, 
  MinLength, 
  IsArray, 
  IsNotEmpty, 
  ArrayMinSize, 
  ValidateIf,
  IsInt
} from 'class-validator';

export class UpdateCourseLessonDto {
  @ApiProperty({ 
    required: true,
    example: 'Advanced TypeScript Patterns',
    description: 'Title of the lesson'
  })
  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  readonly title?: string;

  @ApiProperty({ 
    required: true,
    example: 'Deep dive into advanced TypeScript concepts and patterns',
    description: 'Detailed description of the lesson'
  })
  @IsOptional()
  @IsString()
  @MinLength(10, { message: 'Description must be at least 10 characters long' })
  readonly description?: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
    description: 'PDF file for the lesson (optional)'
  })
  @IsOptional()
  readonly pdfUrl?: any;

  @ApiProperty({ 
    required: true, 
    type: Number,
    example: 15,
    description: 'Number of pages in the lesson',
    minimum: 1
  })
  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(1, { message: 'Pages must be at least 1' })
  readonly pages?: number;

  @ApiProperty({ 
    required: true, 
    type: Number,
    example: 30,
    description: 'Estimated reading duration in minutes',
    minimum: 1
  })
  @IsOptional()
  @IsNumber()
  @Min(1, { message: 'Reading duration must be at least 1 minute' })
  readonly readingDuration?: number;

  @ApiProperty({ 
    required: true, 
    type: [String],
    example: ['TypeScript', 'Design Patterns'],
    description: 'Array of keywords for the lesson'
  })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1, { message: 'Keywords array cannot be empty if provided' })
  @IsString({ each: true, message: 'Each keyword must be a string' })
  readonly keywords?: string[];
}