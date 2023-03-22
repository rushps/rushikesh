import { LightningElement, api } from 'lwc';
import getAmountandCurr from '@salesforce/apex/QuoteDto.getAmountandCurr';


export default class CurrencyField extends LightningElement {
    @api recordId;
    currISOfield='';
    amountField='';
    showEdit = false;
    connectedCallback (){
        getAmountandCurr({ quoteId: this.recordId })
            .then(result => {
              this.currISOfield=result.CurrencyIsoCode;
              this.amountField = result.TotalQuotedAmount__c;
              console.log(result);
            })
            .catch(error => {
              this.error = error;
            });
      }
      handleData(){
        this.showEdit=true;
      }
}