import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  private resultCache = new Map<string, string>();

  private operationsOrder: string[] = [];

  private static numericSymbols = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  private static firstOrderSymbols = ['*', '/'];

  private static secondOrderSymbols = ['+', '-'];

  private static dot = '.';

  private canAppendDot = true;

  formula: string = '';

  result: string = '';

  constructor() {
  }

  /**
   * appends a symbol to a formula by complex logic
   * @param symbol
   */
  appendSymbol(symbol: string) {
    const isFirstOrderOperation = CalculationService.firstOrderSymbols.includes(symbol);
    const isSecondOrderOperation = CalculationService.secondOrderSymbols.includes(symbol);
    const isDot = CalculationService.dot === symbol;

    // operation symbol cannot be first in string unless it is minus
    if (this.formula.length === 0 && symbol !== '-' && (isFirstOrderOperation || isSecondOrderOperation)) {
      return;
    }

    const lastSymbol = this.formula.charAt(this.formula.length - 1);

    // operation symbol or dot cannot be pressed after dot
    if (lastSymbol === CalculationService.dot && (isFirstOrderOperation || isSecondOrderOperation || isDot)) {
      return;
    }

    // if dot is pressed before number append zero
    if (!CalculationService.numericSymbols.includes(lastSymbol) && isDot) {
      this.formula += '0.';
      this.canAppendDot = false;
      return;
    }

    // if last symbol in formula is operation symbol, replace with new operation symbol
    if ((CalculationService.firstOrderSymbols.includes(lastSymbol) || CalculationService.secondOrderSymbols.includes(lastSymbol)) && (isFirstOrderOperation || isSecondOrderOperation)) {
      this.removeLastSymbol();
      this.formula += symbol;
      return;
    }

    // order symbol occurred
    if (isFirstOrderOperation || isSecondOrderOperation) {
      this.formula += symbol;
      this.canAppendDot = true;
      return;
    }

    // numeric order symbol occurred
    if (CalculationService.numericSymbols.includes(symbol)) {
      this.formula += symbol;
      return;
    }

    // cannot append another dot in number
    if (isDot && this.canAppendDot) {
      this.formula += symbol;
      this.canAppendDot = false;
      return;
    }
  }

  /**
   * remove last symbol in formula
   */
  removeLastSymbol(): void {
    const toRemove = this.formula.charAt(this.formula.length - 1);
    if (CalculationService.dot === toRemove) {
      this.canAppendDot = true;
    }
    this.formula = this.formula.slice(0, this.formula.length - 1);
  }

  /**
   * reset formula and all other values, cache are left untouched
   */
  resetFormula(): void {
    this.formula = '';
    this.result = '';
    this.operationsOrder.length = 0;
    this.canAppendDot = true;
  }

  calculate() {
    try {
      this.correctFormula();
      if (this.resultCache.has(this.formula)) {
        this.result = `${this.resultCache.get(this.formula)}`;
      } else {
        const numbers = this.parseFormula();
        this.reduceCalcOperations(CalculationService.firstOrderSymbols, numbers);
        this.reduceCalcOperations(CalculationService.secondOrderSymbols, numbers);
        this.result = `${numbers[0]}`;
        this.resultCache.set(this.formula, this.result);
      }
    } catch (error: any) {
      this.result = `${error}`;
    } finally {
      this.operationsOrder.length = 0;
    }
  }

  /**
   * removes symbols in formula to make it correct
   * @private
   */
  private correctFormula() {
    const lastChar = this.formula.charAt(this.formula.length - 1);
    if (lastChar === CalculationService.dot) {
      this.formula = this.formula.slice(0, this.formula.length - 1);
    }
    if (CalculationService.firstOrderSymbols.includes(lastChar) || CalculationService.secondOrderSymbols.includes(lastChar)) {
      this.formula = this.formula.slice(0, this.formula.length - 1);
    }
  }

  /**
   * process formula and prepare arrays for calculations
   * @private
   */
  private parseFormula(): number[] {
    const numbers: number[] = [];
    let num = '';
    const chars = this.formula.split('');
    for (let i = 0; i < chars.length; i++) {
      const c = chars[i];
      if (i === 0 && '-' === c || CalculationService.numericSymbols.includes(c) || c === CalculationService.dot) {
        num += c;
      } else {
        numbers.push(Number(num));
        num = '';
        this.operationsOrder.push(c);
      }
    }
    numbers.push(Number(num));
    return numbers;
  }

  private reduceCalcOperations(operationSymbolsArr: string[], numbersArr: number[]): void {
    for (let i = 0; i < this.operationsOrder.length;) {
      const op = this.operationsOrder[i];
      if (operationSymbolsArr.includes(op)) {
        const result = CalculationService.calcOperation(numbersArr[i], numbersArr[i + 1], op);
        numbersArr.splice(i, 2, result);
        this.operationsOrder.splice(i, 1);
      } else {
        i++;
      }
    }
  }

  private static calcOperation(num1: number, num2: number, operation: string): number {
    switch (operation) {
      case '*': {
        return num1 * num2;
      }
      case '/': {
        if (num2 === 0) {
          throw new Error("Division By Zero is not defined");
        }
        return num1 / num2;
      }
      case '+': {
        return num1 + num2;
      }
      case '-': {
        return num1 - num2;
      }
    }
    throw new Error("Cannot perform calculation");
  }
}
