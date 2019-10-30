/*
  Abstract super class to hold mutually shared properties and functions for child classes
*/
function QAHelper() {
  this.sheet = SpreadsheetApp.getActiveSheet();
  this.lastCol = 15;
  this.email = Session.getActiveUser().getEmail();
  this.userInfo = this.email.toString().replace("@getg5.com","");
  this.activeRow = this.sheet.getActiveCell().getRow();
  this.date = Utilities.formatDate(new Date(), "PST","MM/dd/yy' Time:'hh:mm a");
  this.day = this.date.split(' ')[0]
  this.historyCol = "Opened: " + this.date + " User: " + this.userInfo;
  this.sheetName = this.sheet.getSheetName();
  this.correctSheet = this.sheetName === "Enhancement - QA" || this.sheetName === "QA Tab" ? true : false;
  this.ui = SpreadsheetApp.getUi();
  this.headerrange = this.sheet.getRange(2, 1, 1, this.lastCol)
  this.headers = ['Test Date', 'Build Phase', 'Review Stage Found', 'Page (URL)', 'Pass | Fail', 'Type', 'Resp. For Fix', 'Fixed By', 'Item Description', 
                  'Jing\n(Optional)', 'Found by', 'Additional Notes or Link to Ticket', 'Location ID', 'History']
  
  this.correctHeaders = function() {
    var sheetHeaders = this.correctSheet ? this.headerrange.getValues() : false;
    if(sheetHeaders) {
      sheetHeaders = [].concat.apply([], sheetHeaders).filter(function(item) {
        return item.indexOf('Status') === -1
      })
      return JSON.stringify(sheetHeaders) == JSON.stringify(this.headers)
    }
    else {
      return false
    }
  }
  
  this.setDataVal = function(insertRow) {
    this.sheet.getRange(insertRow,1,1,this.lastCol).setBackground('white').setDataValidation(null).setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP)
    this.sheet.getRange(insertRow,4,1,1).setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP)
    this.sheet.getRange(insertRow,12,1,1).setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP)
    var buildPhaseDataVal = SpreadsheetApp.newDataValidation().requireValueInList(['Corporate','Initial Build (Phase1)','Remaining Build (Phase2+)','Add Location'], true).build();
    var reviewStageDataVal = SpreadsheetApp.newDataValidation().requireValueInList(['Self QA','PM Staging Review','PM Live Review','Peer Review','SEO Staging Review','Staging QC','Live SEO Review','Live QC','Regression QC','Pre Live QC'], true).build();
    var statusDataVal = SpreadsheetApp.newDataValidation().requireValueInList(['0-Test Post Live','1-Open','2-Accepted','3-Fixed','4-Contractor Validated','5-PM Validated','6-QA/QC Validated','7-SEO Validated','8-Duplicate Item','9-Ticket Open'], true).build();
    var passFailDataVal = SpreadsheetApp.newDataValidation().requireValueInList(['Pass','Fail'], true).build();
    var typeDataVal = SpreadsheetApp.newDataValidation().requireValueInList(['Copy','Design','Integrations','Redirects','Missing Content','Internal Link','ALT Text','CTN/Leads','Layout/UX','Inquiry','CLS','SEO Strategy','Best Practices','SEO Elements','Ticketed Item','Header Tags'], true).build();
    var responForDataVal = SpreadsheetApp.newDataValidation().requireValueInList(['WIS','TWIS','WIS/PM','PM','PM/CLIENT','SEO','AM','CREATIVE','QC'], true).build();
    var fixedByDataVal = SpreadsheetApp.newDataValidation().requireValueInList(['WIS','PM','SEO','QC','Creative'], true).build();
    this.sheet.getRange(insertRow,2,1,2).setDataValidations([[buildPhaseDataVal,reviewStageDataVal]]);
    this.sheet.getRange(insertRow,5,1,5).setDataValidations([[statusDataVal,passFailDataVal,typeDataVal,responForDataVal,fixedByDataVal]]).setHorizontalAlignment("left");
    this.sheet.getRange(insertRow,1,1,this.lastCol).setFontColor('black').setFontWeight("normal").setFontSize(10);
   }
}