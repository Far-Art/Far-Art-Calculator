import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {WindowObjRefService} from "../../services/window-obj-ref.service";

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input()
  symbol!: string;

  private onKeyDownEvent: keyof WindowEventMap = "keydown";

  private onKeyDownFunction: any = (event: KeyboardEvent) => {
    if (event.key === this.symbol) {
      this.fireSymbol();
    }
  };

  constructor(private windowRef: WindowObjRefService) {
  }

  ngOnInit(): void {
    this.windowRef.addEventListener(this.onKeyDownEvent, this.onKeyDownFunction);
  }

  ngOnDestroy(): void {
    this.windowRef.removeEventListener(this.onKeyDownEvent, this.onKeyDownFunction);
  }

  private fireSymbol() {

  }

}
