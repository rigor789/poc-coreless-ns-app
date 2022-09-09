import { alert } from "./dialogs/alert";
import { document, NSLabelElement } from "./dom";
import { NSCustomElement } from "./dom/customElementTest";
import { createGestureRecognizer } from "./gestures";
import { setInterval } from "./timers";

@NativeClass()
class Responder extends UIResponder implements UIApplicationDelegate {
  public static ObjCProtocols = [UIApplicationDelegate];
  private _window: UIWindow;

  get window() {
    if (!this._window) {
      console.log("creating new window!");
      return (this._window = UIWindow.alloc().initWithFrame(
        UIScreen.mainScreen.bounds
      ));
    }

    return this._window;
  }

  set window(window: UIWindow) {
    console.log("trying to override window... noop.");
    // NOOP
  }

  applicationDidFinishLaunchingWithOptions(
    application: UIApplication,
    launchOptions: NSDictionary<string, any>
  ): boolean {
    console.timeEnd("boot::applicationDidFinishLaunchingWithOptions");
    console.log(
      "applicationDidFinishLaunchingWithOptions",
      application,
      launchOptions
    );

    const rootViewController = UIViewController.alloc().init();

    document.registerElement("custom", NSCustomElement);

    const label = document.createElement("label");
    label.addEventListener("tap", () => {
      const newViewController = UIViewController.alloc().init();
      const newLabel = document.createElement("custom");
      // newLabel.textContent = "Hello new world!";

      newLabel.addEventListener("tap", () => {
        alert("Hello wolrd")(newViewController);
      });

      newViewController.view = newLabel._nativeView;

      rootViewController.navigationController?.pushViewControllerAnimated(
        newViewController,
        true
      );
    });

    let count = 0;
    setInterval(() => {
      label.textContent = `Hello world! ${count++}`;
      __collect();
    }, 500);

    rootViewController.view = label._nativeView;

    const rootNavigationController =
      UINavigationController.alloc().initWithRootViewController(
        rootViewController
      );

    const window = this.window;
    window.rootViewController = rootNavigationController;
    window.backgroundColor = UIColor.whiteColor;
    window.makeKeyAndVisible();

    console.timeEnd("boot");
    return true;
  }
}

console.time("boot");
console.time("boot::applicationDidFinishLaunchingWithOptions");
UIApplicationMain(0, null, null, NSStringFromClass(Responder));
