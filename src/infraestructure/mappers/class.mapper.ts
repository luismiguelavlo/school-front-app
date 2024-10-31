import { Classes } from '../../core/entities/classes.entity';
import { ClassResponse } from '../interfaces/class.interface';


export class ClassMapper {

  static fromClassResponseToEntity(classResponse: ClassResponse) {
    return new Classes(
      classResponse.id,
      classResponse.name,
      classResponse.description,
      `${classResponse?.teacher?.name} ${classResponse?.teacher?.surname}`,
    )
  }
}