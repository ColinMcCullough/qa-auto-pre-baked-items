function preBakedDoubleArray(location,stagingLink,day) {
var arr = [
            [location,"","","","Staging Link:", stagingLink,"","","","","","",'=HYPERLINK("http://builder-handbook.g5static.com/self-qa","Self QA Checklist ↗")',"",""], //row complete
            [day,"","Self QA","Hub","1-Open","","Best Practices","WIS","","Verify accurate SEO liquid values are in Client Hub.","","pre-baked","You must enter the exact values provided in the SEO Liquid Values Tab (Within the Wireframe) in the Hub.","",""], 
            [day,"","Self QA","Hub","1-Open","","Best Practices","WIS","","Add a thumbnail of the location to the Hub.","","pre-baked",'=HYPERLINK("http://builder-handbook.g5static.com/verify-hub-thumbnail","Handbook Guide ↗")',"",""], 
            [day,"","Self QA","CMS","1-Open","","Best Practices","WIS","","Verify that all CTAs are linked","","pre-baked",'=HYPERLINK("http://builder-handbook.g5static.com/link-ctas","Handbook Guide ↗")',"",""], 
            [day,"","Self QA","CMS","1-Open","","Best Practices","WIS","","Confirm that all widgets function correctly **Please declare if widgets broken in WF","","pre-baked","example: floor plans widget with missing integration creds. example: social feed in place but are waiting on social links","",""], 
            [day,"","Self QA","CMS","1-Open","","ALT Text","WIS","","Add alt text to all images.","","pre-baked",'=HYPERLINK("http://builder-handbook.g5static.com/confirm-alt-text","Handbook Guide ↗")',"",""], 
            [day,"","Self QA","CMS","1-Open","","SEO Strategy","WIS","","Apply correct SEO strategy for all pages. Do not fill in H1 field","","pre-baked",'=HYPERLINK("http://builder-handbook.g5static.com/update-seo-strategy","Handbook Guide ↗")',"",""], 
            [day,"","Self QA","CMS","1-Open","","404/Broken Page","WIS","","Find and fix any internal 404s/301s","","pre-baked",'=HYPERLINK("http://builder-handbook.g5static.com/404-checking","Handbook Guide ↗")',"",""], 
            [day,"","Self QA","CMS","1-Open","","Best Practices","WIS","","Delete Pages that will not be used. Navigation tab in the WF is source of Truth. Disable and no-index pages that should be preserved but will not be used by or in implementation","","pre-baked","If the page will not be on the website at go-live delete it. If you have an exception (ordained by the PM) you must specify that in the notes here.","",""], 
            [day,"","Self QA","CMS","1-Open","","Best Practices","WIS","","Add (minimum) one internal link via anchor text to the copy on every page.","","pre-baked","Best Practice: One internal link per 200 words of copy on each page (Dont force if no good anchor text available)","",""], 
            [day,"","Self QA","Meta","1-Open","","Best Practices","WIS","","Set up override in g5-emails. If there are more than 1 email addresses provided add the non-primary emails as recipients","","pre-baked","","",""], 
            [day,"","Self QA","Redirects","1-Open","","Best Practices","WIS","","Please select Redirect Strategy from DropDown","*link to support ticket","pre-baked",'=HYPERLINK("https://www.google.com/url?q=https://sites.google.com/getg5.com/g5wiki/professional-services/website-implementation-specialists/build-process/redirects&sa=D&source=hangouts&ust=1552681646077000&usg=AFQjCNGkQ4cBHEdho-WPvqhRYMeCxzQI_w","G-Sites Guide ↗")',"",""],
            [day,"","SEO Staging Review","SEO Strategy","1-Open","","Best Practices","SEO","","Review Title Tags/Meta Descriptions for grammar and character count","","pre-baked",'=HYPERLINK("https://sites.google.com/getg5.com/g5wiki/professional-services/seo-implementation/seo-staging-review","G-Sites Guide ↗")',"",""], 
            [day,"","SEO Staging Review","","1-Open","","Best Practices","SEO","","SEO Review Complete/GA Set-Up Complete","","pre-baked","","",""]
          ]
  return arr;
}

