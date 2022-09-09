import { createGestureRecognizer } from "~/gestures";

class NSDocument {
  private _registry: any = {};
  registerElement(tagName: string, impl: any) {
    this._registry[tagName] = impl;
  }
  createElement<K extends keyof NSElementTagNameMap>(
    tagName: K
  ): NSElementTagNameMap[K] {
    if (this._registry[tagName]) {
      return new this._registry[tagName]();
    }
    switch (tagName) {
      case "label": {
        return new NSLabelElement();
      }

      default: {
        return new NSElement();
      }
    }
  }
}

abstract class EventTargetImpl implements EventTarget {
  addEventListener(
    type: string,
    callback: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void {}
  dispatchEvent(event: Event): boolean {
    return false;
  }
  removeEventListener(
    type: string,
    callback: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): void {}
}

export class NSElement<T extends UIView = UIView> extends EventTargetImpl {
  public _nativeView: T;

  addEventListener(
    type: string,
    callback: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void {
    super.addEventListener(type, callback, options);

    // create recognizer...
    createGestureRecognizer(this._nativeView, type, callback);
  }
}

export class NSLabelElement extends NSElement<UILabel> {
  constructor() {
    super();

    const label = UILabel.alloc().init();
    label.textColor = UIColor.blueColor;
    label.backgroundColor = UIColor.whiteColor;
    label.textAlignment = NSTextAlignment.Center;

    this._nativeView = label;
  }

  set textContent(value: string) {
    this._nativeView.text = value;
  }
}

export const document = new NSDocument();
