//Global Variables
var ui = SpreadsheetApp.getUi();

function onOpen() {
  SpreadsheetApp.getUi()
      .createAddonMenu()
      .addItem('Open App', 'qaSidebar')
      .addToUi();
}

function qaSidebar() {
  var SIDEBAR_TITLE = 'QA Helper';
  var ui = HtmlService.createTemplateFromFile('Sidebar')
      .evaluate()
      .setTitle(SIDEBAR_TITLE);
  SpreadsheetApp.getUi().showSidebar(ui);
}


function onEdit(e) {
  var qaUpdater = new UpdateQATab();
  if(qaUpdater.needsUpdating) {
    qaUpdater.updateOnEdit()
  }
}
