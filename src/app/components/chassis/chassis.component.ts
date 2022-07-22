import {Component, OnInit} from '@angular/core';
import {CalculationService} from "../../services/calculation.service";

@Component({
  selector: 'app-chassis',
  templateUrl: './chassis.component.html',
  styleUrls: ['./chassis.component.scss']
})
export class ChassisComponent implements OnInit {

  constructor(private calc: CalculationService) {
  }

  ngOnInit(): void {
    this.calc.calculate();
  }

  keyPress(){

  }

}
