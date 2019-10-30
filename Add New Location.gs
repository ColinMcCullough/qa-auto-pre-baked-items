NewLocation.prototype = Object.create(QAHelper.prototype);
NewLocation.prototype.constructor = NewLocation;

function test2() {
  addLocation('Apartments', 'www.apartments.com')
}

function addLocation(name, url) {
  var locAdder = new NewLocation(name, url)
  locAdder.setPreBakedValues();
}

/*
  Class used to create preset values for a new location in the QA tab
  @param {String} - name
  @param {String} - url
*/
function NewLocation(name, url) {
  //constructor
  QAHelper.call(this)
  this.name = name;
  this.url = url;
  this.insertCol = 1;
  this.insertRow = 3;
  this.preBakedArr = 
    [
      [this.name, "", "", "", "Staging Link:", this.url, "", "", "", "", "", "", '=HYPERLINK("http://builder-handbook.g5static.com/self-qa","Self QA Checklist ↗")', "", ""], //row complete
      [this.day, "", "Self QA", "CMS", "1-Open", "", "Best Practices", "WIS", "", "Confirm that all widgets function correctly **Please declare if widgets broken in WF", "", "pre-baked", "example: floor plans widget with missing integration creds. example: social feed in place but are waiting on social links", "", this.historyCol],
      [this.day, "", "Self QA", "CMS", "1-Open", "", "SEO Strategy", "WIS", "", "Apply correct SEO strategy for all pages. Do not fill in H1 field", "", "pre-baked", '=HYPERLINK("http://builder-handbook.g5static.com/update-seo-strategy","Handbook Guide ↗")', "", this.historyCol],
      [this.day, "", "Self QA", "CMS", "1-Open", "", "Best Practices", "WIS", "", "Delete Pages that will not be used. Navigation tab in the WF is source of Truth. Disable and no-index pages that should be preserved but will not be used by or in implementation", "", "pre-baked", "If the page will not be on the website at go-live delete it. If you have an exception (ordained by the PM) you must specify that in the notes here.", "", this.historyCol],
      [this.day, "", "Self QA", "CMS", "1-Open", "", "Best Practices", "WIS", "", "Set up override in g5-emails. If there are more than 1 email addresses provided add the non-primary emails as recipients", "", "pre-baked", "", "", this.historyCol],
      [this.day, "", "Self QA", "Redirects", "1-Open", "", "Best Practices", "WIS", "", "Please select Redirect Strategy from DropDown", "*link to support ticket", "pre-baked", '=HYPERLINK("https://sites.google.com/getg5.com/g5wiki/customer-operations-services/professional-services/website-implementation-specialists/build-process/redirects","G-Sites Guide ↗")', "", this.historyCol],
      [this.day, "", "Self QA", "CMS", "1-Open", "", "Best Practices", "WIS", "", "Please list any and all missing assets at the time of build here and keep the status 'open'", "", "pre-baked", "", "", this.historyCol],
      [this.day, "", "Self QA", "", "1-Open", "", "Best Practices", "WIS", "", "Site is functional on mobile (declare any known or ticketed mobile issues here)", "", "pre-baked", "", "", this.historyCol]
    ];
   this.numPreBakedRows = this.preBakedArr.length - 1

  //sets preset values in qa tab when create new location button clicked
  this.setPreBakedValues = function () {
    var errors = this.checkErrors()
    if (!errors) {
      this.createStandardLoc();
    }
    else {
      this.ui.alert(errors.join('\n\n'));
    }
  }
  /*
    This function checks for a valid state to generate a new location
    @return {[]} If len is 1, no errors, anything longer indicates errors
  */
  this.checkErrors = function() {
    var errors = ['Errors:']
    !(this.correctSheet) ? errors.push('*Make sure you are on the QA tab') : '';
    !(this.name) ? errors.push('*Make sure you enter a location name') : '';
    !(this.url) ? errors.push('*Make sure you enter a url') : '';
    !(this.correctHeaders()) ? errors.push('*Incorrect headers. Make sure this is the most current QA Template') : '';
    return errors.length > 1 ? errors : null;
  }

  /*
    This function generates a new locations and sets its values starting at row 3 of the spreadsheet
  */
  this.createStandardLoc = function () {
    this.sheet.insertRowBefore(this.insertRow);
    this.setDataVal(this.insertRow);
    this.sheet.insertRowsAfter(this.insertRow, this.numPreBakedRows);
    this.setHeaderFormatting();
    if (this.sheetName === "QA Tab") {
      this.setPreBakedData();
    } else {
      this.setEnhData();
    }
  }
  
  //Sets header formatting for a new location
  this.setHeaderFormatting = function () {
    this.sheet.getRange(this.insertRow, 1, 1, this.lastCol)
        .setBackgroundRGB(233, 79, 61)
        .setFontSize(16)
        .setDataValidation(null)
        .setWrapStrategy(SpreadsheetApp.WrapStrategy.OVERFLOW)
    this.sheet.getRange(this.insertRow, 1)
        .setFontColor('white')
        .setFontWeight("bold");
    this.sheet.getRange(this.insertRow, 5)
        .setHorizontalAlignment("left")
        .setFontColor('black')
        .setFontWeight("bold");
    this.sheet.getRange(this.insertRow, 6).setFontColor('white');
    this.sheet.getRange(this.insertRow, 13).setFontColor('white');
    this.sheet.setRowHeight(this.insertRow, 40)
  }
  //Sets prebaked items in qa tab
  this.setPreBakedData = function () {
    var prebakedArray = this.getPreBakedArray();
    var setValuesRange = this.sheet.getRange(this.insertRow, 1, 8, 15);
    var redirectsRange = this.sheet.getRange(this.insertRow + 5, 10);
    var redirectsVal = SpreadsheetApp.newDataValidation().requireValueInList(["Please select Redirect Strategy from DropDown", "No redirects", "Redirects entered into CMS", "Redirects entered into Redirect Manager", "Support ticket submitted for Tyler's redirect tool", "Transfer from single domain - support ticket to delete + redirect sites will need to be submitted at go-live", "Redesign - any live pages not included in the redesign are entered into CMS for redirects"], true).build(); //redirects validation builder
    setValuesRange.setValues(prebakedArray); // adds values
    redirectsRange.setDataValidation(redirectsVal);
    this.sheet.autoResizeRows(this.insertRow + 1, 7);
  }
  //Sets prebaked header values
  this.setEnhData = function () {
    var headerData = [[this.name, "", "", "", "Staging Link:", this.url, "", "", "", "", "", "", '=HYPERLINK("http://builder-handbook.g5static.com/self-qa","Self QA Checklist ↗")', "", ""]];
    var setValuesRange = this.sheet.getRange(this.insertRow, 1, 1, this.lastCol);
    setValuesRange.setValues(headerData);
  }

  /*
    Returns values needed for new location
    @return {[][]} - 2D Array
  */
  this.getPreBakedArray = function () {
    return this.preBakedArr;
  }
}