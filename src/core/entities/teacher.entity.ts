


export class Teacher {

  constructor(
    public id: number,
    public name: string,
    public surname: string,
    public email: string
  ){}

}

export interface TeacherPaginated {
  total: number;
  teachers: Teacher[];
}