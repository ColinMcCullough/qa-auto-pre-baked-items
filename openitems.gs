//this.tabInfo,this.checked[i],this.day,this.historyCol,this.userInfo
function createItems(sideBarData,key2,date,history,user) {
  var key1 = sideBarData.class
  var stage = sideBarData.reviewstage
  var page = sideBarData.page
  var resp = key1.toUpperCase();
  var context = sideBarData.checked[key2].context
  var screenshot = sideBarData.checked[key2].screenshot
  var openItem = {
      wis : {
          check1 : [date,"",stage,page,"1-Open","","Best Practices",resp,"","Neighborhood Map Issue: " + context,screenshot,user,"","",history], 
          check2 : [date,"",stage,page,"1-Open","","Best Practices",resp,"","Slug Issue: " + context,screenshot,user,"","",history],
          check3 : [date,"",stage,page,"1-Open","","Best Practices",resp,"","Page should be set to no-index: " + context,screenshot,user,"","",history],
          check4 : [date,"",stage,page,"1-Open","","Best Practices",resp,"","Favicon Issue: " + context,screenshot,user,"","",history], 
          check5 : [date,"",stage,page,"1-Open","","Best Practices",resp,"","Incorrect photos used: " + context,screenshot,user,"","",history],
          check6 : [date,"",stage,page,"1-Open","","Copy",resp,"","Incorrect copy/content used: " + context,screenshot,user,"","",history], 
          check7 : [date,"",stage,page,"1-Open","","Copy",resp,"","Spelling Issue: " + context,screenshot,user,"","",history]
      },
      twis : {
          checkone : [date,"",stage,page,"1-Open","","404",resp,"","404 on page",screenshot,user,context,"",history], 
          checktwo : [date,"",stage,page,"1-Open","","301",resp,"","301 on page",screenshot,user,context,"",history],
          checkthree : [date,"",stage,page,"1-Open","","ALT Text",resp,"","Image Missing alt text",screenshot,user,context,"",history] 
      },
      qc : {
          checkone : [date,"",stage,page,"1-Open","","404",resp,"","404 on page",screenshot,user,context,"",history], 
          checktwo : [date,"",stage,page,"1-Open","","301",resp,"","301 on page",screenshot,user,context,"",history],
          checkthree : [date,"",stage,page,"1-Open","","ALT Text",resp,"","Image Missing alt text",screenshot,user,context,"",history]          
      },
      seo : {
          checkone : [date,"",stage,page,"1-Open","","404",resp,"","404 on page",screenshot,user,context,"",history], 
          checktwo : [date,"",stage,page,"1-Open","","301",resp,"","301 on page",screenshot,user,context,"",history],
          checkthree : [date,"",stage,page,"1-Open","","ALT Text",resp,"","Image Missing alt text",screenshot,user,context,"",history] 
      },
      pm : {
          checkone : [date,"",stage,page,"1-Open","","404",resp,"","404 on page",screenshot,user,context,"",history], 
          checktwo : [date,"",stage,page,"1-Open","","301",resp,"","301 on page",screenshot,user,context,"",history],
          checkthree : [date,"",stage,page,"1-Open","","ALT Text",resp,"","Image Missing alt text",screenshot,user,context,"",history] 
      },
      creative : {
          checkone : [date,"",stage,page,"1-Open","","404",resp,"","404 on page",screenshot,user,context,"",history], 
          checktwo : [date,"",stage,page,"1-Open","","301",resp,"","301 on page",screenshot,user,context,"",history],
          checkthree : [date,"",stage,page,"1-Open","","ALT Text",resp,"","Image Missing alt text",screenshot,user,context,"",history] 
      },
      am : {
          checkone : [date,"",stage,page,"1-Open","","404",resp,"","404 on page",screenshot,user,context,"",history], 
          checktwo : [date,"",stage,page,"1-Open","","301",resp,"","301 on page",screenshot,user,context,"",history],
          checkthree : [date,"",stage,page,"1-Open","","ALT Text",resp,"","Image Missing alt text",screenshot,user,context,"",history] 
      }
  }
  return openItem[key1][key2];
}