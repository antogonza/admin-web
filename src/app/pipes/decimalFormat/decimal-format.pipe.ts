import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimalFormat',
  standalone: true,
})
export class DecimalFormatPipe implements PipeTransform {

  transform(value: number): string {
    // Formatear el número a dos decimales
    let formattedValue = value.toFixed(2);
    // Reemplazar el punto por la coma
    return formattedValue.replace('.', ',');
  }

}
