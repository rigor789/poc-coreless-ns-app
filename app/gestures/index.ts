declare const WeakRef;

@NativeClass()
class UIGestureRecognizerImpl extends NSObject {
  public static ObjCExposedMethods = {
    recognize: {
      returns: interop.types.void,
      params: [UIGestureRecognizer],
    },
  };

  private _owner: any;
  private _type: any;
  private _callback: Function;

  public dealloc(): void {
    console.log("deallocated UIGestureRecognizerImpl");
  }

  public static initWithOwnerTypeCallback(
    owner: any,
    type: any,
    callback?: Function
  ): UIGestureRecognizerImpl {
    const handler = UIGestureRecognizerImpl.new() as UIGestureRecognizerImpl;
    handler._owner = new WeakRef(owner);
    console.log(handler._owner);
    handler._type = type;

    if (callback) {
      handler._callback = callback;
    }

    console.log(handler);

    return handler;
  }

  public recognize(recognizer: UIGestureRecognizer): void {
    this._callback?.(recognizer);
  }
}

let targets = []

export function createGestureRecognizer(
  target: UIView,
  type: string,
  callback: any
) {
  const recognizerTarget = UIGestureRecognizerImpl.initWithOwnerTypeCallback(
    target,
    "tap",
    callback
  );

  targets.push(recognizerTarget)
  const recognizer = UITapGestureRecognizer.alloc().initWithTargetAction(
    recognizerTarget,
    "recognize"
  );
  target.userInteractionEnabled = true;
  target.addGestureRecognizer(recognizer);

  return recognizer;
}
