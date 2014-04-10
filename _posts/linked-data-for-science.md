{{{
	"title" : "Linked Data for Science",
	"tags"  : [ "blog" ],
	"category" : "Linked Data",
	"date" : "4-9-2014",
    "author": "Tiff"
}}}

There is a beautiful movement in the web right now towards making the information in documents easier to parse with standard notation. The goal is to make it easy for machines (and humans) to understand and make use of information in documents.  I still identify as a scientist but have recently become immersed in web development and because of the excitement around making data more useful, I feel like a kid again.  If recent movements in web development are any indication for the future of science, then it is going to be amazing, *seriously* amazing.  Think automated meta-reviews.  Think a search engine that actually understands scientific data, code, and results. Think results as answers, not sentences buried in a series of static pdfs. Try [searching for 'best restaurants' in your favorite city](https://www.google.com/search?q=best+restaurants+in+brookly+ny&oq=best+restaurants+in+brookly+ny&aqs=chrome..69i57j0l5.8199j0j7&sourceid=chrome&espv=2&es_sm=91&ie=UTF-8) on Google.  You get a row of beautifully summarized cards, telling you not just the name of the restaurant, but the rating, average price, and some images to whet your appetite.  What is the equivalent world for science? Perhaps it's results in the form of summaries and meta-reviews or aggregated content on demand.  The steps to get there, aren't actually all that crazy.  To make this happen, scientists publishing new papers and data need to do three things in a way that is readable by a machine:

1. Give **context** for the data associated with your article. Who worked on the data? What is it measuring? How would you explain it to someone looking to reuse your data?

2. Use **short terminology** for the pieces of your data (that are understandable because you gave your data context). For example, once you've defined a context for describing a person and their date of birth, for example, you can just refer to them by their 'name' and 'birthday'and know that the information will be understood everywhere.

3. Give data a **unique identifier** so your data is citeable and discoverable (Services like [figshare](http://figshare.com), [Dryad](http://datadryad.org/) and [dataverse](http://thedata.org/) assign unique DOIs to data for free, for example.)

Because we are used to giving structure and context in scientific writing already, it should be an easy natural step to just add it in a format that machines can understand. Imagine this embedded in the code of a web page invisible to humans but available for a computer:

```
"@context": { "@vocab": "http://standardanalytics.io/stats/" },
  "@type": ["Correlation", "Statistic"],
  "description": "correlation between smoking and cancer incidence"
"variable": [
    { "@type": "Variable", "name": "Smoking.rate" },
    { "@type": "Variable", "name": "Cancer.incidence" }
  ], …
```

A machine reading this page now understands that a statistical test called a ‘correlation’ was done between two variables, ‘Smoking.rate’ and ‘Cancer.incidence’, and can reference (using @context) the definition of this statistical test. For the human on the other end doing a review of the effect of smoking behaviors on lung cancer, machines can now simplify this process by organizing search results according to statistical significance, for example.


## Shock. Horror. Data...
How many times has this happened to you? 1. Find a great scientific article. 2. Read the article and decide you want to get the data. 3. Follow links to other papers to try to hunt down the data. 4. You cannot actually find the data you want. 5. Email the author and very nicely request the data. 6. Wait. 7. Author sends you a file. 8. You have to email the author again to figure out what the file is and what things in the file mean. ...and it continues. 

Links between statements in scientific articles come in the form of 'references' that a human can follow but it is a manual and time consuming process. Linked data will make it so a computer can help us make these cross-references and revolutionize research.

## JSON-LD for science
 Earlier this year, a new format, [JSON-LD](http://json-ld.org), for publishing data on the web became a [web standard](http://www.w3.org/TR/json-ld/).  JSON-LD provides one way for leveraging the same [linked data technology standards](http://schema.org) used by all of the major players in search (Google, Yahoo!, Yandex, and Bing) along with > 5 million other websites too.  

> Data is messy and disconnected. JSON-LD organizes and connects it, creating a better Web. [JSON-LD](http://json-ld.org)

Data requires a certain level of understanding that web crawlers do not have unless you, as the author of the dataset, specify in a way that they can understand. That is the problem that JSON-LD solves.  

## Next steps
At Standard Analytics, our goal is to make linked data a reality for science with JSON-LD by automating 95% of the process and providing you with online tools (as well as an [open source command line interface](http://github.com/standard-analytics/ldpm)) for creating, storing, and sharing entire linked data research projects. We're a brand new company and are looking for people who are excited about sharing and connecting data to try it out. For now, we're focused on pre-print and open access publishing and our service is free for scientists. [Try publishing your research as linked data](http://publish.standardanalytics.io). Simply start with a pdf of a previously published paper or work in progress, add associated data and code, and see what linked data can do for your science.   

_If you're interested in learning more about JSON-LD and linked data, I highly recommend checking out these two short videos by Manu Sporny, the creator of JSON-LD. The first video is on [Linked Data](http://www.youtube.com/watch?v=4x_xzT5eF5Q) and the other introduces [JSON-LD](http://www.youtube.com/watch?v=vioCbTo3C-4). Manu Sporny's [blog](http://manu.sporny.org/) is also a great resource in general for JSON-LD and linked data in practice._ 
