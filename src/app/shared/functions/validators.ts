import {AbstractControl, ValidatorFn} from '@angular/forms';

export function validatorCPF(): ValidatorFn {  
    return (control: AbstractControl): { [key: string]: any } | null => {
      const cpf = String(control.value).replace(/\D/g, '')
      if (cpf.length != 11) {
        return {length: 'CPF deve ter 11 digitos'}
      }
      else if (!validaCPF(control.value)) {
        return {cpf: 'CPF inválido'}
      }
      return null
    }
}

function validaCPF(cpf: string): boolean {
    let soma;
    let resto;
    soma = 0;

    if (cpf == "00000000000") return false;

    for (let i: number = 1; i <= 9; i++) 
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);

    resto = (soma * 10) % 11;
    if ((resto == 10) || (resto == 11)) resto = 0;

    if (resto != parseInt(cpf.substring(9, 10)))
        return false;

    soma = 0;
    for (let i: number = 1; i <= 10; i++) 
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);

    resto = (soma * 10) % 11;
    if ((resto == 10) || (resto == 11)) resto = 0;
    
    if (resto != parseInt(cpf.substring(10, 11))) 
        return false;
    return true;
}
