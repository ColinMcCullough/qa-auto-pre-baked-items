function getOpenItems(key1,key2,date,history,stage) {
  var openItem = {
      qc : {
          checkone : [date,"",stage,"Hub","1-Open","","Best Practices","WIS","","Verify accurate SEO liquid values are in Client Hub.","","pre-baked","You must enter the exact values provided in the SEO Liquid Values Tab (Within the Wireframe) in the Hub.","",history], 
          checktwo : [date,"",stage,"Hub","1-Open","","Best Practices","WIS","","Add a thumbnail of the location to the Hub.","","pre-baked",'=HYPERLINK("http://builder-handbook.g5static.com/verify-hub-thumbnail","Handbook Guide ↗")',"",history],
          checkthree : [date,"",stage,"Hub","1-Open","","Best Practices","WIS","","Verify accurate SEO liquid values are in Client Hub.","","pre-baked","You must enter the exact values provided in the SEO Liquid Values Tab (Within the Wireframe) in the Hub.","",history], 
          checkfour : [date,"",stage,"Hub","1-Open","","Best Practices","WIS","","Add a thumbnail of the location to the Hub.","","pre-baked",'=HYPERLINK("http://builder-handbook.g5static.com/verify-hub-thumbnail","Handbook Guide ↗")',"",history],
          checkfive : [date,"",stage,"Hub","1-Open","","Best Practices","WIS","","Verify accurate SEO liquid values are in Client Hub.","","pre-baked","You must enter the exact values provided in the SEO Liquid Values Tab (Within the Wireframe) in the Hub.","",history], 
          checksix : [date,"",stage,"Hub","1-Open","","Best Practices","WIS","","Add a thumbnail of the location to the Hub.","","pre-baked",'=HYPERLINK("http://builder-handbook.g5static.com/verify-hub-thumbnail","Handbook Guide ↗")',"",history]
      },
      seo : {
          checkone : [date,"",stage,"CMS","1-Open","","404/Broken Page","WIS","","Find and fix any internal 404s/301s","","pre-baked",'=HYPERLINK("http://builder-handbook.g5static.com/404-checking","Handbook Guide ↗")',"",history], 
          checktwo : [date,"",stage,"CMS","1-Open","","Best Practices","WIS","","Delete Pages that will not be used. Navigation tab in the WF is source of Truth. Disable and no-index pages that should be preserved but will not be used by or in implementation","","pre-baked","If the page will not be on the website at go-live delete it. If you have an exception (ordained by the PM) you must specify that in the notes here.","",history], 
          checkthree : [date,"",stage,"CMS","1-Open","","Best Practices","WIS","","Add (minimum) one internal link via anchor text to the copy on every page.","","pre-baked","Best Practice: One internal link per 200 words of copy on each page (Dont force if no good anchor text available)","",history], 
          checkfour : [date,"",stage,"Meta","1-Open","","Best Practices","WIS","","Set up override in g5-emails. If there are more than 1 email addresses provided add the non-primary emails as recipients","","pre-baked","","",history], 
          checkfive : [date,"",stage,"Redirects","1-Open","","Best Practices","WIS","","Please select Redirect Strategy from DropDown","*link to support ticket","pre-baked",'=HYPERLINK("https://sites.google.com/getg5.com/g5wiki/customer-operations-services/professional-services/website-implementation-specialists/build-process/redirects","G-Sites Guide ↗")',"",history],
          checksix : [date,"","SEO Staging Review","SEO Strategy","1-Open","","Best Practices","SEO","","Review Title Tags/Meta Descriptions for grammar and character count","","pre-baked",'=HYPERLINK("https://sites.google.com/getg5.com/g5wiki/customer-operations-services/seo/seo-implementation/seo-staging-review","G-Sites Guide ↗")',"",history]
      },
      wis : {
          checkone : [date,"",stage,"Hub","1-Open","","Best Practices","WIS","","Verify accurate SEO liquid values are in Client Hub.","","pre-baked","You must enter the exact values provided in the SEO Liquid Values Tab (Within the Wireframe) in the Hub.","",history], 
          checktwo : [date,"",stage,"Hub","1-Open","","Best Practices","WIS","","Add a thumbnail of the location to the Hub.","","pre-baked",'=HYPERLINK("http://builder-handbook.g5static.com/verify-hub-thumbnail","Handbook Guide ↗")',"",history],
          checkthree : [date,"",stage,"Hub","1-Open","","Best Practices","WIS","","Verify accurate SEO liquid values are in Client Hub.","","pre-baked","You must enter the exact values provided in the SEO Liquid Values Tab (Within the Wireframe) in the Hub.","",history], 
          checkfour : [date,"",stage,"Hub","1-Open","","Best Practices","WIS","","Add a thumbnail of the location to the Hub.","","pre-baked",'=HYPERLINK("http://builder-handbook.g5static.com/verify-hub-thumbnail","Handbook Guide ↗")',"",history],
          checkfive : [date,"",stage,"Hub","1-Open","","Best Practices","WIS","","Verify accurate SEO liquid values are in Client Hub.","","pre-baked","You must enter the exact values provided in the SEO Liquid Values Tab (Within the Wireframe) in the Hub.","",history], 
          checksix : [date,"",stage,"Hub","1-Open","","Best Practices","WIS","","Add a thumbnail of the location to the Hub.","","pre-baked",'=HYPERLINK("http://builder-handbook.g5static.com/verify-hub-thumbnail","Handbook Guide ↗")',"",history]
      },
      twis : {
          checkone : [date,"",stage,"Hub","1-Open","","Best Practices","WIS","","Verify accurate SEO liquid values are in Client Hub.","","pre-baked","You must enter the exact values provided in the SEO Liquid Values Tab (Within the Wireframe) in the Hub.","",history], 
          checktwo : [date,"",stage,"Hub","1-Open","","Best Practices","WIS","","Add a thumbnail of the location to the Hub.","","pre-baked",'=HYPERLINK("http://builder-handbook.g5static.com/verify-hub-thumbnail","Handbook Guide ↗")',"",history],
          checkthree : [date,"",stage,"Hub","1-Open","","Best Practices","WIS","","Verify accurate SEO liquid values are in Client Hub.","","pre-baked","You must enter the exact values provided in the SEO Liquid Values Tab (Within the Wireframe) in the Hub.","",history], 
          checkfour : [date,"",stage,"Hub","1-Open","","Best Practices","WIS","","Add a thumbnail of the location to the Hub.","","pre-baked",'=HYPERLINK("http://builder-handbook.g5static.com/verify-hub-thumbnail","Handbook Guide ↗")',"",history],
          checkfive : [date,"",stage,"Hub","1-Open","","Best Practices","WIS","","Verify accurate SEO liquid values are in Client Hub.","","pre-baked","You must enter the exact values provided in the SEO Liquid Values Tab (Within the Wireframe) in the Hub.","",history], 
          checksix : [date,"",stage,"Hub","1-Open","","Best Practices","WIS","","Add a thumbnail of the location to the Hub.","","pre-baked",'=HYPERLINK("http://builder-handbook.g5static.com/verify-hub-thumbnail","Handbook Guide ↗")',"",history]
      },
      pm : {
          checkone : [date,"",stage,"Hub","1-Open","","Best Practices","WIS","","Verify accurate SEO liquid values are in Client Hub.","","pre-baked","You must enter the exact values provided in the SEO Liquid Values Tab (Within the Wireframe) in the Hub.","",history], 
          checktwo : [date,"",stage,"Hub","1-Open","","Best Practices","WIS","","Add a thumbnail of the location to the Hub.","","pre-baked",'=HYPERLINK("http://builder-handbook.g5static.com/verify-hub-thumbnail","Handbook Guide ↗")',"",history],
          checkthree : [date,"",stage,"Hub","1-Open","","Best Practices","WIS","","Verify accurate SEO liquid values are in Client Hub.","","pre-baked","You must enter the exact values provided in the SEO Liquid Values Tab (Within the Wireframe) in the Hub.","",history], 
          checkfour : [date,"",stage,"Hub","1-Open","","Best Practices","WIS","","Add a thumbnail of the location to the Hub.","","pre-baked",'=HYPERLINK("http://builder-handbook.g5static.com/verify-hub-thumbnail","Handbook Guide ↗")',"",history],
          checkfive : [date,"",stage,"Hub","1-Open","","Best Practices","WIS","","Verify accurate SEO liquid values are in Client Hub.","","pre-baked","You must enter the exact values provided in the SEO Liquid Values Tab (Within the Wireframe) in the Hub.","",history], 
          checksix : [date,"",stage,"Hub","1-Open","","Best Practices","WIS","","Add a thumbnail of the location to the Hub.","","pre-baked",'=HYPERLINK("http://builder-handbook.g5static.com/verify-hub-thumbnail","Handbook Guide ↗")',"",history]
      },
      creative : {
          checkone : [date,"",stage,"Hub","1-Open","","Best Practices","WIS","","Verify accurate SEO liquid values are in Client Hub.","","pre-baked","You must enter the exact values provided in the SEO Liquid Values Tab (Within the Wireframe) in the Hub.","",history], 
          checktwo : [date,"",stage,"Hub","1-Open","","Best Practices","WIS","","Add a thumbnail of the location to the Hub.","","pre-baked",'=HYPERLINK("http://builder-handbook.g5static.com/verify-hub-thumbnail","Handbook Guide ↗")',"",history],
          checkthree : [date,"",stage,"Hub","1-Open","","Best Practices","WIS","","Verify accurate SEO liquid values are in Client Hub.","","pre-baked","You must enter the exact values provided in the SEO Liquid Values Tab (Within the Wireframe) in the Hub.","",history], 
          checkfour : [date,"",stage,"Hub","1-Open","","Best Practices","WIS","","Add a thumbnail of the location to the Hub.","","pre-baked",'=HYPERLINK("http://builder-handbook.g5static.com/verify-hub-thumbnail","Handbook Guide ↗")',"",history],
          checkfive : [date,"",stage,"Hub","1-Open","","Best Practices","WIS","","Verify accurate SEO liquid values are in Client Hub.","","pre-baked","You must enter the exact values provided in the SEO Liquid Values Tab (Within the Wireframe) in the Hub.","",history], 
          checksix : [date,"",stage,"Hub","1-Open","","Best Practices","WIS","","Add a thumbnail of the location to the Hub.","","pre-baked",'=HYPERLINK("http://builder-handbook.g5static.com/verify-hub-thumbnail","Handbook Guide ↗")',"",history]
      },
      am : {
          checkone : [date,"",stage,"Hub","1-Open","","Best Practices","WIS","","Verify accurate SEO liquid values are in Client Hub.","","pre-baked","You must enter the exact values provided in the SEO Liquid Values Tab (Within the Wireframe) in the Hub.","",history], 
          checktwo : [date,"",stage,"Hub","1-Open","","Best Practices","WIS","","Add a thumbnail of the location to the Hub.","","pre-baked",'=HYPERLINK("http://builder-handbook.g5static.com/verify-hub-thumbnail","Handbook Guide ↗")',"",history],
          checkthree : [date,"",stage,"Hub","1-Open","","Best Practices","WIS","","Verify accurate SEO liquid values are in Client Hub.","","pre-baked","You must enter the exact values provided in the SEO Liquid Values Tab (Within the Wireframe) in the Hub.","",history], 
          checkfour : [date,"",stage,"Hub","1-Open","","Best Practices","WIS","","Add a thumbnail of the location to the Hub.","","pre-baked",'=HYPERLINK("http://builder-handbook.g5static.com/verify-hub-thumbnail","Handbook Guide ↗")',"",history],
          checkfive : [date,"",stage,"Hub","1-Open","","Best Practices","WIS","","Verify accurate SEO liquid values are in Client Hub.","","pre-baked","You must enter the exact values provided in the SEO Liquid Values Tab (Within the Wireframe) in the Hub.","",history], 
          checksix : [date,"",stage,"Hub","1-Open","","Best Practices","WIS","","Add a thumbnail of the location to the Hub.","","pre-baked",'=HYPERLINK("http://builder-handbook.g5static.com/verify-hub-thumbnail","Handbook Guide ↗")',"",history]
      }
  }
  return openItem[key1][key2];
}