import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create.message.dto';
import { Message } from './enitities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly mensajeRepository: Repository<Message>,
  ) {}
  async getAll() {
    return await this.mensajeRepository.find();
  }
  async createMessage(newMessage: CreateMessageDto) {
    const message = new Message();
    message.message = newMessage.message;
    message.nick = newMessage.nick;
    return await this.mensajeRepository.save(message);
  }

  async updateMessage(id: string, messageToUpdate: CreateMessageDto) {
    const update = await this.mensajeRepository.findOne(id);
    update.nick = messageToUpdate.nick;
    update.message = messageToUpdate.message;
    return await this.mensajeRepository.save(update);
  }

  async deleteMessage(id: string) {
    return await this.mensajeRepository.delete(id);
  }
}
