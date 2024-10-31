export interface StudentsInClassReponses {
  id:      number;
  student: StudentInClassResult;
}

export interface StudentInClassResult {
  id:      number;
  name:    string;
  surname: string;
  email:   string;
}
