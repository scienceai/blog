{{{
	"title" : "Science 3.0: science for machines",
	"tags": [ "blog" ],
	"category" : "announcement",
	"date" : "01-12-2014",
    "author": "Sebastien"
}}}

What if we could remove all of the frills and ceremony from scientific
publishing and just make the data, methods and results available, easy
to re-use, and verifiably reproducible? JavaScript developers working
on a new project have [npm](http://npmjs.org) to do just this - they
can simply specify other existing programs that the project depends on
(much like scientists want to reference other published papers) and
these 'dependencies' are installed with their new project using
[npm](http://npmjs.org). Amazing, and really fun too. In science
today, this workflow simply does not exist.  This is because
references ('dependencies') are in static, often proprietary formats.
Additionally, incorporating raw data from other studies requires
manual extraction. Finally, re-implementing previously published
methods is rarely possible, as publishing data and analytics in a
standardized, linked format is not common practice.

<figure style="border:1px solid grey; padding:10px;">
  <div class="pure-g">
    <div class="pure-u-1-2">
      <h2>Software Development</h2>

      <h3>My program</h3>

      <h4><a href="http://wiki.commonjs.org/wiki/Packages/1.1">package.json</a></h4>
      <pre><code style="font-size:100%; line-height:1.4em;">{
  "name": "my-program",
  "version": "0.2.1",
  "dependencies": {
    "program-a": "0.1.0",
    "program-b": "0.4.1",
    "program-c": "1.2.0"
   }
}
      </code></pre>
    </div>

    <div class="pure-u-1-2">
      <h2>Science</h2>
      
      <h3>My cancer research article</h3>

      <h4><a href="http://en.wikipedia.org/wiki/Scientific_citation">References</a></h4>
      <ul style="list-style-image:url('/img/pdf-icon.png');">
        <li>Author, Year. <strong>Data on smokers</strong>. Journal Name: Page.</li>
        <li>Author, Year. <strong>Lung cancer incidence</strong>. Journal Name: Page.</li>
        <li>Author, Year. <strong>Statistical methods</strong>. Journal Name: Page.</li>
      </ul>
      
    </div>
  </div>

  <div class="pure-g">
    <div class="pure-u-1-2">
      <pre><code class="bash" style="font-size:120%;">$ npm install</code></pre>
    </div>
    <div class="pure-u-1-2">
      <pre><code class="bash" style="color:red; font-size:120%;">null</code></pre>
    </div>
  </div>
  <figcaption style="font-size: 80%; line-height:1.4em;">
    Software developers can easily re-use previous work with package
    managers like <a href="http://npmjs.org">npm</a> handling the
    dependencies. Scientists have no such tools despite the fact that their work
    also depends on a lot of other work. Dependencies in science are
    trapped in static format
    (<a href="http://en.wikipedia.org/wiki/Scientific_journal">scientific
      journals</a>
    or <a href="http://en.wikipedia.org/wiki/Portable_Document_Format">PDF</a>).
  </figcaption>
</figure>


At Standard Analytics we package science in an accessible way and make
it reusable so that scientists - just like software developers - can
build new and world-changing things on the back of all of the work
that has come before. As former academic scientists ourselves, we
couldn't be more excited to take the first steps toward making this
dream a reality and we're pleased to introduce you to ```ldpm``` the
linked data package manager.

To find out more about ```ldpm``` and take it for a test run, check it
out on [github](https://github.com/standard-analytics/ldpm).

[![NPM](https://nodei.co/npm/ldpm.png)](https://nodei.co/npm/ldpm/)

```ldpm``` is inspired by [npm](http://npmjs.org). It leverages the
same technologies ([node.js](http://nodejs.org/)), re-uses a lot of the
[npm](https://github.com/isaacs/npm) dependencies _but_ differs from
npm in a very important way: it leverages
[JSON-LD](http://json-ld.org/) and
[RDF](http://www.w3.org/TR/rdf-primer/).

Let's see in practice why this matters with a detailed walk through,
using an example.

One of the latest blog posts of
[Mode Analytics](http://blog.modeanalytics.com/), presents an analysis
on whether Stanford graduates are good investments in the startup
world. This blog is truly remarkable, in that all the data that is
discussed is openly shared on
[their Github account](https://github.com/mode/blog).  Let's package
these data so that they can be easily re-used _ala npm_.

For that we create a data package.
Running:

<pre><code class="bash">$ ldpm init school.csv</code></pre>

wraps the [csv](http://en.wikipedia.org/wiki/Comma-separated_values) file
```school.csv``` containing the data of interest

```
"school","founders","unicorns"
"Stanford",482,13
"Harvard",487,8
"Berkeley",158,5
...
```

into the following [JSON-LD](http://json-ld.org/) document (```datapackage.jsonld```).

```
{
  "@context": "https://registry.standardanalytics.io/contexts/datapackage.jsonld",
  "name": "founders",
  "version": "0.0.0",
  "description": "Data used in Mode Analytics Stanford founders blog post",
  "citation": [ { "url": "http://blog.modeanalytics.com/are-stanford-grads-good-investments/" } ],
  "license": "CC0-1.0",
  "keywords": [ "schools", "graduates", "startup", "unicorn", "founders", "data" ],
  "author": {
    "name": "Sebastien Ballesteros",
    "email": "sebastien@standardanalytics.io"
  },
  "dataset": [
    {
      "name": "schools",
      "distribution": {
        "contentPath": "data/schools.csv"
      }
    }
  ]
}
```

The ```@context``` allows to map our document keys (```name```,
```version```, ```description```) to
[URLs](http://en.wikipedia.org/wiki/Uniform_resource_locator) so that
the semantic of the keys are precisely defined. For instance our context
maps ```name``` to
[```http://schema.org/name```](http://schema.org/name) making our
document entirely self describing for both human _and_ machines.

Then we publish it on the
[Standard Analytics data registry](https://registry.standardanalytics.io).

<pre><code class="bash">$ ldpm publish</code></pre>

We can retrieve the document with:

<pre><code class="bash">$ ldpm cat founders</code></pre>


```
{
  "@context": "https://registry.standardanalytics.io/contexts/datapackage.jsonld",
  "@id": "founders/0.0.0",
  "@type": "DataCatalog",
  "name": "founders",
  "version": "0.0.0",
  "description": "Data used in Mode Analytics Stanford founders blog post",
  "dataset": [
    {
      "@id": "founders/0.0.0/dataset/schools",
      "@type": "Dataset",
      "name": "schools",
      "distribution": {
        "@type": "DataDownload"
        "contentPath": "data/schools.csv",
        "contentUrl": "founders/0.0.0/dataset/schools/schools.csv",
        "contentSize": 193,
        "encodingFormat": "csv",
        "hashAlgorithm": "md5",
        "hashValue": "9e30179291974489de0171946bf26ff2",
        "encoding": {
          "contentSize": 167,
          "encodingFormat": "gzip"
        }
      }
    }
  ]
}
```

and we can see that ```@id``` properties have been added. These
properties indicate the URLs where each node of the document can be
retrieved.  All the URLs are relative to a base defined in the
@context.

<pre><code class="json">"@base": "https://registry.standardanalytics.io/"</code></pre>

The context also allows machine to know which of the properties are
indeed URLs. For instance, a human can easily understand that

<pre><code class="json">contentUrl: "founders/0.0.0/dataset/schools/schools.csv"</code></pre>

indicates a relative URL pointing to the content of the dataset but for
a machine ```contentUrl``` only contains a string. If we look closer at our
context:


<pre><code class="json">"isBasedOnUrl": { "@id": "http://schema.org/isBasedOnUrl", "@type": "@id" }</code></pre>


we can see that the semantic of ```contentUrl``` is the one of
[http://schema.org/contentUrl](http://schema.org/contentUrl) and it's
type is ```@id``` which is how [JSON-LD](http://json-ld.org/) allows
to specify that a string is indeed a URL.

The document is still as familiar as a classical
[package.json](http://wiki.commonjs.org/wiki/Packages/1.1) but a
machine can now pick out the hypermedia links!

Now let's see how one can consume this datapackage into an analysis.

If I want to investigate if Stanford graduates founded significantly
more
[Unicorns](http://techcrunch.com/2013/11/02/welcome-to-the-unicorn-club/)
(>1B$ valuation startups) than graduates of other universities, I can
simply list this data package as dependencies (```isBasedOnUrl```) of
a new datapackage.jsonld which, for now, contains nothing else.


```
{
  "@context": "https://registry.standardanalytics.io/contexts/datapackage.jsonld",
  "name": "founders-analysis",
  "version": "0.0.0",
  "description": "Unicorns founders and schools origin",
  "isBasedOnUrl": [ "founders/0.0.0" ]
}
```

Running

<pre><code class="bash">$ ldpm install --cache</code></pre>

will resolve all the dependencies (indicated by the relative URLs
listed in ```isBasedOnUrl```) and give me the data I need to perform
my analysis.

Having the data I need, I can fire up [R](http://www.r-project.org/)
and ask, _have Stanford grads founded significantly more unicorns than
Harvard ones?_

<pre><code class="r">schools <- read.csv("../datapackages/founders/data/schools.csv")
stanford <- schools$unicorns[schools$school == "Stanford"]
harvard <- schools$unicorns[schools$school == "Harvard"]
prop.test(stanford, stanford + harvard, alternative = "greater")</code></pre>


But let's not stop here. Statistical results are data after all and
therefore we can package them too! Even better, the vocabulary for
statistics is _well defined_ and _bounded_ which means that we can
keep using our semantic technologies (namely,
[JSON-LD](http://json-ld.org) and
[RDF](http://www.w3.org/TR/rdf-schema/)) to make it completely clear
(to both humans and machines) which
[statistical analytics](https://raw.github.com/standard-analytics/terms)
were used.

While we are at it, we can also indicate as metadata how the results
were obtained so that anyone (human or machine) can _fully reproduce_
our analysis. So let's add our findings to our previous datapackage.jsonld
(that we originally used to get the dependencies).


```
{
  "@context": "https://registry.standardanalytics.io/contexts/datapackage.jsonld",
  "name": "founders-analysis",
  "version": "0.0.0",
  "description": "Unicorns founders and schools origin",
  "license": "CC0-1.0",
  "repository": [
    {
      "codeRepository": "https://github.com/standard-analytics/blog.git",
      "path": "data/founders-analysis"
    }
  ],
  "keywords": [ "schools", "grads", "startup", "unicorns", "founders", "analysis" ],
  "author": {
    "name": "Sebastien Ballesteros",
    "email": "sebastien@standardanalytics.io"
  },
  "isBasedOnUrl": [ "founders/0.0.0" ],
  "analytics": [
    {
      "name": "propTest",
      "description": "Do Stanford Grads found significantly more Unicorns (>1B$ valuation startups) than other graduates?",
      "programmingLanguage": { "name": "R" },
      "runtime": "R",
      "targetProduct": { "operatingSystem": "Unix" },
      "sampleType": "scripts/propTests.R",
      "input":  [ "founders/0.0.0/dataset/schools" ],
      "output": [ "founders-analysis/0.0.0/dataset/stanfordVsHarvard" ]
    }
  ],
  "dataset": [
    {
      "name": "stanfordVsHarvard",
      "description": "Do Stanford grads found significantly more unicorns than Harvard ones?",
      "isBasedOnUrl": [ "founders-analysis/0.0.0/analytics/propTest#L4" ],
      "distribution": {
        "contentData": {
          "@context": {
            "@vocab": "http://standardanalytics.io/stats/"
          },
          "@type": "Proportion",
          "estimate": 0.61905,
          "statTest": {
            "@type": "ChisqTest",
            "statistic": 0.7619,
            "df": 1,
            "pValue": 0.19137
          }
        }
      }
    }
  ]
}
```

We can now publish this new ```datapackage.jsonld``` on the
[Standard Analytics registry](https://registry.standardanalytics.io).

<pre><code class="bash">$ ldpm publish</code></pre>

With such a file, anyone can _verify_ the results, plus there is more:
anyone can now **quote** these findings! Let's illustrate this last
point.

As I said before, every resource of a data package published acquires
its own URL, indicated by its ```@id```. I can retrieve the
published document (to know the ```@id```) with:

<pre><code class="bash">$ ldpm cat founders-analysis</code></pre>

Having the ```@id```, I can use the following URLs
[https://registry.standardanalytics.io/founders-analysis/0.0.0/dataset/stanfordVsHarvard](https://registry.standardanalytics.io/founders-analysis/0.0.0/dataset/dataset/stanfordVsHarvard)
anytime I want to give my text or comments some statistical backbone.

For instance, I can precisely quote that:

> Although Stanford grads have founded more Unicorns than Harvard ones,
> [there is no evidence to show that this difference is truly significant](https://registry.standardanalytics.io/founders-analysis/0.0.0/dataset/stanfordVsHarvard).


And the discussion could progress from there, based on concrete,
transparent, and constructive *quantitative* elements.

Lastly, let me stress that by simply following the ```@id``` of the
[JSON-LD](http://json-ld.org/) document, it is possible to go from an
analytic (here a [p-value](http://en.wikipedia.org/wiki/P-value)) all
the way back to the
[original data](https://registry.standardanalytics.io/founders/0.0.0/dataset/schools/schools.csv).

- As we have seen, the p-value is here: [https://registry.standardanalytics.io/founders-analysis/0.0.0/dataset/stanfordVsHarvard](https://registry.standardanalytics.io/unicorns-stanford/0.0.0/dataset/stanfordVsHarvard)

- The latest version of the full data package is here: [https://registry.standardanalytics.io/founders-analysis/0.0.0](https://registry.standardanalytics.io/unicorns-stanford/0.0.0)

- Finally, you can see every published version of the work here: [https://registry.standardanalytics.io/founders-analysis](https://registry.standardanalytics.io/unicorns-stanford)

To us, this is the beginning of a _new form of arguing, backed by
reproducible, quantitative evidence_.

Right now, the full API of the registry is described
[here](https://github.com/standard-analytics/linked-data-registry). That
being said we are working to add some
[hypermedia controls](http://www.markus-lanthaler.com/hydra/) so that
reading the API doc for the unsafe transitions (PUT, POST, DELETE)
becomes a thing of the past.

You may be thinking that generating these ```datapackage.jsonld``` is
too much hassle, and that scientists and data-enthusiasts have better
things to do than write such ```datapackage.jsonld``` files. Having
been there ourselves, we could not agree more: this has to be a
**fully effortless** process. So stay tuned for our launch!
