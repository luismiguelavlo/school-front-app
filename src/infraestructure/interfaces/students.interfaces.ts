
export interface StudentsResponses {
  students: StudentResult[];
  total:    number;
}

export interface StudentResult {
  id:      number;
  name:    string;
  surname: string;
  email:   string;
}
