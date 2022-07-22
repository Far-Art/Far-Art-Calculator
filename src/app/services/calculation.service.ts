import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  private resultCache = new Map<string, string>();

  private firstOrderOperations: { operation: string, index: number[] }[] = [];

  private secondOrderOperations: { operation: string, index: number[] }[] = [];

  private numericSymbols = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  private firstOrderSymbols = ['*', '/'];

  private secondOrderSymbols = ['+', '-'];

  private dot = '.';

  private numIndex = 0;

  private canAppendDot = true;

  formula: string = '';

  result: string = '';

  constructor() {
  }

  appendSymbol(symbol: string) {
    const isFirstOrderOperation = this.firstOrderSymbols.includes(symbol);
    const isSecondOrderOperation = this.secondOrderSymbols.includes(symbol);
    const isDot = this.dot === symbol;

    // operation symbol cannot be first in string
    if (this.formula.length === 0 && (isFirstOrderOperation || isSecondOrderOperation)) {
      return;
    }

    // if dot is first in string append zero
    if (this.formula.length === 0 && isDot) {
      this.formula += '0.';
      this.canAppendDot = false;
      return;
    }

    const lastSymbol = this.formula.charAt(this.formula.length - 1);

    // operation symbol or dot cannot be pressed after dot
    if (lastSymbol === this.dot && (isFirstOrderOperation || isSecondOrderOperation || isDot)) {
      return;
    }

    // if last symbol is operation symbol replace it with new operation symbol
    if ((this.firstOrderSymbols.includes(lastSymbol) || this.secondOrderSymbols.includes(lastSymbol)) && (isFirstOrderOperation || isSecondOrderOperation)) {
      this.removeLastSymbol();
      this.formula += symbol;
      return;
    }

    // first order symbol occurred
    if (isFirstOrderOperation) {
      this.firstOrderOperations.push({operation: symbol, index: [this.numIndex, ++this.numIndex]});
      this.formula += symbol;
      this.canAppendDot = true;
      return;
    }

    // second order symbol occurred
    if (isSecondOrderOperation) {
      this.secondOrderOperations.push({operation: symbol, index: [this.numIndex, ++this.numIndex]});
      this.formula += symbol;
      this.canAppendDot = true;
      return;
    }

    // numeric order symbol occurred
    if (this.numericSymbols.includes(symbol)) {
      this.formula += symbol;
      return;
    }

    // dot symbol occurred
    if (isDot && this.canAppendDot) {
      this.formula += symbol;
      this.canAppendDot = false;
      return;
    }
  }

  removeLastSymbol(): void {
    const toRemove = this.formula.charAt(this.formula.length - 1);
    if (this.firstOrderSymbols.includes(toRemove)) {
      this.firstOrderOperations.pop();
    } else if (this.secondOrderSymbols.includes(toRemove)) {
      this.secondOrderOperations.pop();
    } else if (this.dot === toRemove) {
      this.canAppendDot = true;
    }
    this.formula = this.formula.slice(0, this.formula.length - 1);
  }

  clearFormula(): void {
    this.formula = '';
    this.firstOrderOperations.length = 0;
    this.secondOrderOperations.length = 0;
    this.canAppendDot = true;
  }

  calculate() {
    if (this.resultCache.has(this.formula)) {
      this.result = `${this.resultCache.get(this.formula)}`;
      return;
    }
    const placeholder = '##';
    let temp = this.formula;
    this.firstOrderSymbols.forEach(o => {
      temp = temp.split(o).join(placeholder);
    });
    this.secondOrderSymbols.forEach(o => {
      temp = temp.split(o).join(placeholder);
    });
    const numbersList = temp.split(placeholder).map(n => Number(n));
    this.firstOrderOperations.forEach(op => {
      const result = this.calcOperation(numbersList[op.index[0]], numbersList[op.index[1]], op.operation);
      numbersList[op.index[0]] = result;
      numbersList[op.index[1]] = result;
    });
    this.secondOrderOperations.forEach(op => {
      const result = this.calcOperation(numbersList[op.index[0]], numbersList[op.index[1]], op.operation);
      numbersList[op.index[0]] = result;
      numbersList[op.index[1]] = result;
    });
    this.result = `${numbersList[this.secondOrderOperations[this.secondOrderOperations.length - 1].index[0]]}`;
    console.log(this.result);
    this.resultCache.set(this.formula, this.result);
  }

  calcOperation(num1: number, num2: number, operation: string): number {
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
