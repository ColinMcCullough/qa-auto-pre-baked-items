# qa-auto-pre-baked-items
Javascript to automate portions of the QA tab
function onOpen() { 
    // When the spreadsheet is first opened by anyone, set the menu to appear
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = [{name:"addLocation", functionName: "addLocation"},];
    SpreadsheetApp.getUi().createMenu('Create QA Location').addItem('Create New Location', 'addLocation').addToUi();
  }
  
  function addLocation() {
    var s = SpreadsheetApp.getActiveSheet();
    var col = SpreadsheetApp.getActiveSpreadsheet().getActiveCell().getColumn();
    var row = SpreadsheetApp.getActiveSpreadsheet().getActiveCell().getRow();
    var day = Utilities.formatDate(new Date(), "PST","MM/dd/yy");
    if( s.getName() == "QA Tab") {             
    //import spread sheet information
    //var ss = SpreadsheetApp.getActiveSpreadsheet();
    //var sheet = ss.getSheets()[0];
    var ui = SpreadsheetApp.getUi();
    
    //prompt user for name
    var result = ui.prompt(
      'loading..',
      'Please enter the Location\'s name:',
      ui.ButtonSet.OK_CANCEL);
    var button = result.getSelectedButton();
    var location = result.getResponseText();
    
    //if Ok button was clicked and name is not null prompt for location's name
    if (button == ui.Button.OK){
          var result = ui.prompt(
            'loading..',
            'Please enter the Staging Link:',
            ui.ButtonSet.OK_CANCEL);
          var button = result.getSelectedButton();
          var stagingLink = result.getResponseText();
                 
    //if Ok button was clicked and Location is not null  
          if(button == ui.Button.OK) {
            //Adds rows and information     
            SpreadsheetApp.getActiveSheet().insertRowsAfter(SpreadsheetApp.getActiveSpreadsheet().getActiveCell().getRow(),11);  
       
            //Insert location name and increase it's font size.     
            SpreadsheetApp.getActiveSheet().getRange((SpreadsheetApp.getActiveRange().getRow() ),1,1,SpreadsheetApp.getActiveSheet().getLastColumn()).setBackgroundRGB(233, 79, 61);  
            SpreadsheetApp.getActiveSheet().getRange((SpreadsheetApp.getActiveRange().getRow() ),1,1,SpreadsheetApp.getActiveSheet().getLastColumn()).setDataValidation(null);
            SpreadsheetApp.getActiveSheet().getRange(row, col).setValue(location).setFontColor('white').setFontWeight("bold");
            SpreadsheetApp.getActiveSheet().getRange(row, col).setFontSize(16);
            SpreadsheetApp.getActiveSheet().getRange(row, col+6).setValue("Staging Link:").setHorizontalAlignment("center").setFontColor('black').setFontWeight("bold");
            SpreadsheetApp.getActiveSheet().getRange(row, col+6).setFontSize(16);
            SpreadsheetApp.getActiveSheet().getRange(row, col+7).setValue(stagingLink).setFontColor('white');
            SpreadsheetApp.getActiveSheet().getRange(row, col+7).setFontSize(16);
            SpreadsheetApp.getActiveSheet().getRange(row, col+12).setFormula('=HYPERLINK("http://builder-handbook.g5static.com/self-qa","Self QA Checklist ↗")').setFontColor('white');
            SpreadsheetApp.getActiveSheet().getRange(row, col+12).setFontSize(16);
            //adds pre-baked items below header
            SpreadsheetApp.getActiveSheet().getRange(row+1, col,11).setValue(day);    // change the display format to your preference here
            SpreadsheetApp.getActiveSheet().getRange(row+1, col+2,9).setValue('Self QA');
            SpreadsheetApp.getActiveSheet().getRange(row+1, col+3,2).setValue('Hub');
            SpreadsheetApp.getActiveSheet().getRange(row+1, col+4,11).setValue('1-Open');
            SpreadsheetApp.getActiveSheet().getRange(row+1, col+6,4).setValue('Best Practices');
            SpreadsheetApp.getActiveSheet().getRange(row+1, col+7,9).setValue('WIS');
            SpreadsheetApp.getActiveSheet().getRange(row+1, col+9).setValue('Verify accurate SEO liquid values are in Client Hub.');
            SpreadsheetApp.getActiveSheet().getRange(row+1, col+11,11).setValue('pre-baked');
            SpreadsheetApp.getActiveSheet().getRange(row+1, col+12).setValue('You must enter the exact values provided in the SEO Liquid Values Tab (Within the Wireframe) in the Hub.');
            SpreadsheetApp.getActiveSheet().getRange(row+1, col,11).setFontSize(10);  
            SpreadsheetApp.getActiveSheet().getRange(row+2, col+9).setValue('Add a thumbnail of the location to the Hub.');
            SpreadsheetApp.getActiveSheet().getRange(row+2, col+12).setFormula('=HYPERLINK("http://builder-handbook.g5static.com/verify-hub-thumbnail","Handbook Guide ↗")');
            SpreadsheetApp.getActiveSheet().getRange(row+3, col+3,7).setValue('CMS');
            SpreadsheetApp.getActiveSheet().getRange(row+3, col+9).setValue('Verify that all CTAs are linked');
            SpreadsheetApp.getActiveSheet().getRange(row+3, col+12).setFormula('=HYPERLINK("http://builder-handbook.g5static.com/link-ctas","Handbook Guide ↗")');
            SpreadsheetApp.getActiveSheet().getRange(row+4, col+9).setValue('Confirm that all widgets function correctly'+"\r"+'**Please declare if widgets broken in WF');
            SpreadsheetApp.getActiveSheet().getRange(row+4, col+12).setValue('example: floor plans widget with missing integration creds.'+"\r"+'example: social feed in place but are waiting on social links');
            SpreadsheetApp.getActiveSheet().getRange(row+5, col+6).setValue('ALT Text');
            SpreadsheetApp.getActiveSheet().getRange(row+5, col+9).setValue('Add alt text to all images.');
            SpreadsheetApp.getActiveSheet().getRange(row+5, col+12).setFormula('=HYPERLINK("http://builder-handbook.g5static.com/confirm-alt-text","Handbook Guide ↗")');         
            SpreadsheetApp.getActiveSheet().getRange(row+6, col+6).setValue('SEO Strategy');
            SpreadsheetApp.getActiveSheet().getRange(row+6, col+9).setValue('Apply correct SEO strategy for all pages. Do not fill in H1 field');
            SpreadsheetApp.getActiveSheet().getRange(row+6, col+12).setFormula('=HYPERLINK("http://builder-handbook.g5static.com/update-seo-strategy","Handbook Guide ↗")');
            SpreadsheetApp.getActiveSheet().getRange(row+7, col+6).setValue('404/Broken Page');
            SpreadsheetApp.getActiveSheet().getRange(row+7, col+9).setValue('Find and fix any internal 404s/301s');
            SpreadsheetApp.getActiveSheet().getRange(row+7, col+12).setFormula('=HYPERLINK("http://builder-handbook.g5static.com/404-checking","Handbook Guide ↗")');
            SpreadsheetApp.getActiveSheet().getRange(row+8, col+6,4).setValue('Best Practices');
            SpreadsheetApp.getActiveSheet().getRange(row+8, col+9).setValue('Delete Pages that will not be used. Disable and no-index pages that should be preserved but will not be used by or in implementation');
            SpreadsheetApp.getActiveSheet().getRange(row+8, col+12).setValue('If the page will not be on the website at go-live delete it. If you have an exception (ordained by the PM) you must specify that in the notes here.');
            SpreadsheetApp.getActiveSheet().getRange(row+9, col+9).setValue('Add (minimum) one internal link via anchor text to the copy on every page.');
            SpreadsheetApp.getActiveSheet().getRange(row+9, col+12).setValue('Best Practice: One internal link per 200 words of copy on each page (Dont force if no good anchor text available)');
            SpreadsheetApp.getActiveSheet().getRange(row+10, col+2,2).setValue('SEO Staging Review');
            SpreadsheetApp.getActiveSheet().getRange(row+10, col+3).setValue('SEO Strategy');
            SpreadsheetApp.getActiveSheet().getRange(row+10, col+7,2).setValue('SEO');
            SpreadsheetApp.getActiveSheet().getRange(row+10, col+9).setValue('Review Title Tags/Meta Descriptions for grammar and character count');
            SpreadsheetApp.getActiveSheet().getRange(row+10, col+12).setFormula('=HYPERLINK("https://sites.google.com/getg5.com/g5wiki/professional-services/seo-implementation/seo-staging-review","G-Sites Guide ↗")');
            SpreadsheetApp.getActiveSheet().getRange(row+11, col+9).setValue('SEO Review Complete/GA Set-Up Complete');           
                 }
               }
                 }  else if (s.getName() == "Enhancement - QA") {
   var ui = SpreadsheetApp.getUi();
    
    //prompt user for name
    var result = ui.prompt(
      'loading..',
      'Please enter the Location\'s name:',
      ui.ButtonSet.OK_CANCEL);
    var button = result.getSelectedButton();
    var location = result.getResponseText();
    
    //if Ok button was clicked and name is not null prompt for location's name
    if (button == ui.Button.OK){
          var result = ui.prompt(
            'loading..',
            'Please enter the Staging Link:',
            ui.ButtonSet.OK_CANCEL);
          var button = result.getSelectedButton();
          var stagingLink = result.getResponseText();
                
    //if Ok button was clicked and name is not null prompt for location's name
    if (button == ui.Button.OK){
          var result = ui.prompt(
            'loading..',
            'Please enter the Project Scope ex: BNC,DAWOW,SSL',
            ui.ButtonSet.OK_CANCEL);
          var button = result.getSelectedButton();
          var scope = result.getResponseText();  
                 
    //if Ok button was clicked and Location is not null  
          if(button == ui.Button.OK){
    //add rows and information          
            SpreadsheetApp.getActiveSheet().insertRowAfter(SpreadsheetApp.getActiveSpreadsheet().getActiveCell().getRow());
            SpreadsheetApp.getActiveSheet().getRange((SpreadsheetApp.getActiveRange().getRow() ),1,1,SpreadsheetApp.getActiveSheet().getLastColumn()).setBackgroundRGB(233, 79, 61);
            SpreadsheetApp.getActiveSheet().getRange((SpreadsheetApp.getActiveRange().getRow() ),1,1,SpreadsheetApp.getActiveSheet().getLastColumn()).setDataValidation(null);
            SpreadsheetApp.getActiveSheet().getRange(row, col).setValue(location).setFontColor('white').setFontWeight("bold");
            SpreadsheetApp.getActiveSheet().getRange(row, col,1,14).setFontSize(16);
            SpreadsheetApp.getActiveSheet().getRange(row, col+3).setHorizontalAlignment("right").setValue("Scope:").setFontColor('black').setFontWeight("bold");
            SpreadsheetApp.getActiveSheet().getRange(row, col+4).setValue(scope).setFontColor('white');
            SpreadsheetApp.getActiveSheet().getRange(row, col+6).setValue("Staging Link:").setHorizontalAlignment("center").setFontColor('black').setFontWeight("bold");
            SpreadsheetApp.getActiveSheet().getRange(row, col+7).setValue(stagingLink).setFontColor('white');
               }
             }
           } 
        }          
  }              
  
                 
                 
  function onTriggerEdit() {
     var s = SpreadsheetApp.getActiveSheet();
     var userEmail = Session.getActiveUser().getEmail();
     var userInfo = userEmail.toString().replace("@getg5.com","");            
     var formattedDate = Utilities.formatDate(new Date(), "PST","MM/dd/yy' Time:'hh:mm a");
     var day = Utilities.formatDate(new Date(), "PST","MM/dd/yy");            
         if( s.getName() == "QA Tab") { //checks that we're on the correct sheet
            var r = s.getActiveCell();
                 if( r.getColumn() == 5 && r.getValue() == '1-Open') { //checks the column  
                    var nextCell = r.offset(0, 10);
                      if( nextCell.getValue() != '') //is empty?
                 nextCell.setValue(nextCell.getValue()+"\r"+"Re-Opened: "+formattedDate+" User: "+userInfo);
                 }
                 if( r.getColumn() == 5 && r.getValue() == '1-Open') { //checks the column  
                    var nextCell = r.offset(0, 10);
                      if( nextCell.getValue() === '') //is empty?
                           nextCell.setValue("Opened: "+formattedDate+" User: "+userInfo);
                 }
                 if( r.getColumn() == 5 && r.getValue() == '2-Accepted') { //checks the column  
                    var nextCell = r.offset(0, 10);
                      if( nextCell.getValue() != '') //is empty?
                 nextCell.setValue(nextCell.getValue()+"\r"+"Accepted: "+formattedDate+" User: "+userInfo);
                 }
                 if( r.getColumn() == 5 && r.getValue() == '3-Fixed') { //checks the column  
                    var nextCell = r.offset(0, 10);
                      if( nextCell.getValue() != '') //is empty?
                 nextCell.setValue(nextCell.getValue()+"\r"+"Fixed: "+formattedDate+" User: "+userInfo);
                 }
                 if( r.getColumn() == 5 && r.getValue() == '3-Fixed') { //checks the column  
                    var nextCell = r.offset(0, 10);
                      if( nextCell.getValue() === '') //is empty?
                           nextCell.setValue("Fixed: "+formattedDate+" User: "+userInfo);
                 }
                 if( r.getColumn() == 5 && r.getValue() == '4-Contractor Validated') { //checks the column  
                    var nextCell = r.offset(0, 10);
                      if( nextCell.getValue() != '') //is empty?
                 nextCell.setValue(nextCell.getValue()+"\r"+"Contract Val.: "+formattedDate+" User: "+userInfo);
                 }
                 if( r.getColumn() == 5 && r.getValue() == '5-PM Validated') { //checks the column  
                    var nextCell = r.offset(0, 10);
                      if( nextCell.getValue() != '') //is empty?
                 nextCell.setValue(nextCell.getValue()+"\r"+"PM Val.: "+formattedDate+" User: "+userInfo);
                 }
                 if( r.getColumn() == 5 && r.getValue() == '6-QA/QC Validated') { //checks the column  
                    var nextCell = r.offset(0, 10);
                      if( nextCell.getValue() != '') //is empty?
                 nextCell.setValue(nextCell.getValue()+"\r"+"QC Val.: "+formattedDate+" User: "+userInfo);
                 }
                 if( r.getColumn() == 5 && r.getValue() == '7-Duplicate Item') { //checks the column  
                    var nextCell = r.offset(0, 10);
                      if( nextCell.getValue() != '') //is empty?
                 nextCell.setValue(nextCell.getValue()+"\r"+"Dup. Item: "+formattedDate+" User: "+userInfo);
                 }
                 if( r.getColumn() == 5 && r.getValue() == '8-Ticket Open') { //checks the column  
                    var nextCell = r.offset(0, 10);
                      if( nextCell.getValue() != '') //is empty?
                 nextCell.setValue(nextCell.getValue()+"\r"+"Open Ticket: "+formattedDate+" User: "+userInfo);
                 }
                 if( r.getColumn() == 5 && r.getValue() == '0-Test Post Live') { //checks the column  
                    var nextCell = r.offset(0, 10);
                      if( nextCell.getValue() != '') //is empty?
                 nextCell.setValue(nextCell.getValue()+"\r"+"Test Post Live: "+formattedDate+" User: "+userInfo);
                 }
                 // Updates "Found By" Column
                 if( r.getColumn() == 5 && r.getValue() == '1-Open') { //checks the column  
                    var nextCell = r.offset(0, 7);
                      if( nextCell.getValue() === '') //is empty?
                           nextCell.setValue(userInfo);
                 }
                 // Updates "Found By" Column
                 if( r.getColumn() == 5 && r.getValue() == '3-Fixed') { //checks the column  
                    var nextCell = r.offset(0, 7);
                      if( nextCell.getValue() === '') //is empty?
                           nextCell.setValue(userInfo);
                 }               
                 // Updates "Test Date" Column
                 if( r.getColumn() == 5 && r.getValue() == '1-Open') { //checks the column  
                    var nextCell = r.offset(0, -4);
                      if( nextCell.getValue() === '') //is empty?
                           nextCell.setValue(day);
                 }
                 // Updates "Test Date" Column
                 if( r.getColumn() == 5 && r.getValue() == '3-Fixed') { //checks the column  
                    var nextCell = r.offset(0, -4);
                      if( nextCell.getValue() === '') //is empty?
                           nextCell.setValue(day);
                 }               
                 
         }  else if( s.getName() == "Enhancement - QA") {
            var r = s.getActiveCell();
            var los = s.getRange(1, 8).getValue();
                 if( r.getColumn() == 4 && r.getValue() == '1-Open') { //checks the column  
                    var nextCell = r.offset(0, 10);
                      if( nextCell.getValue() != '') //is empty?
                 nextCell.setValue(nextCell.getValue()+"\r"+"Re-Opened: "+formattedDate+" User: "+userInfo);
                 }
                 if( r.getColumn() == 4 && r.getValue() == '1-Open') { //checks the column  
                    var nextCell = r.offset(0, 10);
                      if( nextCell.getValue() === '') //is empty?
                           nextCell.setValue("Opened: "+formattedDate+" User: "+userInfo);
                 }
                 if( r.getColumn() == 4 && r.getValue() == '2-Accepted') { //checks the column  
                    var nextCell = r.offset(0, 10);
                      if( nextCell.getValue() != '') //is empty?
                 nextCell.setValue(nextCell.getValue()+"\r"+"Accepted: "+formattedDate+" User: "+userInfo);
                 }
                 if( r.getColumn() == 4 && r.getValue() == '3-Fixed') { //checks the column  
                    var nextCell = r.offset(0, 10);
                      if( nextCell.getValue() != '') //is empty?
                 nextCell.setValue(nextCell.getValue()+"\r"+"Fixed: "+formattedDate+" User: "+userInfo);
                 }
                 if( r.getColumn() == 4 && r.getValue() == '3-Fixed') { //checks the column  
                    var nextCell = r.offset(0, 10);
                      if( nextCell.getValue() === '') //is empty?
                           nextCell.setValue("Fixed: "+formattedDate+" User: "+userInfo);
                 }
                 if( r.getColumn() == 4 && r.getValue() == '4-Contractor Validated') { //checks the column  
                    var nextCell = r.offset(0, 10);
                      if( nextCell.getValue() != '') //is empty?
                 nextCell.setValue(nextCell.getValue()+"\r"+"Contract Val.: "+formattedDate+" User: "+userInfo);
                 }
                 if( r.getColumn() == 4 && r.getValue() == '5-PM Validated') { //checks the column  
                    var nextCell = r.offset(0, 10);
                      if( nextCell.getValue() != '') //is empty?
                 nextCell.setValue(nextCell.getValue()+"\r"+"PM Val.: "+formattedDate+" User: "+userInfo);
                 }
                 if( r.getColumn() == 4 && r.getValue() == '6-QA/QC Validated') { //checks the column  
                    var nextCell = r.offset(0, 10);
                      if( nextCell.getValue() != '') //is empty?
                 nextCell.setValue(nextCell.getValue()+"\r"+"QC Val.: "+formattedDate+" User: "+userInfo);
                 }
                 if( r.getColumn() == 4 && r.getValue() == '7-Duplicate Item') { //checks the column  
                    var nextCell = r.offset(0, 10);
                      if( nextCell.getValue() != '') //is empty?
                 nextCell.setValue(nextCell.getValue()+"\r"+"Dup. Item: "+formattedDate+" User: "+userInfo);
                 }
                 if( r.getColumn() == 4 && r.getValue() == '8-Ticket Open') { //checks the column  
                    var nextCell = r.offset(0, 10);
                      if( nextCell.getValue() != '') //is empty?
                 nextCell.setValue(nextCell.getValue()+"\r"+"Open Ticket: "+formattedDate+" User: "+userInfo);
                 }
                 if( r.getColumn() == 4 && r.getValue() == '0-Test Post Live') { //checks the column  
                    var nextCell = r.offset(0, 10);
                      if( nextCell.getValue() != '') //is empty?
                 nextCell.setValue(nextCell.getValue()+"\r"+"Test Post Live: "+formattedDate+" User: "+userInfo);
                 }
                 // Updates "Found By" Column
                 if( r.getColumn() == 4 && r.getValue() == '1-Open') { //checks the column  
                    var nextCell = r.offset(0, 7);
                      if( nextCell.getValue() === '') //is empty?
                           nextCell.setValue(userInfo);
                 }
                 // Updates "Found By" Column
                 if( r.getColumn() == 4 && r.getValue() == '3-Fixed') { //checks the column  
                    var nextCell = r.offset(0, 7);
                      if( nextCell.getValue() === '') //is empty?
                           nextCell.setValue(userInfo);
                 }               
                 // Updates "Test Date" Column
                 if( r.getColumn() == 4 && r.getValue() == '1-Open') { //checks the column  
                    var nextCell = r.offset(0, -3);
                      if( nextCell.getValue() === '') //is empty?
                           nextCell.setValue(day);
                 }
                 
                 
                 // Updates Resolution Ownership -- Out of Scope No Client Communication Needed
                 if( r.getColumn() == 12 && r.getValue() == 'OOS - No Comm Needed') { //checks the column  
                    var resOwner = r.offset(0, 1);
                    var type = r.offset(0, -6);
                    var respFix = r.offset(0, -5);
                      // Issue: 404s, Disabled pages w/ links, CTN, CLS                                      
                      if(los == 'VIP' && type.getValue() == '404'|| los == 'Key' && type.getValue() == '404' || los == 'Corp' && type.getValue() == '404' || los == 'SMB' && type.getValue() == '404' || los == 'VIP' && type.getValue() == 'Disabled Page w/Links'|| los == 'Key' && type.getValue() == 'Disabled Page w/Links' || los == 'Corp' && type.getValue() == 'Disabled Page w/Links' || los == 'SMB' && type.getValue() == 'Disabled Page w/Links' || los == 'VIP' && type.getValue() == 'CTN'|| los == 'Key' && type.getValue() == 'CTN' || los == 'Corp' && type.getValue() == 'CTN' || los == 'SMB' && type.getValue() == 'CTN' || los == 'VIP' && type.getValue() == 'CLS'|| los == 'Key' && type.getValue() == 'CLS' || los == 'Corp' && type.getValue() == 'CLS' || los == 'SMB' && type.getValue() == 'CLS')    {      
                           resOwner.setValue('ENH Fix');
                           respFix.setValue('WIS');
                      }
                      // Issue: 301s, Alt Text, Header Tags, Enabled Page w/o Links, Copy, Layout/UX, Missing Content
                      if(los == 'VIP' && type.getValue() == '301'|| los == 'Key' && type.getValue() == '301' || los == 'VIP' && type.getValue() == 'ALT Text'|| los == 'Key' && type.getValue() == 'ALT Text' || los == 'VIP' && type.getValue() == 'Header Tags'|| los == 'Key' && type.getValue() == 'Header Tags' || los == 'VIP' && type.getValue() == 'Enabled Page w/o Links'|| los == 'Key' && type.getValue() == 'Enabled Page w/o Links' || los == 'VIP' && type.getValue() == 'Copy'|| los == 'Key' && type.getValue() == 'Copy' || los == 'VIP' && type.getValue() == 'Layout/UX'|| los == 'Key' && type.getValue() == 'Layout/UX' || los == 'VIP' && type.getValue() == 'Missing Content'|| los == 'Key' && type.getValue() == 'Missing Content') {         
                           resOwner.setValue('ENH Fix');
                           respFix.setValue('WIS');
                      } 
                      // Issue: Inquiry, Best Practices, Ticketed Item
                      if(los == 'VIP' && type.getValue() == 'Inquiry'|| los == 'Key' && type.getValue() == 'Inquiry' || los == 'VIP' && type.getValue() == 'Best Practices'|| los == 'Key' && type.getValue() == 'Best Practices' || los == 'VIP' && type.getValue() == 'Ticketed Item'|| los == 'Key' && type.getValue() == 'Ticketed Item') {         
                           resOwner.setValue('ENH Fix');
                      }
                      // Issue: SEO Strategy
                      if(los == 'VIP' && type.getValue() == 'SEO Strategy'|| los == 'Key' && type.getValue() == 'SEO Strategy') {         
                           resOwner.setValue('ENH Fix');
                           respFix.setValue('SEO');                 
                      }
                      if(los == 'Corp' && type.getValue() == '301' || los == 'Corp' && type.getValue() == 'ALT Text' || los == 'Corp' && type.getValue() == 'Header Tags' || los == 'Corp' && type.getValue() == 'Enabled Page w/o Links' || los == 'Corp' && type.getValue() == 'Copy' || los == 'Corp' && type.getValue() == 'Layout/UX' || los == 'Corp' && type.getValue() == 'Missing Content' || los == 'Corp' && type.getValue() == 'Inquiry' || los == 'Corp' && type.getValue() == 'Best Practices' || los == 'Corp' && type.getValue() == 'SEO Strategy' || los == 'Corp' && type.getValue() == 'Ticketed Item')  {        
                           resOwner.setValue('Give to AM to Delegate');
                           respFix.setValue('Account Manager');
                      }
                      if(los == 'SMB' && type.getValue() == '301' || los == 'SMB' && type.getValue() == 'ALT Text' || los == 'SMB' && type.getValue() == 'Header Tags' || los == 'SMB' && type.getValue() == 'Enabled Page w/o Links' || los == 'SMB' && type.getValue() == 'Copy' || los == 'SMB' && type.getValue() == 'Layout/UX' || los == 'SMB' && type.getValue() == 'Missing Content' || los == 'SMB' && type.getValue() == 'Inquiry' || los == 'SMB' && type.getValue() == 'Best Practices' || los == 'SMB' && type.getValue() == 'SEO Strategy' || los == 'SMB' && type.getValue() == 'Ticketed Item') {
                           resOwner.setValue('Ignore');
                      }
                 } 
                 // Updated Resolution Ownership -- Out of Scope Needs Client Communication
                 if( r.getColumn() == 12 && r.getValue() == 'OOS - Needs AM/Client Comm') { //checks the column  
                    var resOwner = r.offset(0, 1);
                    var type = r.offset(0, -6);
                    var respFix = r.offset(0, -5);
                       // Issue: 404, Disabled pages w/ links, CTN, CLS 
                      if(los == 'VIP' && type.getValue() == '404'|| los == 'Key' && type.getValue() == '404' || los == 'Corp' && type.getValue() == '404' || los == 'SMB' && type.getValue() == '404' || los == 'VIP' && type.getValue() == 'Disabled Page w/Links'|| los == 'Key' && type.getValue() == 'Disabled Page w/Links' || los == 'Corp' && type.getValue() == 'Disabled Page w/Links' || los == 'SMB' && type.getValue() == 'Disabled Page w/Links' || los == 'VIP' && type.getValue() == 'CTN'|| los == 'Key' && type.getValue() == 'CTN' || los == 'Corp' && type.getValue() == 'CTN' || los == 'SMB' && type.getValue() == 'CTN' || los == 'VIP' && type.getValue() == 'CLS'|| los == 'Key' && type.getValue() == 'CLS' || los == 'Corp' && type.getValue() == 'CLS' || los == 'SMB' && type.getValue() == 'CLS') {
                           resOwner.setValue('Give to AM to Delegate');
                           respFix.setValue('Account Manager');
                        }
                      // Issue: 301s, Alt text, Header Tags, Enabled Page w/o Links, Copy, Layout/UX, Missing Content, Inquiry, Best Practices, SEO Strategy, Ticketed Item
                      if(los == 'VIP' && type.getValue() == '301'|| los == 'Key' && type.getValue() == '301' || los == 'Corp' && type.getValue() == '301' || los == 'VIP' && type.getValue() == 'ALT Text'|| los == 'Key' && type.getValue() == 'ALT Text' || los == 'Corp' && type.getValue() == 'ALT Text' || los == 'VIP' && type.getValue() == 'Header Tags'|| los == 'Key' && type.getValue() == 'Header Tags' || los == 'Corp' && type.getValue() == 'Header Tags' || los == 'VIP' && type.getValue() == 'Enabled Page w/o Links'|| los == 'Key' && type.getValue() == 'Enabled Page w/o Links' || los == 'Corp' && type.getValue() == 'Enabled Page w/o Links' || los == 'VIP' && type.getValue() == 'Copy'|| los == 'Key' && type.getValue() == 'Copy' || los == 'Corp' && type.getValue() == 'Copy' || los == 'VIP' && type.getValue() == 'Layout/UX'|| los == 'Key' && type.getValue() == 'Layout/UX' || los == 'Corp' && type.getValue() == 'Layout/UX' || los == 'VIP' && type.getValue() == 'Missing Content'|| los == 'Key' && type.getValue() == 'Missing Content' || los == 'Corp' && type.getValue() == 'Missing Content' || los == 'VIP' && type.getValue() == 'Inquiry'|| los == 'Key' && type.getValue() == 'Inquiry' || los == 'Corp' && type.getValue() == 'Inquiry' || los == 'VIP' && type.getValue() == 'Best Practices'|| los == 'Key' && type.getValue() == 'Best Practices' || los == 'Corp' && type.getValue() == 'Best Practices' || los == 'VIP' && type.getValue() == 'SEO Strategy'|| los == 'Key' && type.getValue() == 'SEO Strategy' || los == 'Corp' && type.getValue() == 'SEO Strategy' || los == 'VIP' && type.getValue() == 'Ticketed Item'|| los == 'Key' && type.getValue() == 'Ticketed Item' || los == 'Corp' && type.getValue() == 'Ticketed Item') {
                           resOwner.setValue('Give to AM to Delegate');
                           respFix.setValue('Account Manager');
                        }
                      if(los == 'SMB' && type.getValue() == '301' || los == 'SMB' && type.getValue() == 'ALT Text' || los == 'SMB' && type.getValue() == 'Header Tags' || los == 'SMB' && type.getValue() == 'Enabled Page w/o Links' || los == 'SMB' && type.getValue() == 'Copy' || los == 'SMB' && type.getValue() == 'Layout/UX' || los == 'SMB' && type.getValue() == 'Missing Content' || los == 'SMB' && type.getValue() == 'Inquiry' || los == 'SMB' && type.getValue() == 'Best Practices' || los == 'SMB' && type.getValue() == 'SEO Strategy' || los == 'SMB' && type.getValue() == 'Ticketed Item') {
                           resOwner.setValue('Ignore');
                        }            
                 }
                 // Updated Resolution Ownership for Type entered after Out of Scope Does not Need Client Comm field entered             
                 if( r.getColumn() == 6 && r.offset(0, 6).getValue() == 'OOS - No Comm Needed') { //checks the column  
                    var resOwner = r.offset(0, 7);
                    var scope = r.offset(0, 6);
                    var respFix = r.offset(0, 1);    
                      // Issue: 404, Disabled pages w/ links, CTN, CLS 
                       if(los == 'VIP' && r.getValue() == '404'|| los == 'Key' && r.getValue() == '404' || los == 'Corp' && r.getValue() == '404' || los == 'SMB' && r.getValue() == '404' || los == 'VIP' && r.getValue() == 'Disabled Page w/Links'|| los == 'Key' && r.getValue() == 'Disabled Page w/Links' || los == 'Corp' && r.getValue() == 'Disabled Page w/Links' || los == 'SMB' && r.getValue() == 'Disabled Page w/Links' || los == 'VIP' && r.getValue() == 'CTN'|| los == 'Key' && r.getValue() == 'CTN' || los == 'Corp' && r.getValue() == 'CTN' || los == 'SMB' && r.getValue() == 'CTN' || los == 'VIP' && r.getValue() == 'CLS'|| los == 'Key' && r.getValue() == 'CLS' || los == 'Corp' && r.getValue() == 'CLS' || los == 'SMB' && r.getValue() == 'CLS')    {      
                           resOwner.setValue('ENH Fix');
                           respFix.setValue('WIS');
                      }
                      // Issue 301s, Alt Text, Header Tags, Enabled Page w/o Links, Copy, Layout/UX, Missing Content
                       if(los == 'VIP' && r.getValue() == '301'|| los == 'Key' && r.getValue() == '301' || los == 'VIP' && r.getValue() == 'ALT Text'|| los == 'Key' && r.getValue() == 'ALT Text' || los == 'VIP' && r.getValue() == 'Header Tags'|| los == 'Key' && r.getValue() == 'Header Tags' || los == 'VIP' && r.getValue() == 'Enabled Page w/o Links'|| los == 'Key' && r.getValue() == 'Enabled Page w/o Links' || los == 'VIP' && r.getValue() == 'Copy'|| los == 'Key' && r.getValue() == 'Copy' || los == 'VIP' && r.getValue() == 'Layout/UX'|| los == 'Key' && r.getValue() == 'Layout/UX' || los == 'VIP' && r.getValue() == 'Missing Content'|| los == 'Key' && r.getValue() == 'Missing Content')    {      
                           resOwner.setValue('ENH Fix');
                           respFix.setValue('WIS');
                      }
                       //Inquiry, Best Practices, Ticketed Item  
                       if(los == 'VIP' && r.getValue() == 'Inquiry'|| los == 'Key' && r.getValue() == 'Inquiry' || los == 'VIP' && r.getValue() == 'Best Practices'|| los == 'Key' && r.getValue() == 'Best Practices' || los == 'VIP' && r.getValue() == 'SEO Strategy'|| los == 'Key' && r.getValue() == 'SEO Strategy' || los == 'VIP' && r.getValue() == 'Ticketed Item'|| los == 'Key' && r.getValue() == 'Ticketed Item')    {      
                           resOwner.setValue('ENH Fix');
                      }
                      //SEO Strategy
                       if(los == 'VIP' && r.getValue() == 'SEO Strategy'|| los == 'Key' && r.getValue() == 'SEO Strategy')    {      
                           resOwner.setValue('ENH Fix');
                           respFix.setValue('SEO');
                      }                  
                       if(los == 'Corp' && r.getValue() == '301' || los == 'Corp' && r.getValue() == 'ALT Text' || los == 'Corp' && r.getValue() == 'Header Tags' || los == 'Corp' && r.getValue() == 'Enabled Page w/o Links' || los == 'Corp' && r.getValue() == 'Copy' || los == 'Corp' && r.getValue() == 'Layout/UX' || los == 'Corp' && r.getValue() == 'Missing Content' || los == 'Corp' && r.getValue() == 'Inquiry' || los == 'Corp' && r.getValue() == 'Best Practices' || los == 'Corp' && r.getValue() == 'SEO Strategy' || los == 'Corp' && r.getValue() == 'Ticketed Item')    {      
                           resOwner.setValue('Give to AM to Delegate');
                           respFix.setValue('Account Manager');
                      }  
                       if(los == 'SMB' && r.getValue() == '301' || los == 'SMB' && r.getValue() == 'ALT Text' || los == 'SMB' && r.getValue() == 'Header Tags' || los == 'SMB' && r.getValue() == 'Enabled Page w/o Links' || los == 'SMB' && r.getValue() == 'Copy' || los == 'SMB' && r.getValue() == 'Layout/UX' || los == 'SMB' && r.getValue() == 'Missing Content' || los == 'SMB' && r.getValue() == 'Inquiry' || los == 'SMB' && r.getValue() == 'Best Practices' || los == 'SMB' && r.getValue() == 'SEO Strategy' || los == 'SMB' && r.getValue() == 'Ticketed Item')    {      
                           resOwner.setValue('Ignore');
                      }                  
                 } 
                 // Updated Resolution Ownership for Type entered after Out of Scope Needs Client Comm field entered
                 if( r.getColumn() == 6 && r.offset(0, 6).getValue() == 'OOS - Needs AM/Client Comm') { //checks the column  
                    var resOwner = r.offset(0, 7);
                    var scope = r.offset(0, 6);
                    var respFix = r.offset(0, 1);    
                      // Issue: 404, Disabled pages w/ links, CTN, CLS 
                       if(los == 'VIP' && r.getValue() == '404'|| los == 'Key' && r.getValue() == '404' || los == 'Corp' && r.getValue() == '404' || los == 'SMB' && r.getValue() == '404' || los == 'VIP' && r.getValue() == 'Disabled Page w/Links'|| los == 'Key' && r.getValue() == 'Disabled Page w/Links' || los == 'Corp' && r.getValue() == 'Disabled Page w/Links' || los == 'SMB' && r.getValue() == 'Disabled Page w/Links' || los == 'VIP' && r.getValue() == 'CTN'|| los == 'Key' && r.getValue() == 'CTN' || los == 'Corp' && r.getValue() == 'CTN' || los == 'SMB' && r.getValue() == 'CTN' || los == 'VIP' && r.getValue() == 'CLS'|| los == 'Key' && r.getValue() == 'CLS' || los == 'Corp' && r.getValue() == 'CLS' || los == 'SMB' && r.getValue() == 'CLS')    {      
                           resOwner.setValue('Give to AM to Delegate');
                           respFix.setValue('Account Manager');
                      }
                      // Issue 301s, Alt Text, Header Tags, Enabled Page w/o Links, Copy, Layout/UX, Missing Content
                       if(los == 'VIP' && r.getValue() == '301'|| los == 'Key' && r.getValue() == '301' || los == 'Corp' && r.getValue() == '301' || los == 'VIP' && r.getValue() == 'ALT Text'|| los == 'Key' && r.getValue() == 'ALT Text' || los == 'Corp' && r.getValue() == 'ALT Text' || los == 'VIP' && r.getValue() == 'Header Tags'|| los == 'Key' && r.getValue() == 'Header Tags' || los == 'Corp' && r.getValue() == 'Header Tags' || los == 'VIP' && r.getValue() == 'Enabled Page w/o Links'|| los == 'Key' && r.getValue() == 'Enabled Page w/o Links' || los == 'Corp' && r.getValue() == 'Enabled Page w/o Links' || los == 'VIP' && r.getValue() == 'Copy'|| los == 'Key' && r.getValue() == 'Copy' || los == 'Corp' && r.getValue() == 'Copy' || los == 'VIP' && r.getValue() == 'Layout/UX'|| los == 'Key' && r.getValue() == 'Layout/UX' || los == 'Corp' && r.getValue() == 'Layout/UX' || los == 'VIP' && r.getValue() == 'Missing Content'|| los == 'Key' && r.getValue() == 'Missing Content' || los == 'Corp' && r.getValue() == 'Missing Content' || los == 'VIP' && r.getValue() == 'Inquiry'|| los == 'Key' && r.getValue() == 'Inquiry' || los == 'Corp' && r.getValue() == 'Inquiry' || los == 'VIP' && r.getValue() == 'Best Practices'|| los == 'Key' && r.getValue() == 'Best Practices' || los == 'Corp' && r.getValue() == 'Best Practices' || los == 'VIP' && r.getValue() == 'SEO Strategy'|| los == 'Key' && r.getValue() == 'SEO Strategy' || los == 'Corp' && r.getValue() == 'SEO Strategy' || los == 'VIP' && r.getValue() == 'Ticketed Item'|| los == 'Key' && r.getValue() == 'Ticketed Item' || los == 'Corp' && r.getValue() == 'Ticketed Item')    {      
                           resOwner.setValue('Give to AM to Delegate');
                           respFix.setValue('Account Manager');
                      }    
                       if(los == 'SMB' && r.getValue() == '301' || los == 'SMB' && r.getValue() == 'ALT Text' || los == 'SMB' && r.getValue() == 'Header Tags' || los == 'SMB' && r.getValue() == 'Enabled Page w/o Links' || los == 'SMB' && r.getValue() == 'Copy' || los == 'SMB' && r.getValue() == 'Layout/UX' || los == 'SMB' && r.getValue() == 'Missing Content' || los == 'SMB' && r.getValue() == 'Inquiry' || los == 'SMB' && r.getValue() == 'Best Practices' || los == 'SMB' && r.getValue() == 'SEO Strategy' || los == 'SMB' && r.getValue() == 'Ticketed Item')    {      
                           resOwner.setValue('Ignore');
                      }                  
                 }                
            }
  }
