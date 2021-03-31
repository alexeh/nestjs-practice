import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';

import { CreateMessageDto } from './dto/create.message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private messageServices: MessagesService) {}
  @Post()
  create(@Body() createMessageDto: CreateMessageDto, @Res() response) {
    return this.messageServices
      .createMessage(createMessageDto)
      .then((message) => {
        response.status(HttpStatus.CREATED).json(message);
      })
      .catch((err) => response.status(HttpStatus.FORBIDDEN).json(err));
  }
  @Get()
  getAll(@Res() response) {
    return this.messageServices
      .getAll()
      .then((messageList) => {
        response.status(HttpStatus.OK).json(messageList);
      })
      .catch((err) => response.status(HttpStatus.FORBIDDEN).json(err));
  }

  @Put(':id')
  update(
    @Body() updateMessageDto: CreateMessageDto,
    @Res() response,
    @Param('id') messageId,
  ) {
    return this.messageServices
      .updateMessage(messageId, updateMessageDto)
      .then((message) => response.status(HttpStatus.OK).json(message))
      .catch((err) => response.status(HttpStatus.FORBIDDEN).json(err));
  }

  @Delete(':id')
  delete(@Res() response, @Param('id') messageId) {
    return this.messageServices
      .deleteMessage(messageId)
      .then((res) => response.status(HttpStatus.OK).json(res))
      .catch((err) => response.status(HttpStatus.FORBIDDEN).json(err));
  }
}
