UpdateQATab.prototype = Object.create(QAHelper.prototype);
UpdateQATab.prototype.constructor = UpdateQATab;

function test() {
  var activeSheet = SpreadsheetApp.getActiveSheet().getSheetName()
  if(activeSheet === "QA Tab" || activeSheet === "Enhancement - QA") {
    var qaUpdater = new UpdateQATab();
    if(qaUpdater.needsUpdating) {
      qaUpdater.updateOnEdit()
    }
  }
}

/*
  This class is used to auto populate cells as users interact with the status drop down in the QA tab
*/
function UpdateQATab() {
  QAHelper.call(this)
  this.statusCol = 5;
  this.lastCol = 15;
  this.historyIndex = 14;
  this.foundByIndex = 11;
  this.dayIndex = 0;
  this.activeCell = this.sheet.getActiveCell();
  this.activeCol = this.activeCell.getColumn();
  this.activeRowRange = this.sheet.getRange(this.activeCell.getRow(), 1, 1, this.lastCol);
  this.activeRowVal = this.activeRowRange.getValues();
  this.activeCellVal = this.activeRowVal[0][4];
  this.histCellVal = this.activeRowVal[0][14];
  this.foundByCellVal = this.activeRowVal[0][11];
  this.dateCellVal = this.activeRowVal[0][0];
  this.needsUpdating = this.sheetName === "QA Tab" || this.sheetName === "Enhancement - QA" && this.activeCol === this.statusCol ? true : false;
  this.dontAddWhenBlank = ['2-Accepted','4-Contractor Validated','5-PM Validated','6-QA/QC Validated','7-SEO Validated','8-Duplicate Item','9-Ticket Open'];
  
  //fills history column with name, date, and time of update
  this.fillHistory = function() {
    if(!this.histCellVal) {
      if(this.dontAddWhenBlank.indexOf(this.activeCellVal) === -1) {
        //histCell.setValue(this.activeCellVal.substring(2) + ':' + this.date + " User: " + this.userInfo);
        this.activeRowVal[0][this.historyIndex] = this.activeCellVal.substring(2) + ':' + this.date + " User: " + this.userInfo
      }
    }
    else {
      this.activeRowVal[0][this.historyIndex] = this.histCellVal + "\r" + this.activeCellVal.substring(2) + ':' + this.date + " User: " + this.userInfo
    }
  }
  //fills found by column cell with active users name
  this.fillFoundBy = function() {
    if(this.foundByCellVal === ''&& this.activeCellVal == '1-Open' || this.activeCellVal == '3-Fixed') {
        this.activeRowVal[0][this.foundByIndex] = this.userInfo
    }
  }
  //fills found date with current date
  this.fillFoundDate = function() {
    if(this.dateCellVal === '' && this.activeCellVal == '1-Open' || this.activeCellVal == '3-Fixed') {
        this.activeRowVal[0][this.dayIndex] = this.day
    }
  }
  
  //calls fillHistory,fillFoundBy, and FillFoundDate functions
  this.updateOnEdit = function() {
    this.fillHistory();
    this.fillFoundBy();
    this.fillFoundDate();
    this.activeRowRange.setValues(this.activeRowVal)
  }
} 

     