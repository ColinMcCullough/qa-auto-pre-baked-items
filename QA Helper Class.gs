function QAHelper() {
  this.sheet = SpreadsheetApp.getActiveSheet();
  this.lastCol = this.sheet.getLastColumn();
  this.email = Session.getActiveUser().getEmail();
  this.userInfo = this.email.toString().replace("@getg5.com","");
  this.activeRow = SpreadsheetApp.getActiveSpreadsheet().getActiveCell().getRow();
  this.date = Utilities.formatDate(new Date(), "PST","MM/dd/yy");
  this.historyCol = "Opened: " + this.date + " User: " + this.userInfo;
  this.sheetName = this.sheet.getSheetName();
  this.correctSheet = this.sheetName === "Enhancement - QA" || this.sheetName === "QA Tab" ? true : false;
  this.ui = SpreadsheetApp.getUi();
  
  this.setDataVal = function(insertRow) {
    this.sheet.getRange(insertRow,1,1,this.lastCol).setBackground('white')
    var buildPhaseDataVal = SpreadsheetApp.newDataValidation().requireValueInList(['Corporate','Initial Build (Phase1)','Remaining Build (Phase2+)','Add Location'], true).build();
    var reviewStageDataVal = SpreadsheetApp.newDataValidation().requireValueInList(['Self QA','PM Review','Peer Review','SEO Staging Review','Staging QC','Live SEO Review','Live QC','Regression QC','Pre Live QC'], true).build();
    var statusDataVal = SpreadsheetApp.newDataValidation().requireValueInList(['0-Test Post Live','1-Open','2-Accepted','3-Fixed','4-Contractor Validated','5-PM Validated','6-QA/QC Validated','7-SEO Validated','8-Duplicate Item','9-Ticket Open'], true).build();
    var passFailDataVal = SpreadsheetApp.newDataValidation().requireValueInList(['Pass','Fail'], true).build();
    var typeDataVal = SpreadsheetApp.newDataValidation().requireValueInList(['Copy','Missing Content','404/Broken Page','ALT Text','CTN','Layout/UserExperience','Inquiry','CLS','Best Practices','SEO Strategy','Ticketed Item','Self QA'], true).build();
    var responForDataVal = SpreadsheetApp.newDataValidation().requireValueInList(['WIS','TWIS','WIS/PM','PM','PM/CLIENT','SEO','Account Manager','Creative'], true).build();
    var fixedByDataVal = SpreadsheetApp.newDataValidation().requireValueInList(['WIS','PM','SEO','QC','Creative'], true).build();
    this.sheet.getRange(insertRow,2,1,2).setDataValidations([[buildPhaseDataVal,reviewStageDataVal]]);
    this.sheet.getRange(insertRow,5,1,5).setDataValidations([[statusDataVal,passFailDataVal,typeDataVal,responForDataVal,fixedByDataVal]])
    this.sheet.getRange(insertRow,1,1,this.lastCol).setFontColor('black').setFontWeight("normal").setFontSize(10);
   }
}