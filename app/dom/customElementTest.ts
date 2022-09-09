import { NSLabelElement } from ".";



export class NSCustomElement extends NSLabelElement {
  constructor() {
    super();

    super.textContent = 'Custom Element'
  }
}
