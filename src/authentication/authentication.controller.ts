import { Body, Controller, Post, HttpCode, HttpStatus, UseInterceptors, UploadedFile, Put } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';  // Correct relative path
import { ApiTags, ApiResponse, ApiOperation, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { RegisterDto } from './register.dto';
import { LoginDto } from './login.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';
import { UpdateUserDto } from './update-user.dto';

@ApiTags('Authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: RegisterDto })
  @UseInterceptors(FileInterceptor("image", multerOptions))
  @ApiResponse({ 
    status: 201, 
    description: 'User successfully registered' 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Email already in use' 
  })
  async register(@Body() registerDto: RegisterDto, @UploadedFile() image?: Express.Multer.File) {
    return this.authService.register({...registerDto, file: image}, );
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login existing user' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ 
    status: 200, 
    description: 'User successfully logged in' 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Invalid credentials' 
  })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Put('me')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateUserDto })
  @UseInterceptors(FileInterceptor('file', multerOptions))
  @ApiOperation({ summary: 'Update user profile' })
  @ApiResponse({ status: 200, description: 'Profile updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateProfile(
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.authService.updateUserProfile(
      updateUserDto.name,
      file,
    );
  }
}
