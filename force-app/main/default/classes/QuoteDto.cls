public with sharing class QuoteDto extends BaseDto {
  @AuraEnabled  
  public Date endDate;
  @AuraEnabled
  public Date startDate;
  @AuraEnabled
  public String name;
  public QuoteDto() {}

  public QuoteDto(Quote__c quote) {
    super(quote);
    this.endDate = quote.EndDate__c;
    this.startDate = quote.StartDate__c;
    this.Name = quote.name;
  }

  @AuraEnabled(cacheable=true)
  public static QuoteDto getQuoteDetails(String quoteId){
    Quote__c quote1 = [select id, name, StartDate__c, EndDate__c from Quote__c where id =: quoteId limit 1 ]; 
    QuoteDto qdto = new QuoteDto(quote1);
    return qdto;
  }

  @AuraEnabled
  public static String updateQuote(Quote__c quoteUpdate){
    try{
      update quoteUpdate;
      return 'Success';
    }
    catch(Exception exp){
      return  ('Exception: ' + exp.getTypeName() + ': ' + exp.getMessage() + ' -- ' + exp.getCause()); 
    }
  }

  public override SObject refreshSo() {
    return null;
  }
}
