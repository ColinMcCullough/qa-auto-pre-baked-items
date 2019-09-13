function UpdateQATab() {
  this.sheet = SpreadsheetApp.getActiveSheet();
  this.email = Session.getActiveUser().getEmail();
  this.sheetName = this.sheet.getName();
  this.userInfo = this.email.toString().replace("@getg5.com","");
  this.day = Utilities.formatDate(new Date(), "PST","MM/dd/yy"); 
  this.date = Utilities.formatDate(new Date(), "PST","MM/dd/yy' Time:'hh:mm a");
  this.activeCell = this.sheet.getActiveCell();
  this.activeCol = this.activeCell.getColumn();
  this.activeCellVal = this.activeCell.getValue();
  this.needsUpdating = this.activeCol === 5 && this.sheetName === "QA Tab" || this.activeCol === 4 && this.sheetName === "Enhancement - QA" ? true : false;
  this.dontAddWhenBlank = ['2-Accepted','4-Contractor Validated','5-PM Validated','6-QA/QC Validated','7-SEO Validated','8-Duplicate Item','9-Ticket Open'];
  
  this.fillHistory = function() {
    var histCell = this.activeCell.offset(0, 10);
    var histCellVal = histCell.getValue();
    if(!histCellVal) {
      if(this.dontAddWhenBlank.indexOf(this.activeCellVal) === -1) {
        histCell.setValue(this.activeCellVal.substring(2) + ' ' + this.date + " User: " + this.userInfo);
      }
    }
    else {
      histCell.setValue(histCellVal + "\r" + this.activeCellVal.substring(2) + " " + this.date + " User: " + this.userInfo);
    }
  }
  
  this.fillFoundBy = function() {
    var foundByCell = this.activeCell.offset(0, 7);
    if(foundByCell.getValue() === ''&& this.dontAddWhenBlank.indexOf(this.activeCellVal) === -1) {
        foundByCell.setValue(this.userInfo);
    }
  }
  
  this.fillFoundDate = function() {
    var offsetVal = this.sheetName === "QA Tab" ? -4 : -3;
    var dateCell = this.activeCell.offset(0, offsetVal);
    if(dateCell.getValue() === '' && this.dontAddWhenBlank.indexOf(this.activeCellVal) === -1) {
        dateCell.setValue(this.day);
    }
  }
  
  this.updateOnEdit = function() {
    this.fillHistory();
    this.fillFoundBy();
    this.fillFoundDate();
  }
} 

     