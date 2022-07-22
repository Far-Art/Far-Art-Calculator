import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  numericSymbols = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

  operationSymbols = ['+', '-', '*', '/'];

  formula: string = '200 - 100 / 2 + 10 / 2 - 10'; // 145

  constructor() {
  }

  appendSymbol(symbol: string) {

  }

  removeLastSymbol(): void {
    this.formula = this.formula.slice(0, this.formula.length - 1);
  }

  clearFormula(): void {
    this.formula = '';
  }

  calculate(): string {
    console.log(this.formula.split('+'));
    return '';
  }
}
