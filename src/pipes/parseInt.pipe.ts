import {
  PipeTransform,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

@Injectable()
export class ParseInt implements PipeTransform<any> {
  private readonly fieldToParse;

  constructor(field: any) {
    this.fieldToParse = field;
  }

  async transform(value: any) {
    let val: string;
    if (
      this.fieldToParse instanceof Array ||
      this.fieldToParse.constructor === Array ||
      Array.isArray(this.fieldToParse)
    ) {
      this.fieldToParse.forEach(field => {
        if (this.toValidate(value, field)) {
          val = value[field];
          value[field] = parseInt(val);
        } else {
          throw new UnprocessableEntityException(
            'One of the fields is not a number',
          );
        }
      });
    } else {
      val = value[this.fieldToParse];
      if (this.toValidate(value, this.fieldToParse)) {
        value[this.fieldToParse] = parseInt(val);
      } else {
        throw new UnprocessableEntityException('Field is not a number.');
      }
    }

    return value;
  }

  private toValidate(value, field: string): boolean {
    return !isNaN(value[field]);
  }
}
