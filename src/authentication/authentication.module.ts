import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { User, UserSchema } from '../schema/user.schema';  // Correct path

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'your-secret-key', // Always use env variables in production
      privateKey: "private",
      signOptions: { expiresIn: '1d' }, // Token expires in 1 day
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),    
  ],
  providers: [AuthenticationService, JwtService],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}