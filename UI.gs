//Global Variables
var ui = SpreadsheetApp.getUi();

function onOpen(e) {
  SpreadsheetApp.getUi()
      .createAddonMenu()
      .addItem('Open App', 'qaSidebar')
      .addToUi();
}

//creates sidebar from html file Sidebar.html
function qaSidebar() {
  var SIDEBAR_TITLE = 'QA Buddy';
  var ui = HtmlService.createTemplateFromFile('Sidebar')
      .evaluate()
      .setTitle(SIDEBAR_TITLE);
  SpreadsheetApp.getUi().showSidebar(ui);
}

//runs every time an edit is made
function onEdit(e) {
  var ss = SpreadsheetApp.getActiveSheet()
  var sheetName = ss.getSheetName()
  var activeCol = ss.getActiveCell().getColumn();
  var activeRow = ss.getActiveCell().getRow();
  Logger.log(activeRow)
  if(activeCol == 5 && activeRow > 2 && sheetName === "QA Tab" || sheetName === "Enhancement - QA") {
    var qaUpdater = new UpdateQATab();
    if(qaUpdater.needsUpdating) {
      qaUpdater.updateOnEdit()
    }
  }
}

//Adds menu items under the add on menu when installed
function onInstall(e) {
  onOpen(e);
}