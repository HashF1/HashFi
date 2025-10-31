import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseModel, BaseSchema } from '../../common/base-model/base.model';

export type UserDocument = User & Document;

@Schema()
export class User extends BaseModel {
  @Prop({ default: '', required: true})
  walletAddress: string;

  @Prop({ default: '', required: true})
  username: string;

  @Prop({ default: 'defi-user-avatar.png'})
  avatar: string;

  @Prop({ default: 0 })
  reputationScore: Number;

  @Prop({ default: 'Elite'})
  reputationLevel: string;

  @Prop({ default: 0 })
  successRate: Number;

  @Prop({ default: 0 })
  daysActive: Number;

  @Prop({ default: 'MetaMask'})
  walletType: string;

  @Prop({ default: 'Hedera'})
  chain: string;

  @Prop({ default: '', required: false})
  ipAddress: string;

  @Prop({ default: 'Active'})
  connectionStatus: string;

  @Prop({ maxlength: 20, default: Date.now()})
  lastConnectedAt: Date;
  
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.add(BaseSchema);