

export interface ClassesReponses {
  classes: ClassResult[];
  total:   number;
}

export interface ClassResult {
  id:          number;
  name:        string;
  description: string;
  teacher:     Teacher | null;
}

export interface Teacher {
  id:      number;
  name:    string;
  surname: string;
  email:   string;
}
