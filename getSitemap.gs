function testgetSitemap() {
  Logger.log(getSitemapData('https://www.legacyarc.com/g5-clw-1znpc9fu-larc-at-kent-sitemap.xml'))
}
function testGenUrls() {
  generateUrls(
  {hostname:'www.storquest.com', protocol:'https:', corp: false, fullurl:'https://www.storquest.com/self-storage/az/apache-junction/1047/', url:'https://www.storquest.com/self-storage/az/apache-junction/1047/', pathname:'/self-storage/az/apache-junction/1047/'}
  );
}
function testisurl() {
  Logger.log(isUrl('storquest.g5static.com/self-storage/az/apache-junction/1047/'))
}

function getHtmlString(url) {
  var responseStr = '';
  try {
    var response = UrlFetchApp.fetch(url);
    if (response.getResponseCode() == 200) {
      responseStr = response.getContentText();
    }
    return responseStr;
  }
  catch(e) {
    return responseStr;
  }
}  


function errorAlert() {
  SpreadsheetApp.getUi().alert('Please check the url entered is valid, must include http/https protocol')
}


function generateUrls(urlObj) {
  Logger.log(urlObj)
  var pagesObj = new PagesGenerator(urlObj);
  var returnPageObj = {}
  if(pagesObj.validURL()) {
    try {
      var urls = pagesObj.crawlHomePageForLinks(pagesObj.url);
      var allUrls = pagesObj.crawlInternalPages(urls)
      returnPageObj = pagesObj.buildPageUrlObj(allUrls)
    } 
    catch(e) {
      pagesObj.ui.alert('Please check the url entered, must include http/https protocol')
      return returnPageObj;
    }
  }
  else {
    pagesObj.ui.alert('Please enter properly formatted home page url');
  }
  Object.keys(returnPageObj).length < 1 ? pagesObj.ui.alert('Please enter properly formatted home page url') : '';
  return returnPageObj;
}


function PagesGenerator(urlObj) {
    this.path = urlObj.pathname;
    this.domainStrat = this.path.length > 1 ? 'single' : 'multi';
    this.url = urlObj.fullurl;
    this.domain = urlObj.hostname;
    this.corp = urlObj.corp;
    this.protocol = urlObj.protocol;
    this.linkpath = urlObj.linkpath;
    this.rootdomain = this.domainStrat === 'single' && this.domain.indexOf('-') !== -1 ? 
                        this.domain.substr(0,this.domain.indexOf('-')) : 
                        this.domain.substr(0,this.domain.lastIndexOf('.'));
    
    this.ui = SpreadsheetApp.getUi();
  
    this.validURL = function() {
      var regex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
      return regex.test(this.url)
    }

    this.getPageName = function(str) {
      return pageName = str === this.url || 
                      str === this.url.slice(0,this.url.length - 1) ||
                      str === this.url + '/' ? 
                      'home' : str.slice(str.lastIndexOf('/') + 1,str.length).replace(/\-/g,' ');
    }
    
    this.buildPageUrlObj = function(arr) {
      var obj = {};
      for(var i = 0; i < arr.length; i++) {
        obj[arr[i]] = this.getPageName(arr[i]);
      }
      return obj;
    }  
  
    this.crawlInternalPages = function(pages) {
      var allURLs = [];
      for(var i = 0; i < pages.length; i++) { //crawls all pages linked from home page
        allURLs.push(this.crawlHomePageForLinks(pages[i]));
      }
      var flatUrls = [].concat.apply([], allURLs); //flattens array
      return this.removeDuplInArr(flatUrls);
    }
   
    this.crawlHomePageForLinks = function(url) {
      var links = [];
      try {
        var html = UrlFetchApp.fetch(url).getContentText();
        var inner_links_arr= [this.path];
        var internalLinkStructure = null
        var linkRegExp = /href="(.*?)"/gi; // regex expression object
        var execute = linkRegExp.exec(html);
        while (execute != null) { // we filter only inner links and not pdf docs
          var link = execute[1]
          if(this.validInternalLink(link)) {
            if(this.corp === false) {
              inner_links_arr.push(link);
            }
            else {
              var slash = link.match(/\//gi)
              slash !== null && link.match(/\//gi).length === 1 ? inner_links_arr.push(link) : '';
            }
          }
          execute = linkRegExp.exec(html);
        }
        links = this.removeDupUrls(inner_links_arr)
        return links;
      }
      catch(e) {
        return links;
      }
    }
    
    this.validInternalLink = function(link) {
      return this.domainStrat === 'single' 
               && link.indexOf(this.path) !== -1 
               && link.match(/\.js|\/\/|\.css|\.pdf|\.html|tel:|\.png|aspx|#|https?/gi) === null 
               && link.indexOf('.js') === -1 
               && link.indexOf('.css')  === -1 
               && link.indexOf('.com' + this.domain)  === -1
               || this.domainStrat === 'multi' 
               && link.match(/\.js|\/\/|\.css|\.pdf|\.html|tel:|\.png|aspx|#|https?/gi) === null 
               && link.indexOf('.com' + this.domain)  === -1 
               && link[0] === '/'
               && link.indexOf(this.linkpath) !== -1
    }
   
    this.removeDuplInArr = function(arr) {
      var links = [];
      for(var i = 0; i < arr.length; i++) {
        if(links.indexOf(arr[i]) === -1) {
          links.push(arr[i]);
        }
      }
      return links
    }
    
    this.removeDupUrls = function(inner_links_arr) {
      var links = [];
      for(var i = 0; i < inner_links_arr.length; i++) {
        var fullURL = this.protocol.concat('//',this.domain,inner_links_arr[i])
        if(links.indexOf(fullURL) < 0 && inner_links_arr[i].indexOf(this.rootdomain) === -1) {
          links.push(fullURL);
        }
      }
      return links;
    }
    
        /*
    this.buildWithSitemapUrl = function() {
      var url = this.url.indexOf('-staging') ? this.url.replace('-staging','') : this.url
      var lastChar = this.url.substr(-1);
      var sitemapStr = 'pages-sitemap.xml'
      return lastChar === '/' ? url + sitemapStr : url + '/' + sitemapStr;
    }
    
    this.getSitemapUrls = function(url) {
      var output = [];
      try {
        var options =
        {
          "method" : "get"
        };
        var response = UrlFetchApp.fetch(url, options);
        if (response.getResponseCode() == 200) {
          var responseStr = response.getContentText();
          var XMLdoc = Xml.parse(responseStr); // parse xml
          var urlset = XMLdoc.urlset
          var urls = urlset.getElements("url");
          for(var i = 0; i < urls.length; i++) {
            output.push(urls[i].loc.Text);
          }
          return output;
        }
      } catch(e) {
        throw e;
      }
    }
    */
}



function isUrl(url) {
  var regex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  return regex.test(url)
}


