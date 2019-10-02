NewLocation.prototype = Object.create(QAHelper.prototype);
NewLocation.prototype.constructor = NewLocation;

function test2() {
  addLocation('Apartments','www.apartments.com')
}

function addLocation(name,url) {
  var locAdder = new NewLocation(name,url)
  locAdder.setPreBakedValues();
}




function NewLocation(name,url) {
  QAHelper.call(this)
  this.name = name;
  this.url = url;
  this.insertCol = 1;
  this.insertRow = 3;
  
  this.setPreBakedValues = function() { 
    var proceed = this.correctSheet && this.name && this.url ? true : false;
    if(proceed) {
      this.createStandardLoc();
    }
    else {
      this.ui.alert('Please enter a location name and url in the sidebar.\n\nMake sure you are on the QA Tab')
    }
  }
  
  this.createStandardLoc = function() {
    this.sheet.insertRowBefore(this.insertRow);
    this.setDataVal(this.insertRow);
    this.sheet.insertRowsAfter(this.insertRow,7);  
    this.setHeaderFormatting();
    if(this.sheetName === "QA Tab") {
      this.setPreBakedData();
    } else {
      this.setEnhData();
    }
  }
  
  this.setHeaderFormatting = function() {
    this.sheet.getRange(this.insertRow,1,1,this.lastCol).setBackgroundRGB(233, 79, 61).setFontSize(16).setDataValidation(null);  
    this.sheet.getRange(this.insertRow, 1).setFontColor('white').setFontWeight("bold");
    this.sheet.getRange(this.insertRow, 5).setHorizontalAlignment("left").setFontColor('black').setFontWeight("bold");
    this.sheet.getRange(this.insertRow, 6).setFontColor('white').setWrapStrategy(SpreadsheetApp.WrapStrategy.OVERFLOW);
    this.sheet.getRange(this.insertRow, 13).setFontColor('white');
  }
  
  this.setPreBakedData = function() {
    var prebakedArray = this.preBakedDoubleArray();
    var setValuesRange = this.sheet.getRange(this.insertRow,1,8,15);
    var redirectsRange = this.sheet.getRange(this.insertRow + 5,10);
    var redirectsVal = SpreadsheetApp.newDataValidation().requireValueInList(["Please select Redirect Strategy from DropDown","No redirects","Redirects entered into CMS","Redirects entered into Redirect Manager","Support ticket submitted for Tyler's redirect tool","Transfer from single domain - support ticket to delete + redirect sites will need to be submitted at go-live","Redesign - any live pages not included in the redesign are entered into CMS for redirects"], true).build(); //redirects validation builder
    setValuesRange.setValues(prebakedArray); // adds values
    redirectsRange.setDataValidation(redirectsVal);

    this.sheet.autoResizeRows(this.insertRow + 1, 7);
 }
 
 this.setEnhData = function() {
    var headerData = [[this.name,"","","","Staging Link:", this.url,"","","","","","",'=HYPERLINK("http://builder-handbook.g5static.com/self-qa","Self QA Checklist ↗")',"",""]];
    var setValuesRange = this.sheet.getRange(this.insertRow,1,1,this.lastCol);
    setValuesRange.setValues(headerData);
 }

  
  this.preBakedDoubleArray = function() {
    var preBakedArr = [
        [this.name,"","","","Staging Link:", this.url,"","","","","","",'=HYPERLINK("http://builder-handbook.g5static.com/self-qa","Self QA Checklist ↗")',"",""], //row complete
        [this.day,"","Self QA","CMS","1-Open","","Best Practices","WIS","","Confirm that all widgets function correctly **Please declare if widgets broken in WF","","pre-baked","example: floor plans widget with missing integration creds. example: social feed in place but are waiting on social links","",this.historyCol], 
        [this.day,"","Self QA","CMS","1-Open","","SEO Strategy","WIS","","Apply correct SEO strategy for all pages. Do not fill in H1 field","","pre-baked",'=HYPERLINK("http://builder-handbook.g5static.com/update-seo-strategy","Handbook Guide ↗")',"",this.historyCol], 
        [this.day,"","Self QA","CMS","1-Open","","Best Practices","WIS","","Delete Pages that will not be used. Navigation tab in the WF is source of Truth. Disable and no-index pages that should be preserved but will not be used by or in implementation","","pre-baked","If the page will not be on the website at go-live delete it. If you have an exception (ordained by the PM) you must specify that in the notes here.","",this.historyCol],    
        [this.day,"","Self QA","CMS","1-Open","","Best Practices","WIS","","Set up override in g5-emails. If there are more than 1 email addresses provided add the non-primary emails as recipients","","pre-baked","","",this.historyCol], 
        [this.day,"","Self QA","Redirects","1-Open","","Best Practices","WIS","","Please select Redirect Strategy from DropDown","*link to support ticket","pre-baked",'=HYPERLINK("https://sites.google.com/getg5.com/g5wiki/customer-operations-services/professional-services/website-implementation-specialists/build-process/redirects","G-Sites Guide ↗")',"",this.historyCol],
        [this.day,"","Self QA","CMS","1-Open","","Best Practices","WIS","","Please list any and all missing assets at the time of build here and keep the status 'open'","","pre-baked","","",this.historyCol],
        [this.day,"","Self QA","","1-Open","","Best Practices","WIS","","Site is functional on mobile (declare any known or ticketed mobile issues here)","","pre-baked","","",this.historyCol]
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
