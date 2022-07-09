import { Document } from 'mongoose';

export class BaseModel extends Document {
  id: string;

  createdAt: Date;

  updatedAt: Date;
}
