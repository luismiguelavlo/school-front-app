import { Classes } from '../../core/entities/classes.entity';
import { ClassResult } from '../interfaces/classes.interfaces';




export class ClassesMapper {

  static fromClassesResponseToEntity(classes: ClassResult) {
    return new Classes(
      classes.id,
      classes.name,
      classes.description,
    )
  }

}