const xjs = require('../index.js')

let website = {
  "@context": {
    "@vocab": "http://schema.org/",
    "pending": "http://pending.schema.org/",
    "custom": "http://chharvey.github.io/schemaorg-jsd/pending/"
  },
  "@type": "WebPage",
  "name": "A 2016 Event",
  "url": "https://2016.asce-event.org/",
  "custom:sitemap": {
    "@type": "custom:SitemapList",
    "itemListElement": [
      { "@type": "WebPage", "name": "Registration | A 2016 Event", "url": "https://2016.asce-event.org/registration/" },
      { "@type": "WebPage", "name": "Program | A 2016 Event"     , "url": "https://2016.asce-event.org/program/"      },
      { "@type": "WebPage", "name": "Location | A 2016 Event"    , "url": "https://2016.asce-event.org/location/"     },
      { "@type": "WebPage", "name": "Speakers | A 2016 Event"    , "url": "https://2016.asce-event.org/speakers/"     },
      { "@type": "WebPage", "name": "Sponsor | A 2016 Event"     , "url": "https://2016.asce-event.org/sponsor/"      },
      { "@type": "WebPage", "name": "Exhibit | A 2016 Event"     , "url": "https://2016.asce-event.org/exhibit/"      },
      { "@type": "WebPage", "name": "About | A 2016 Event"       , "url": "https://2016.asce-event.org/about/"        },
      { "@type": "WebPage", "name": "Contact | A 2016 Event"     , "url": "https://2016.asce-event.org/contact/"      }
    ]
  }
}

let outline = xjs.Document.TEMPLATES.xSitemap.render(website['custom:sitemap'].itemListElement).querySelector('ol')
console.log(outline.outerHTML)
