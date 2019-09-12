function addLocation() {
  var locAdder = new NewLocation();
  locAdder.setPreBakedValues();
}

function NewLocation() {
  this.sheet = SpreadsheetApp.getActiveSheet();
  this.lastCol = this.sheet.getLastColumn();
  this.insertCol = 1;
  this.email = Session.getActiveUser().getEmail();
  this.userInfo = this.email.toString().replace("@getg5.com","");
  this.activeRow = SpreadsheetApp.getActiveSpreadsheet().getActiveCell().getRow();
  this.date = Utilities.formatDate(new Date(), "PST","MM/dd/yy");
  this.historyCol = "Opened: " + this.date + " User: " + this.userInfo;
  this.sheetName = this.sheet.getSheetName();
  this.correctSheet = this.sheetName === "Enhancement - QA" || this.sheetName === "QA Tab" ? true : false;
  this.ui = SpreadsheetApp.getUi();
  
  this.promptPhrases = {
    "Enhancement - QA" : ["Please enter the Location\'s name:","Please enter the Staging Link:","Please enter the Project Scope ex: BNC,DAWOW,SSL"],
    "QA Tab" : ["Please enter the Location\'s name:","Please enter the Staging Link:"]
  }
  
  this.runQaPrompts = function() {
    var uiResponse = [];
    if(this.correctSheet) {
      var requestPhrases = this.promptPhrases[this.sheetName]
      for(var i = 0; i < requestPhrases.length;i++) {
        var response = this.getLocationInfoPrompt(requestPhrases[i]);
        uiResponse.push(response);
        if(!response) {break;}
      }
    }    
    return uiResponse;
  }
  
  this.getLocationInfoPrompt = function(requestString) {
    var result = this.ui.prompt('loading..',requestString,this.ui.ButtonSet.OK_CANCEL);
    var button = result.getSelectedButton();
    var userResponse = null;
    if(button == this.ui.Button.OK) {
      userResponse = result.getResponseText();
    } 
    else {   
      this.ui.alert('Have a good day!');
    }
    return userResponse
  }
  
  this.setPreBakedValues = function() {
    var promtArr = this.runQaPrompts();
    var proceed = this.sheetName === "Enhancement - QA" && promtArr.length === 3 || this.sheetName === "QA Tab" && promtArr.length === 2 ? true : false;
    if(proceed) {
      this.sheetName === "Enhancement - QA" ? this.createENHLoc(promtArr) : this.createStandardLoc(promtArr);
    }
  }
  
  this.createENHLoc = function(arr) {
    this.sheet.insertRowsAfter(this.activeRow,5);           
    this.sheet.getRange(this.activeRow,1,1,this.lastCol).setBackgroundRGB(233, 79, 61);
    this.sheet.getRange(this.activeRow,1,1,this.lastCol).setDataValidation(null);
    this.sheet.getRange(this.activeRow, this.insertCol).setValue(arr[0]).setFontColor('white').setFontWeight("bold");
    this.sheet.getRange(this.activeRow, 1,1,14).setFontSize(16);
    this.sheet.getRange(this.activeRow, 4).setHorizontalAlignment("right").setValue("Scope:").setFontColor('black').setFontWeight("bold");
    this.sheet.getRange(this.activeRow, 5).setValue(arr[2]).setFontColor('white').setHorizontalAlignment("left");
    this.sheet.getRange(this.activeRow, 7).setValue("Staging Link:").setHorizontalAlignment("center").setFontColor('black').setFontWeight("bold");
    this.sheet.getRange(this.activeRow, 8).setValue(arr[1]).setFontColor('white').setHorizontalAlignment("left");
  }
  
  this.createStandardLoc = function(arr) {
    var prebakedArray = this.preBakedDoubleArray(arr[0],arr[1]);
    var setValuesRange = this.sheet.getRange(this.activeRow,1,8,15);
    var redirectsRange = this.sheet.getRange(this.activeRow + 5,10);
    var redirectsVal = SpreadsheetApp.newDataValidation().requireValueInList(["Please select Redirect Strategy from DropDown","No redirects","Redirects entered into CMS","Redirects entered into Redirect Manager","Support ticket submitted for Tyler's redirect tool","Transfer from single domain - support ticket to delete + redirect sites will need to be submitted at go-live","Redesign - any live pages not included in the redesign are entered into CMS for redirects"], true).build(); //redirects validation builder
    this.sheet.insertRowsAfter(this.activeRow,7);  
    this.sheet.getRange(this.activeRow,1,1,this.lastCol).setBackgroundRGB(233, 79, 61).setFontSize(16).setDataValidation(null);  
    this.sheet.getRange(this.activeRow, 1).setFontColor('white').setFontWeight("bold");
    this.sheet.getRange(this.activeRow, 5).setHorizontalAlignment("left").setFontColor('black').setFontWeight("bold");
    this.sheet.getRange(this.activeRow, 6).setFontColor('white').setWrapStrategy(SpreadsheetApp.WrapStrategy.OVERFLOW);
    this.sheet.getRange(this.activeRow, 13).setFontColor('white');
    setValuesRange.setValues(prebakedArray); // adds values
    redirectsRange.setDataValidation(redirectsVal);
  }
  
  this.preBakedDoubleArray = function(location,stagingLink) {
    var preBakedArr = [
        [location,"","","","Staging Link:", stagingLink,"","","","","","",'=HYPERLINK("http://builder-handbook.g5static.com/self-qa","Self QA Checklist ↗")',"",""], //row complete
        [this.date,"","Self QA","CMS","1-Open","","Best Practices","WIS","","Confirm that all widgets function correctly **Please declare if widgets broken in WF","","pre-baked","example: floor plans widget with missing integration creds. example: social feed in place but are waiting on social links","",this.historyCol], 
        [this.date,"","Self QA","CMS","1-Open","","SEO Strategy","WIS","","Apply correct SEO strategy for all pages. Do not fill in H1 field","","pre-baked",'=HYPERLINK("http://builder-handbook.g5static.com/update-seo-strategy","Handbook Guide ↗")',"",this.historyCol], 
        [this.date,"","Self QA","CMS","1-Open","","Best Practices","WIS","","Delete Pages that will not be used. Navigation tab in the WF is source of Truth. Disable and no-index pages that should be preserved but will not be used by or in implementation","","pre-baked","If the page will not be on the website at go-live delete it. If you have an exception (ordained by the PM) you must specify that in the notes here.","",this.historyCol],    
        [this.date,"","Self QA","CMS","1-Open","","Best Practices","WIS","","Set up override in g5-emails. If there are more than 1 email addresses provided add the non-primary emails as recipients","","pre-baked","","",this.historyCol], 
        [this.date,"","Self QA","Redirects","1-Open","","Best Practices","WIS","","Please select Redirect Strategy from DropDown","*link to support ticket","pre-baked",'=HYPERLINK("https://sites.google.com/getg5.com/g5wiki/customer-operations-services/professional-services/website-implementation-specialists/build-process/redirects","G-Sites Guide ↗")',"",this.historyCol],
        [this.date,"","Self QA","CMS","1-Open","","Best Practices","WIS","","Please list any and all missing assets at the time of build here and keep the status 'open'","","pre-baked","","",this.historyCol],
        [this.date,"","Self QA","","1-Open","","Best Practices","WIS","","Site is functional on mobile (declare any known or ticketed mobile issues here)","","pre-baked","","",this.historyCol]
      ];
    return preBakedArr;
  }
}

