// UIAlertController* alert = [UIAlertController alertControllerWithTitle:@"My Alert"
// message:@"This is an alert."
// preferredStyle:UIAlertControllerStyleAlert];

// UIAlertAction* defaultAction = [UIAlertAction actionWithTitle:@"OK" style:UIAlertActionStyleDefault
// handler:^(UIAlertAction * action) {}];

// [alert addAction:defaultAction];
// [self presentViewController:alert animated:YES completion:nil];

export function alert(message: string) {
  const alert = UIAlertController.alertControllerWithTitleMessagePreferredStyle(
    "Alert",
    message,
    UIAlertControllerStyle.Alert
  );

  const defaultAction = UIAlertAction.actionWithTitleStyleHandler(
    "OK",
    UIAlertActionStyle.Default,
    () => {}
  );

  alert.addAction(defaultAction);

  return (vc: UIViewController) => {
    vc.presentViewControllerAnimatedCompletion(alert, true, null);
  };
}
