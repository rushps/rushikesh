/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement, api , track} from "lwc";

export default class AdjustQuotePrice extends LightningElement {
  @track adjustedAmountLabel = "Adjusted Amount";

  handleData(event) {
    console.log('1',event);
    const custEvent = new CustomEvent(
      'adjustedamount', {
          detail: event.detail.value
      });
    this.dispatchEvent(custEvent);
  }
  
}
