import { ApiProperty } from "@nestjs/swagger";
import { 
  IsArray, 
  IsNumber, 
  IsString, 
  Min, 
  MinLength, 
  IsNotEmpty, 
  ArrayMinSize,
  IsStringEach
} from "class-validator";

export class CreateCourseLessonDto {
  @ApiProperty({ required: true, example: 'Introduction to TypeScript' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  readonly title: string;

  @ApiProperty({ required: true, example: 'A beginner-friendly course on TypeScript fundamentals.' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Description must be at least 8 characters long' })
  readonly description: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: true, // Changed to true
    description: 'PDF file for the lesson (required)'
  })
  @IsNotEmpty({ message: 'PDF file is required' })
  readonly pdfUrl: any; // Removed the ? to make it required

  @ApiProperty({ required: true, example: 10 })
  @IsNumber()
  @Min(1, { message: 'Reading duration must be at least 1 minute' })
  readonly readingDuration: number;

  @ApiProperty({ 
    required: true, 
    example: ['TypeScript', 'Programming'],
    type: [String],
    description: 'Array of keywords for the lesson' 
  })
  @IsArray()
  @ArrayMinSize(1, { message: 'At least one keyword is required' })
  @IsString({ each: true, message: 'Each keyword must be a string' })
  readonly keywords: string[];
}