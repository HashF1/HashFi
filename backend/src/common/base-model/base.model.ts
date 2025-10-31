import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type BaseDocument = BaseModel & Document;

@Schema()
export class BaseModel {
  
  @Prop({ default: uuidv4 }) 
  id: string;

  @Prop({default: Date.now()})
  createdAt: Date;

  @Prop({default: Date.now()})
  updatedAt: Date;

  @Prop({ default: null })
  deletedAt: Date;
}

export const BaseSchema = SchemaFactory.createForClass(BaseModel);
