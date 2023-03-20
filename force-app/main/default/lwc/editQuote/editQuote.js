/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement, api, wire } from "lwc";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getQuoteDetails from '@salesforce/apex/QuoteDto.getQuoteDetails';
import updateQuote from '@salesforce/apex/QuoteDto.updateQuote';
import { RefreshEvent } from 'lightning/refresh';


export default class EditQuote extends LightningElement {
  @api recordId;
    quoteData = {
      name: "Quote Name",
      startDate: "",
      endDate : ""
    };
    quoteData1 ={};
    isLoading = false;

  connectedCallback (){
    getQuoteDetails({ quoteId: this.recordId })
        .then(result => {
          this.quoteData=result;
        })
        .catch(error => {
          this.error = error;
        });
  }
  handleSave(){
    this.handleIsLoading(true);
    updateQuote({ quoteUpdate: this.quoteData1 })
         .then((result) => {
            console.log(result);
            this.showToast('Success',result,'success', 'dismissable');
          })
         .catch((error) => {
            console.log(error);
            this.showToast('Error',error,'error', 'dismissable');
          })
         .finally(()=>{
          this.handleIsLoading(false);
          this.onRefresh();
          });
    
  }
  handleData(event){
    this.quoteData1.Id = this.recordId;
    if(event.target.dataset.id === 'startDate')
      this.quoteData1.StartDate__c = event.detail.value;
    if(event.target.dataset.id === 'endDate')
      this.quoteData1.EndDate__c = event.detail.value;
  }
  handleIsLoading(isLoading) {
    this.isLoading = isLoading;
  }
  showToast(title, message, variant, mode) {
    const event = new ShowToastEvent({
        title: title,
        message: message,
        variant: variant,
        mode: mode
    });
    this.dispatchEvent(event);
  }
  onRefresh() {
    window.location.reload();
  }
}
