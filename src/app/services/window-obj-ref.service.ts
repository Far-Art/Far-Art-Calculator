import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowObjRefService {

  constructor() {
  }

  get windowObject(): Window {
    return window;
  }

  addEventListener(event: keyof WindowEventMap, fn: (this: Window, ev: DeviceMotionEvent | Event | DeviceOrientationEvent | GamepadEvent | UIEvent | AnimationEvent | MouseEvent | InputEvent | FocusEvent | CompositionEvent | DragEvent | ErrorEvent | FormDataEvent | PointerEvent | KeyboardEvent | ProgressEvent<EventTarget> | SecurityPolicyViolationEvent | SubmitEvent | TouchEvent | TransitionEvent | WheelEvent | BeforeUnloadEvent | HashChangeEvent | MessageEvent<any> | PageTransitionEvent | PopStateEvent | PromiseRejectionEvent | StorageEvent) => any) {
    this.windowObject?.addEventListener(event, fn);
  }

  removeEventListener(event: keyof WindowEventMap, fn: (this: Window, ev: DeviceMotionEvent | Event | DeviceOrientationEvent | GamepadEvent | UIEvent | AnimationEvent | MouseEvent | InputEvent | FocusEvent | CompositionEvent | DragEvent | ErrorEvent | FormDataEvent | PointerEvent | KeyboardEvent | ProgressEvent<EventTarget> | SecurityPolicyViolationEvent | SubmitEvent | TouchEvent | TransitionEvent | WheelEvent | BeforeUnloadEvent | HashChangeEvent | MessageEvent<any> | PageTransitionEvent | PopStateEvent | PromiseRejectionEvent | StorageEvent) => any) {
    this.windowObject?.removeEventListener(event, fn);
  }
}
