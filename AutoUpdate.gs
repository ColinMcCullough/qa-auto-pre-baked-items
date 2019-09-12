function onOpen() { 
    // When the spreadsheet is first opened by anyone, set the menu to appear
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = [{name:"addLocation", functionName: "addLocation"},];
    SpreadsheetApp.getUi().createMenu('Create QA Location').addItem('Create New Location', 'addLocation').addToUi();
}  

function UpdateQATab() {
  this.sheet = SpreadsheetApp.getActiveSheet();
  this.email = Session.getActiveUser().getEmail();
  this.sheetName = this.sheet.getName();
  this.userInfo = this.email.toString().replace("@getg5.com","");
  this.day = Utilities.formatDate(new Date(), "PST","MM/dd/yy"); 
  this.date = Utilities.formatDate(new Date(), "PST","MM/dd/yy' Time:'hh:mm a");
  this.activeCell = this.sheet.getActiveCell();
  this.activeCol = this.activeCell.getColumn();
  this.activeCellVal = this.activeCell.getValue();
  this.needsUpdating = this.activeCol === 5 && this.sheetName === "QA Tab" || this.activeCol === 4 && this.sheetName === "Enhancement - QA" ? true : false;
  this.dontAddWhenBlank = ['2-Accepted','4-Contractor Validated','5-PM Validated','6-QA/QC Validated','7-SEO Validated','8-Duplicate Item','9-Ticket Open'];
  
  this.fillHistory = function() {
    var histCell = this.activeCell.offset(0, 10);
    var histCellVal = histCell.getValue();
    if(!histCellVal) {
      if(this.dontAddWhenBlank.indexOf(this.activeCellVal) === -1) {
        histCell.setValue(this.activeCellVal.substring(2) + ' ' + this.date + " User: " + this.userInfo);
      }
    }
    else {
      histCell.setValue(histCellVal + "\r" + this.activeCellVal.substring(2) + " " + this.date + " User: " + this.userInfo);
    }
  }
  
  this.fillFoundBy = function() {
    var foundByCell = this.activeCell.offset(0, 7);
    if(foundByCell.getValue() === ''&& this.dontAddWhenBlank.indexOf(this.activeCellVal) === -1) {
        foundByCell.setValue(this.userInfo);
    }
  }
  
  this.fillFoundDate = function() {
    var offsetVal = this.sheetName === "QA Tab" ? -4 : -3;
    var dateCell = this.activeCell.offset(0, offsetVal);
    if(dateCell.getValue() === '' && this.dontAddWhenBlank.indexOf(this.activeCellVal) === -1) {
        dateCell.setValue(this.day);
    }
  }
  
  this.updateOnEdit = function() {
    this.fillHistory();
    this.fillFoundBy();
    this.fillFoundDate();
  }
} 

function onTriggerEdit() {
  var qaUpdater = new UpdateQATab();
  if(qaUpdater.needsUpdating) {
    qaUpdater.updateOnEdit()
  }
}

         
/*  
                 
                
function onTriggerEdit1() {
  var s = SpreadsheetApp.getActiveSheet();
  var userEmail = Session.getActiveUser().getEmail();
  var userInfo = userEmail.toString().replace("@getg5.com","");            
  var formattedDate = Utilities.formatDate(new Date(), "PST","MM/dd/yy' Time:'hh:mm a");
  var day = Utilities.formatDate(new Date(), "PST","MM/dd/yy");    
  var r = s.getActiveCell();
  if( s.getName() === "QA Tab" && r.getColumn() == 5) { //checks that we're on the correct sheet and active cell is col 5
    var histCell = r.offset(0, 10);
    if(r.getValue() == '1-Open') { //checks the column  
      if( histCell.getValue()) {
        histCell.setValue(histCell.getValue()+"\r"+"Re-Opened: "+formattedDate+" User: "+userInfo);
      }
      else {
        histCell.setValue("Opened: "+formattedDate+" User: "+userInfo);
      }   
    }
    if(r.getValue() == '2-Accepted') { //checks the column  
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
    // Updates "Test Date" Column
    if( r.getColumn() == 4 && r.getValue() == '3-Fixed') { //checks the column  
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

*/