import { Note } from './note';

export interface ResponseGetData {
  notes: Note[];
  totalPages: number;
}