function setStandardPreBaked(val, val1, val2, val3, val4, val5) {
  var location = val;
  var stagingLink = val1;
  var s = val2;
  var col = val3;
  var row = val4;
  var day = val5;
  var prebakedArray = preBakedDoubleArray(location,stagingLink,day);
  var setValuesRange = SpreadsheetApp.getActiveSheet().getRange(row,col,14,15);
  SpreadsheetApp.getActiveSheet().insertRowsAfter(SpreadsheetApp.getActiveSpreadsheet().getActiveCell().getRow(),13);  
  //Insert location name and increase it's font size.     
  SpreadsheetApp.getActiveSheet().getRange((SpreadsheetApp.getActiveRange().getRow() ),1,1,SpreadsheetApp.getActiveSheet().getLastColumn()).setBackgroundRGB(233, 79, 61).setFontSize(16);  
  SpreadsheetApp.getActiveSheet().getRange((SpreadsheetApp.getActiveRange().getRow() ),1,1,SpreadsheetApp.getActiveSheet().getLastColumn()).setDataValidation(null);
  setValuesRange.setValues(prebakedArray); // adds values
  //adds formatting
  SpreadsheetApp.getActiveSheet().getRange(row, col).setFontColor('white').setFontWeight("bold");
  SpreadsheetApp.getActiveSheet().getRange(row, col+4).setHorizontalAlignment("left").setFontColor('black').setFontWeight("bold");
  SpreadsheetApp.getActiveSheet().getRange(row, col+5).setFontColor('white').setWrapStrategy(SpreadsheetApp.WrapStrategy.OVERFLOW);
  SpreadsheetApp.getActiveSheet().getRange(row, col+12).setFontColor('white');
  //adds data validation drop down
  var redirectsRange = SpreadsheetApp.getActiveSheet().getRange(row+11,col+9);
  var redirectsVal = SpreadsheetApp.newDataValidation().requireValueInList(["Please select Redirect Strategy from DropDown","No redirects","Redirects entered into CMS","Redirects entered into Redirect Manager","Support ticket submitted for Tyler's redirect tool"], true).build(); //redirects validation builder
  redirectsRange.setDataValidation(redirectsVal);
}

function setEnhTemplate(location,stagingLink,scope,col,row) {
  SpreadsheetApp.getActiveSheet().insertRowsAfter(SpreadsheetApp.getActiveSpreadsheet().getActiveCell().getRow(),5);       
  //add rows and information          
  SpreadsheetApp.getActiveSheet().insertRowAfter(SpreadsheetApp.getActiveSpreadsheet().getActiveCell().getRow());
  SpreadsheetApp.getActiveSheet().getRange((SpreadsheetApp.getActiveRange().getRow() ),1,1,SpreadsheetApp.getActiveSheet().getLastColumn()).setBackgroundRGB(233, 79, 61);
  SpreadsheetApp.getActiveSheet().getRange((SpreadsheetApp.getActiveRange().getRow() ),1,1,SpreadsheetApp.getActiveSheet().getLastColumn()).setDataValidation(null);
  SpreadsheetApp.getActiveSheet().getRange(row, col).setValue(location).setFontColor('white').setFontWeight("bold");
  SpreadsheetApp.getActiveSheet().getRange(row, col,1,14).setFontSize(16);
  SpreadsheetApp.getActiveSheet().getRange(row, col+3).setHorizontalAlignment("right").setValue("Scope:").setFontColor('black').setFontWeight("bold");
  SpreadsheetApp.getActiveSheet().getRange(row, col+4).setValue(scope).setFontColor('white').setHorizontalAlignment("left");
  SpreadsheetApp.getActiveSheet().getRange(row, col+6).setValue("Staging Link:").setHorizontalAlignment("center").setFontColor('black').setFontWeight("bold");
  SpreadsheetApp.getActiveSheet().getRange(row, col+7).setValue(stagingLink).setFontColor('white');
}
