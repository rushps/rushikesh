/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement, api } from "lwc";
import updateQuote from '@salesforce/apex/QuoteDto.updateQuote';

export default class QuoteTotalSummary extends LightningElement {
    @api recordId;
    isShowModal=false;
    quoteData1 ={};
    showAdjustPrice(){
        this.isShowModal=true;
    }
    closeModal(){
        this.isShowModal=false;
    }
    changeAmount(event){
        console.log(event);
        this.quoteData1.Id=this.recordId;
        this.quoteData1.TotalQuotedAmount__c = event.detail;
        console.log(JSON.stringify(this.quoteData1));
    }
    save(){
        updateQuote({ quoteUpdate: this.quoteData1 })
         .then((result) => {
          })
         .catch((error) => {
          })
         .finally(()=>{
          this.onRefresh();
          });
    
  }
  onRefresh() {
    window.location.reload();
  }
}
