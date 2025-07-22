import { Module } from '@nestjs/common';
import { GroupChatController } from './group_chat.controller';
import { GroupChatService } from './group_chat.service';

@Module({
  controllers: [GroupChatController],
  providers: [GroupChatService]
})
export class GroupChatModule {}
