function testgetSitemap() {
  var sitemap = getSitemapData('https://www.m2apartments.com/pages-sitemap.xml')
}

function getSitemapData(url) {
  try {
    var options =
    {
      "method" : "get"
    };
    var response = UrlFetchApp.fetch(url, options);
    if (response.getResponseCode() == 200) {
      var output = [];
      var responseStr = response.getContentText();
      var XMLdoc = Xml.parse(responseStr); // parse xml
      var urlset = XMLdoc.urlset; 
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