/*
var preBakedArr = [
        [location,"","","","Staging Link:", stagingLink,"","","","","","",'=HYPERLINK("http://builder-handbook.g5static.com/self-qa","Self QA Checklist ↗")',"",""], //row complete
        X[this.date,"","Self QA","Hub","1-Open","","Best Practices","WIS","","Verify accurate SEO liquid values are in Client Hub.","","pre-baked","You must enter the exact values provided in the SEO Liquid Values Tab (Within the Wireframe) in the Hub.","",this.historyCol], 
        X[this.date,"","Self QA","Hub","1-Open","","Best Practices","WIS","","Add a thumbnail of the location to the Hub.","","pre-baked",'=HYPERLINK("http://builder-handbook.g5static.com/verify-hub-thumbnail","Handbook Guide ↗")',"",this.historyCol], 
        X[this.date,"","Self QA","CMS","1-Open","","Best Practices","WIS","","Verify that all CTAs are linked","","pre-baked",'=HYPERLINK("http://builder-handbook.g5static.com/link-ctas","Handbook Guide ↗")',"",this.historyCol], 
        *[this.date,"","Self QA","CMS","1-Open","","Best Practices","WIS","","Confirm that all widgets function correctly **Please declare if widgets broken in WF","","pre-baked","example: floor plans widget with missing integration creds. example: social feed in place but are waiting on social links","",this.historyCol], 
        [this.date,"","Self QA","CMS","1-Open","","ALT Text","WIS","","Add alt text to all images.","","pre-baked",'=HYPERLINK("http://builder-handbook.g5static.com/confirm-alt-text","Handbook Guide ↗")',"",this.historyCol], 
        *[this.date,"","Self QA","CMS","1-Open","","SEO Strategy","WIS","","Apply correct SEO strategy for all pages. Do not fill in H1 field","","pre-baked",'=HYPERLINK("http://builder-handbook.g5static.com/update-seo-strategy","Handbook Guide ↗")',"",this.historyCol], 
        X[this.date,"","Self QA","CMS","1-Open","","404/Broken Page","WIS","","Find and fix any internal 404s/301s","","pre-baked",'=HYPERLINK("http://builder-handbook.g5static.com/404-checking","Handbook Guide ↗")',"",this.historyCol], 
        *[this.date,"","Self QA","CMS","1-Open","","Best Practices","WIS","","Delete Pages that will not be used. Navigation tab in the WF is source of Truth. Disable and no-index pages that should be preserved but will not be used by or in implementation","","pre-baked","If the page will not be on the website at go-live delete it. If you have an exception (ordained by the PM) you must specify that in the notes here.","",this.historyCol], 
        X[this.date,"","Self QA","CMS","1-Open","","Best Practices","WIS","","Add (minimum) one internal link via anchor text to the copy on every page.","","pre-baked","Best Practice: One internal link per 200 words of copy on each page (Dont force if no good anchor text available)","",this.historyCol], 
        *[this.date,"","Self QA","Meta","1-Open","","Best Practices","WIS","","Set up override in g5-emails. If there are more than 1 email addresses provided add the non-primary emails as recipients","","pre-baked","","",this.historyCol], 
        *[this.date,"","Self QA","Redirects","1-Open","","Best Practices","WIS","","Please select Redirect Strategy from DropDown","*link to support ticket","pre-baked",'=HYPERLINK("https://sites.google.com/getg5.com/g5wiki/customer-operations-services/professional-services/website-implementation-specialists/build-process/redirects","G-Sites Guide ↗")',"",this.historyCol],
        X[this.date,"","SEO Staging Review","SEO Strategy","1-Open","","Best Practices","SEO","","Review Title Tags/Meta Descriptions for grammar and character count","","pre-baked",'=HYPERLINK("https://sites.google.com/getg5.com/g5wiki/customer-operations-services/seo/seo-implementation/seo-staging-review","G-Sites Guide ↗")',"",this.historyCol],
         [this.date,"","Self QA","","1-Open","","Best Practices","WIS","","Please list any and all missing assets at the time of build here and keep the status 'open'","","pre-baked","","",this.historyCol],
         [this.date,"","Self QA","","1-Open","","Best Practices","WIS","","Site is functional on mobile (declare any known or ticketed mobile issues here)","","pre-baked","","",this.historyCol],
        X[this.date,"","SEO Staging Review","","1-Open","","Best Practices","SEO","","SEO Review Complete/GA Set-Up Complete","","pre-baked","","",""]
*/
