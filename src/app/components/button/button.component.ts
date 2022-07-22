import {Component, Input, OnInit, OnDestroy, Output, EventEmitter} from '@angular/core';
import {WindowObjRefService} from "../../services/window-obj-ref.service";

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit, OnDestroy {

  @Input()
  symbols: string[] = [];

  @Output() eventEmitter = new EventEmitter<string>();

  private onKeyDownEvent: keyof WindowEventMap = "keydown";

  private onKeyDownFunction: any = (event: KeyboardEvent) => {
    if (this.symbols.includes(event.key)) {
      this.fireSymbol(event.key);
    }
  };

  constructor(private windowRef: WindowObjRefService) {
  }

  ngOnInit(): void {
    this.windowRef?.addEventListener(this.onKeyDownEvent, this.onKeyDownFunction);
  }

  ngOnDestroy(): void {
    this.windowRef?.removeEventListener(this.onKeyDownEvent, this.onKeyDownFunction);
  }

  fireSymbol(symbol: string | null) {
    if (symbol !== null) {
      this.eventEmitter.emit(symbol);
    }
  }

}
