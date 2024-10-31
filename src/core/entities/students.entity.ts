

export class Student {
  constructor(
    public id: number,
    public name: string,
    public surname: string,
    public email: string,
  ){}
}


export interface StudentsPaginated {
  students: Student[];
  total: number;
}