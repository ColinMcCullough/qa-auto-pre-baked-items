InsertQATasks.prototype = Object.create(QAHelper.prototype);
InsertQATasks.prototype.constructor = InsertQATasks;

function testaddqa() {
 
  var inserQAItems = new InsertQATasks({checked :['checkone', 'checkthree'], class:'qc'});
  var response = inserQAItems.run()
  return response;
}

function addQAItems(tabInfo) {
  Logger.log(tabInfo)
  var inserQAItems = new InsertQATasks(tabInfo);
  var response = inserQAItems.run()
  return response;
}

function InsertQATasks(tabInfo) {
  QAHelper.call(this)
  this.checked = tabInfo.checked; //array
  this.checkedTab = tabInfo.class
  this.insertCol = 1;
  
  this.run = function() {
    var errors = this.checkErrors();
    if(errors.length <= 1) {
      var openItems = this.getOpenItems();
      this.sheet.insertRowAfter(this.activeRow)
      this.setDataVal(this.activeRow + 1)
      if(openItems.length > 1) {
        this.sheet.insertRowsAfter(this.activeRow + 1, openItems.length - 1);
      }
      this.sheet.getRange(this.activeRow + 1, 1, openItems.length, this.lastCol).setValues(openItems);
      return 'Sucess';
    } else {
      this.ui.alert(errors.join('\n\n'));
      return null;
    }
  }
  
  this.checkErrors = function() {
    var errors = ['Errors:']
    this.activeRow < 3 ? errors.push('*Select the row where you would like issues places. Can not be in header') : '';
    !(this.correctSheet) ? errors.push('*Make sure you are on the QA tab') : '';
    this.checked.length === 0 ? errors.push('*No items selected from checkboxes') : '';
    return errors;
  }
  
  this.getOpenItems = function() {
    var newIssues = []
    for(var i = 0; i < this.checked.length; i++) {
      newIssues.push(getOpenItems(this.checkedTab,this.checked[i],this.date,this.historyCol));
    }
    return newIssues;
  }
}
