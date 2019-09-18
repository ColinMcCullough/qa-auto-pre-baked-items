//Global Variables
var ui = SpreadsheetApp.getUi();

function onOpen(e) {
  SpreadsheetApp.getUi()
      .createAddonMenu()
      .addItem('Open App', 'qaSidebar')
      .addToUi();
}

function qaSidebar() {
  var SIDEBAR_TITLE = 'QA Buddy';
  var ui = HtmlService.createTemplateFromFile('Sidebar')
      .evaluate()
      .setTitle(SIDEBAR_TITLE);
  SpreadsheetApp.getUi().showSidebar(ui);
}

function onEdit(e) {
  var activeSheet = SpreadsheetApp.getActiveSheet().getSheetName()
  if(activeSheet === "QA Tab" || activeSheet === "Enhancement - QA") {
    var qaUpdater = new UpdateQATab();
    if(qaUpdater.needsUpdating) {
      qaUpdater.updateOnEdit()
    }
  }
}

function onInstall(e) {
  onOpen(e);
}