

export class Classes {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public teacher?: string | null,
  ){}
}

export interface PaginatedClasses {
  total: number;
  classes: Classes[];
}