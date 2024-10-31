export interface TeacherResponses {
  teachers: TeacherResult[];
  total:    number;
}

export interface TeacherResult {
  id:      number;
  name:    string;
  surname: string;
  email:   string;
}
