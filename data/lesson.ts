export interface Lesson {
  id: string;
  title: string;
  teachingDate?: string;
  facilitator?: string;
  description?: string;
  [key: string]: any;
}
