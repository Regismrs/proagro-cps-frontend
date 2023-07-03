import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pattern'
})
export class PatternPipe implements PipeTransform {

  transform(value: string, pattern: string): string {
    let i = 0;
    const v = value.toString();
    return pattern.replace(/#/g, _ => v[i++]);
  }

}
