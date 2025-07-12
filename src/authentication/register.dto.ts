import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'User email address',
    required: true
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Password@123',
    description: 'User password (min 8 characters)',
    minLength: 8,
    required: true
  })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'User full name',
    required: true
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'https://example.com/avatar.jpg',
    description: 'URL to user profile image',
    required: false
  })
  @IsString()
  @IsOptional()
  image?: string;
}