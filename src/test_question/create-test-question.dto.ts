import { ApiProperty } from '@nestjs/swagger';

export class CreateTestQuestionDto {
  @ApiProperty({
    description: 'The question text',
    example: 'What is TypeScript?',
    required: true,
    type: String,
  })
  readonly question: string;

  @ApiProperty({
    description: 'Array of possible answer options',
    example: ['A scripting language', 'A superset of JavaScript', 'A database'],
    required: true,
    type: [String],
  })
  readonly options: string[];

  @ApiProperty({
    description: 'Index of the correct answer in the options array',
    example: 1,
    required: true,
    type: Number,
  })
  readonly correctAnswer: number;

  @ApiProperty({
    description: 'The ID of the lesson this question belongs to',
    example: '687dfbe86be859bf15944438',
    required: true,
    type: String,
  })
  readonly lessonId: string;
}