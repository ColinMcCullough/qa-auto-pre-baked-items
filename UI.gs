//Global Variables
var ui = SpreadsheetApp.getUi();

function onOpen(e) {
  SpreadsheetApp.getUi()
      .createAddonMenu()
      .addItem('Open App', 'qaSidebar')
      .addToUi();
  protectQaHeaders();
}

//protects headers from being edited on QA tabs
function protectQaHeaders() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetsCount = ss.getNumSheets();
  var sheets = ss.getSheets();
  //loops through sheets
  for (var i = 0; i < sheetsCount; i++){ 
    var sheetName = sheets[i].getName(); 
    if(sheetName === 'QA Tab' || sheetName === 'Enhancement - QA') {
      var headerrange = sheets[i].getRange(2, 1, 1, 15);
      var protection = headerrange.protect().setDescription('QA Tab Headers(Dont Edit)'); // creates protected range
      var authEditors = ["colin.mccullough@getg5.com", "pat.kane@getg5.com","april.wolber@getg5.com","doc.williams@getg5.com"]; //adds authorized users to range
      protection.addEditors(authEditors); //adds authorized users to protected range
    }
  }
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