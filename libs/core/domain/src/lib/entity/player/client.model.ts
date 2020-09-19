import { Entity } from './../entity';

export interface ClientModel extends Entity {
  id: string;
  name: string;
  room: string;
}
