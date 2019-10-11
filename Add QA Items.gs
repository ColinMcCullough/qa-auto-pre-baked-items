InsertQATasks.prototype = Object.create(QAHelper.prototype);
InsertQATasks.prototype.constructor = InsertQATasks;

function testaddqa() {
 
  var inserQAItems = new InsertQATasks( {checked:{check1:{issue:'Neighborhood Map Issue', context:'Context', screenshot:'www.asdasd.com', type:'Best Practices'}}, page:'Home', class:'wis', reviewstage:'Live QC'});
  var response = inserQAItems.run()
  return response;
}
/*Adds Items from the UI to the QA tab sheet
  @param {Object} - tab info
  @return null is fails, {String} - 'Success' is successfully added issues
*/
function addQAItems(tabInfo) {
  var inserQAItems = new InsertQATasks(tabInfo);
  var response = inserQAItems.run()
  return response;
}

/*
  This class takes data filled out in the sidebar by the client and processes it for insertion into the QA tab
  @param {Object} - tab info
    @properties checked:{check1:{issue:{String}, context:{String}, screenshot:{String}, type:{String}}}, page:{String}, class:{String}, reviewstage:{String}}
*/
function InsertQATasks(tabInfo) {
  QAHelper.call(this)
  this.tabInfo = tabInfo;
  this.checked = Object.keys(tabInfo.checked);
  this.checkedTab = tabInfo.class;
  this.stage = tabInfo.reviewstage;
  this.page = tabInfo.page;
  this.insertCol = 1;
  
  //main run function
  this.run = function() {
    var errors = this.checkErrors();
    if(!errors) {
      var openItems = this.getOpenItems();
      this.sheet.insertRowAfter(this.activeRow)
      this.setDataVal(this.activeRow + 1)
      if(openItems.length > 1) {
        this.sheet.insertRowsAfter(this.activeRow + 1, openItems.length - 1);
      }
      this.sheet.getRange(this.activeRow + 1, 1, openItems.length, this.lastCol).setValues(openItems);
      this.sheet.autoResizeRows(this.activeRow + 1, openItems.length);
      return 'Success';
    } else {
      this.ui.alert(errors.join('\n\n'));
      return null;
    }
  }
  
  //checks to ensure all required data is in place
  this.checkErrors = function() {
    var errors = ['Errors:']
    this.activeRow < 3 ? errors.push('*Select the row where you would like issues places. Can not be in header') : '';
    !(this.correctSheet) ? errors.push('*Make sure you are on the QA tab') : '';
    !(this.correctHeaders()) ? errors.push('*Incorrect headers. Make sure this is the most current QA Template') : '';
    this.checked.length === 0 ? errors.push('*No items selected from checkboxes') : '';
    this.stage === 'Select Review Stage' ? errors.push('*Select what review stage you are on') : '';
    this.page === 'Select Page' ? errors.push('*Select a page') : '';
    return errors.length > 1 ? errors : null;
  }
  
  //gets a 2d array of all issues with checkmarks in UI
  this.getOpenItems = function() {
    var newIssues = []
    for(var i = 0; i < this.checked.length; i++) {
      //newIssues.push(createItems(this.tabInfo,this.checked[i],this.day,this.historyCol,this.userInfo));
      newIssues.push(this.generateRow(this.checked[i]))
    }
    return newIssues;
  }
  
  //generates a dynamic row to insert based on run time data
  this.generateRow = function(key) {
    var status = this.tabInfo.checked[key].issue === 'Review Complete' ? '3-Fixed' : '1-Open';
    return [this.day,
            "",
            this.stage,
            this.page,
            status,
            "",
            this.tabInfo.checked[key].type,
            this.checkedTab.toUpperCase(),
            "",
            this.tabInfo.checked[key].issue + ': ' + this.tabInfo.checked[key].context,
            this.tabInfo.checked[key].screenshot,
            this.userInfo,
            "",
            "",
            status.substring(2) + ":" + this.date + " User: " + this.userInfo];
  }
  
  
}
