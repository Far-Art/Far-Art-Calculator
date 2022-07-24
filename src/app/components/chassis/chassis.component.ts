import {Component, OnInit} from '@angular/core';
import {CalculationService} from "../../services/calculation.service";


@Component({
  selector: 'app-chassis',
  templateUrl: './chassis.component.html',
  styleUrls: ['./chassis.component.scss']
})
export class ChassisComponent implements OnInit {

  formula: string;
  deleteSymbol = 'Backspace';
  clearSymbol = "CE";
  equalsSymbol = '=';
  enterSymbol = 'Enter';

  constructor(public calcService: CalculationService) {
    this.formula = calcService.formula;
  }


  ngOnInit(): void {

  }

// TODO bug, when button in focus, pressing enter appends new symbol and performs calculation, change to only append symbol if button in focus
  keyPress(key: string) {
    switch (key) {
      case this.deleteSymbol: {
        this.calcService.removeLastSymbol();
        break;
      }
      case this.clearSymbol: {
        this.calcService.resetFormula();
        break;
      }
      case this.equalsSymbol: {
        this.calcService.calculate();
        break;
      }
      case this.enterSymbol: {
        this.calcService.calculate();
        break;
      }
      default: {
        this.calcService.appendSymbol(key);
        break;
      }
    }
  }
}
