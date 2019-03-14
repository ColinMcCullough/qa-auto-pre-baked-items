function getLocationInfoPrompt(val,val1) {
    var requestString = val; 
    var ui = val1;
    var result = ui.prompt('loading..',requestString,ui.ButtonSet.OK_CANCEL);
    var button = result.getSelectedButton();
    if(button == ui.Button.OK) {
      var userResponse = result.getResponseText();
      return userResponse;
    } else {
      userResponse = null;
      ui.alert('Have a good day!');
      return userResponse;
    }
}

function runQaPrompts() {
  var ui = SpreadsheetApp.getUi();  
  var brandNameRequest = "Please enter the Location\'s name:";
  var stagingLinkRequest = "Please enter the Staging Link:";
  var location = getLocationInfoPrompt(brandNameRequest,ui);
  if (location != null) {
    var stagingLink = getLocationInfoPrompt(stagingLinkRequest, ui);
  } else { 
    var stagingLink = null;
  }
  return [location, stagingLink];
}

function runEnhQaPrompts() {
  var ui = SpreadsheetApp.getUi()
  var scope = "Please enter the Project Scope ex: BNC,DAWOW,SSL";
  var locationNameAndStagingArray = runQaPrompts();
  var location = locationNameAndStagingArray[0];
  var stagingLink = locationNameAndStagingArray[1];
  if (stagingLink != null && location != null) {
    var scopeResponse = getLocationInfoPrompt(scope,ui);
  } else {
    var scopeResponse = null;
  }
  Logger.log(scopeResponse);
  return [location, stagingLink, scopeResponse];
}

function getValues() {

  Logger.log(values);
}