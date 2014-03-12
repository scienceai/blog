{{{
	"title" : "Quantitative arguments as hypermedia",
	"tags": [ "blog" ],
	"category" : "announcement",
	"date" : "01-14-2014",
    "author": "Joseph"
}}}


<br>

> To date, the Web has developed most rapidly as a medium of documents for people
> rather than for data and information that can be processed automatically.
> [Berners-Lee et al, 2001](http://www-sop.inria.fr/acacia/cours/essi2006/Scientific%20American_%20Feature%20Article_%20The%20Semantic%20Web_%20May%202001.pdf)

Since this sentence was written, twelve years ago, ambitious and collective
initiatives have been undertaken to [revolutionize](http://www.ted.com/talks/tim_berners_lee_on_the_next_web.html)
what machines can do for us on the web. When I make a purchase online, my email
service is able to understand it from the purchase confirmation email,
communicate to the online store service, authenticate, obtain information on the
delivery, and provide me with a real-time representation of where the item is
located. Machines now have the means to process data in a smarter way, and to
communicate over it!




However, when it comes to exchanging quantitative arguments, be it in a blog post
or in a scientific article, web technology does not bring us much further than
what can be done with pen and paper. Let's take the following HTML snippet,
inspired from a [New York Times blog post](http://economix.blogs.nytimes.com/2009/05/05/obesity-and-the-fastness-of-food/):


  <div class="pure-g-r">
    <div class="pure-u-1-2">
      <div class="l-box">
        <pre id="obesity" style="font-size: 90%;">
<span class="html-tag">&lt;p&gt;</span>
The French spend the most time per day eating, but have one of the lowest obesity rates among developed nations. Coincidence? Maybe not, the statistics from OECD countries reveal there is a -0.45 correlation between these two quantities (p=0.06).
<span class="html-tag">&lt;/p&gt;</span>
        </pre>
      </div>
    </div>
    <div class="pure-u-1-2">
	<blockquote>
<p>
The French spend the most time per day eating, but have one of the lowest
obesity rates among developed nations. Coincidence? Maybe not, the statistics
from OECD countries reveal there is a -0.45 correlation between these
two quantities (p=0.06).
</p>
	</blockquote>
    </div>
  </div>

While this argument can be understood by humans, machines only see it as
a plain piece of text. There is no way for them to know that this is
a correlation analysis, no easy way for them to provide me with the raw data
that lies behind that number, and no way to efficiently bring me some
perspective with results from other studies on the same subject. But wouldn't
that be helpful?


Inspiration to move forward can be found in the [schema.org](http://schema.org)
initiative, a collaboration between the main search
engines, including [Bing](http://bing.com), [Google](http://Google.com), [Yahoo!](http://yahoo.com)
and [Yandex](http://yandex.com), that have started in 2011 defining a collection of [schemas](http://en.wikipedia.org/wiki/RDF_Schema),
or [html tags](http://www.w3schools.com/html/html5_semantic_elements.asp), that
webmasters can use to mark up their pages.
This type of shared vocabularies have brought machines to a first level of
understanding: they can know when they are referring to the same notion, which
sets the basis for smarter communication. The schemas also define an ontology,
 sets of relations between these common notions. For example, they state
that the description of an [order](http://schema.org/Order) usually contains a
[customer](http://schema.org/customer) (that can either be a [person](http://schema.org/Person)
or an [organisation](http://schema.org/Organization)), as well as a [billing address](http://schema.org/billingAddress),
a [confirmation number](http://schema.org/confirmationNumber), etc. Using this
information, machines know which [properties](http://www.w3.org/TR/rdf-schema/#ch_properties)
to expect when encountering a object of a given [Class](http://www.w3.org/TR/rdf-schema/#ch_classes),
and can be told what to do with their content.


Structured data has contributed to the explosion of services on the web, and not
only from the *search* companies. For example, the [BBC](http://www.bbc.co.uk/blogs/internet/posts/Linked-Data-Connecting-together-the-BBCs-Online-Content)
has built a stunning [Wildlife finder](http://www.bbc.co.uk/nature/wildlife)
that aggregates and organizes data from all over the web for every single
living species on the planet! Another exciting example is the [Veterans Job Bank](http://www.whitehouse.gov/blog/2011/11/07/open-innovation-heroes-introducing-veterans-job-bank) initiative of the [White House](http://www.whitehouse.gov/),
that simply required employers willing to hire veterans to mark up their online
job listing: it started with [over 500 000](http://fcw.com/articles/2011/11/09/white-house-gets-help-from-google-linkedin-on-veterans-job-initiatives.aspx?s=fcwdaily_101111)
job opportunities for veterans in the US!

In our context, let's just mark up our original example with [RDFa Lite](http://www.w3.org/TR/rdfa-lite/)
attributes:


  <div class="pure-g-r">
    <div class="pure-u-3-5">
      <div class="l-box" style="padding-top:0px;">
        <pre id="obesity" style="font-size: 90%;">
<span class="html-tag">&lt;p&gt;</span> <span class="rdfa-tag">vocab</span>="<a href="http://schema.org/">http://schema.org/</a>"
	<span class="rdfa-tag">prefix</span>="<a href="http://standardanalytics.io/stats/">stats: http://standardanalytics.io/stats/</a>"
	<span class="rdfa-tag">resource</span>="<a href="#obesity">#obesity</a>"
	<span class="rdfa-tag">typeof</span>="<a href="http://schema.org/Comment">Comment</a> <a href="http://standardanalytics.io/stats/Correlation">stats:Correlation</a> <a href="http://standardanalytics.io/stats/Statistic">stats:Statistic</a>"<span class="html-tag">&gt;</span>

The French spend the most <span class="html-tag">&lt;span</span> <span class="rdfa-tag">property</span>="<a href="http://schema.org/referenceValue">schema:referenceValue</a>"<span class="html-tag">&gt;</span>  
<span class="html-tag">&lt;span</span> <span class="rdfa-tag">property</span>="<a href="http://schema.org/name">schema:name</a>"<span class="html-tag">&gt;</span>time per day eating<span class="html-tag">&lt;/span&gt;</span>,
but have one of the lowest
<span class="html-tag">&lt;span</span> <span class="rdfa-tag">property</span>="<a href="http://schema.org/name">schema:name</a>"<span class="html-tag">&gt;</span>obesity rates<span class="html-tag">&lt;/span&gt;</span> <span class="html-tag">&lt;/span&gt;</span>
among developed nations. Coincidence? Maybe not, the statistics
from OECD countries reveal there is a
<span class="html-tag">&lt;span</span> <span class="rdfa-tag">property</span>="<a href="http://standardanalytics.io/stats/estimate">stats:estimate</a>"<span class="html-tag">&gt;</span>-0.45<span class="html-tag">&lt;/span&gt;</span>
correlation between these two quantities
(<span class="html-tag">&lt;span</span> <span class="rdfa-tag">property</span>="<a href="http://standardanalytics.io/stats/statisticalTest">stats:statisticalTest</a>"<span class="html-tag">&gt;</span>
 p=<span class="html-tag">&lt;span</span> <span class="rdfa-tag">property</span>="<a href="http://standardanalytics.io/stats/pValue">stats:pValue</a>"<span class="html-tag">&gt;</span>0.06<span class="html-tag">&lt;/span&gt;</span>
 <span class="html-tag">&lt;/span&gt;</span>).
<span class="html-tag">&lt;/p&gt;</span>

         </pre>
      </div>
    </div>
    <div class="pure-u-2-5">
	<blockquote>
<p vocab="http://schema.org/"
   prefix="stats: http://standardanalytics.io/stats/"
   resource="#obesity"
   typeof="Comment stats:Correlation stats:Statistic">
The French spend the most time per day eating, but have one of the lowest
obesity rates among developed nations. Coincidence? Maybe not, the statistics
from OECD countries reveal there is a -0.45 correlation between these
two quantities (p=0.06).
</p>
	</blockquote>
    </div>
  </div>


By referring to an [RDF](http://www.w3.org/RDF/)
[statistical vocabulary](http://standardanalytics.io/stats)
we have been working on, we make it explicit that the argument is based on a correlation estimate,
which is provided
along with a p-value expressing how strong the evidence is. In this way,
metadata can be attached directly to each argument, bringing the browsability
of scientific results to a whole new level! Based on
these tags, machines now have a sense of the significance
of a statistical test, making it virtually possible for a search engine to
automatically provide me with perspective on any quantitative argument, based on
alternative studies on the same question. In this example, I could figure out
in a breeze if other studies corroborate such a relation between obesity and
average time spent eating, ranked by their strength of evidence, or know about
any related analysis that could bring me some deeper insights on the matter!


But more can still be done. The statement, even marked up, remains somewhat
arbitrary. It leaves it to the readers to faithfully
believe and interprete the numbers, or to manually make their way to the
supplementary materials (in best case scenarios of scientific publishing)
or write to the author for more
details. This point has understandably fed vivid discussions [online](http://phys.org/news/2013-09-science-crisis.html)
and in [newspapers](http://www.economist.com/news/briefing/21588057-scientists-think-science-self-correcting-alarming-degree-it-not-trouble)
on verifiability and reusability of results, shedding skepticism over
[scientific findings in general](http://www.nytimes.com/2012/04/17/science/rise-in-scientific-journal-retractions-prompts-calls-for-reform.html).
Again, schemas and linked data provide with a simple solution here. What if I
could attach to my argument an unambiguous description of how I got to the
stated numbers, in the standard format that is used to exchange linked data
on the web (a.k.a. [JSON-LD](http://json-ld.org/)), and refering to the same
[standardised vocabulary](http://standardanalytics.io/stats)?


It would simply look like that:



  <div class="pure-g-r">
    <div class="pure-u-3-5">
      <div class="l-box" style="padding-top:0px;">
        <pre id="obesity" style="font-size: 90%;">
<span class="html-tag">&lt;p&gt;</span> <span class="rdfa-tag">vocab</span>="<a href="http://schema.org/">http://schema.org/</a>"
	<span class="rdfa-tag">prefix</span>="<a href="http://standardanalytics.io/stats/">stats: http://standardanalytics.io/stats/</a>"
	<span class="rdfa-tag">resource</span>="<a href="#obesity">#obesity</a>"
	<span class="rdfa-tag">typeof</span>="<a href="http://schema.org/Comment">Comment</a> <a href="http://standardanalytics.io/stats/Correlation">stats:Correlation</a> <a href="http://standardanalytics.io/stats/Statistic">stats:Statistic</a>"<span class="html-tag">&gt;</span>

The French spend the most <span class="html-tag">&lt;span</span> <span class="rdfa-tag">property</span>="<a href="http://schema.org/referenceValue">schema:referenceValue</a>"<span class="html-tag">&gt;</span>  
<span class="html-tag">&lt;span</span> <span class="rdfa-tag">property</span>="<a href="http://schema.org/name">schema:name</a>"<span class="html-tag">&gt;</span>time per day eating<span class="html-tag">&lt;/span&gt;</span>, but have one of the lowest
<span class="html-tag">&lt;span</span> <span class="rdfa-tag">property</span>="<a href="http://schema.org/name">schema:name</a>"<span class="html-tag">&gt;</span>obesity rates<span class="html-tag">&lt;/span&gt;</span> <span class="html-tag">&lt;/span&gt;</span> among developed nations. Coincidence? Maybe not, the statistics
from OECD countries reveal there is a
<span class="html-tag">&lt;span</span> <span class="rdfa-tag">property</span>="<a href="http://standardanalytics.io/stats/estimate">stats:estimate</a>"<span class="html-tag">&gt;</span>-0.45<span class="html-tag">&lt;/span&gt;</span> correlation between these
two quantities
(<span class="html-tag">&lt;span</span> <span class="rdfa-tag">property</span>="<a href="http://standardanalytics.io/stats/statisticalTest">stats:statisticalTest</a>"<span class="html-tag">&gt;</span>
p=<span class="html-tag">&lt;span</span> <span class="rdfa-tag">property</span>="<a href="http://standardanalytics.io/stats/pValue">stats:pValue</a>"<span class="html-tag">&gt;</span>0.06<span class="html-tag">&lt;/span&gt;</span>
<span class="html-tag">&lt;/span&gt;</span>).
See <span class="html-tag">&lt;span</span> <span class="rdfa-tag">property</span>="<a href="http://standardanalytics.io/stats/pValue">schema:isBasedOnUrl</a>" <span class="rdfa-tag">href</span>="<a href="http://registry.standardanalytics.io/obesity">http://registry.standardanalytics.io/obesity</a>"<span class="html-tag">&gt;</span>here<span class="html-tag">&lt;/span&gt;</span> for more details.
<span class="html-tag">&lt;/p&gt;</span>
        </pre>
      </div>
    </div>
    <div class="pure-u-2-5">
	<blockquote>
<p vocab="http://schema.org/"
   prefix="stats: http://standardanalytics.io/stats/"
   resource="#obesity"
   typeof="Comment stats:Correlation">
The French spend the most time per day eating, but have one of the lowest
obesity rates among developed nations. Coincidence? Maybe not, the statistics
from OECD countries reveal there is a -0.45 correlation between these
two quantities (<a property="sh:isBasedOnUrl" href="http://registry.standardanalytics.io/obesity-analysis/0.0.0">p=0.06</a>).
See <a href = "http://registry.standardanalytics.io/obesity">here</a> for more details.
</p>
	</blockquote>
    </div>
  </div>

The ``isBasedOnUrl`` link taking me to a [5-stars](http://5stardata.info/) description of the analysis.
The quantitative argument is now
based on fully transparent and reproducible calculations. Every moving piece is
here for readers (and reviewers) to verify the argument and push the exploration further.



What we are introducing here is **no science-fiction**. Pre-alpha version of
the [registry](http://registry.standardanalytics.io) and its [client](https://github.com/standard-analytics/ldpm)
used to host your quantitative arguments are already available, and most importantly
the [linked data](http://linkeddata.org/) technology has proven to scale: since the launch
of the project in 2011, [over 5 million sites](https://semanticweb.com/schema-org-chat-googles-r-v-guha_b40607)
have been marked up with schema.org vocabulary!  For you to start sharing [5-stars](http://5stardata.info/)
quantitative arguments **today**,
we have published a [JSON-LD packaging tool](http://cran.r-project.org/web/packages/RJSONLD/index.html)
for [R](http://www.r-project.org/) users. Simply install the [RJSONLD](https://github.com/standard-analytics/RJSONLD) package,
available on [CRAN](http://cran.r-project.org/), and add a single line to your
script for every analytic you wish to export in [JSON-LD](http://json-ld.org/)
format:


<pre id="obesity-R"><code class="r">
library(RJSONLD)
obesity <- read.csv('obesity.csv')
result = cor.test(obesity$ObesityRate,obesity$MinutesSpentEating)
<span class="stats">RJSONLD.export</span>(result,'ObesityFoodFastness.jsonld')
</code></pre>



The current version of the [statistical markup vocabulary](http://standardanalytics.io/stats)
I have been mentioning in this post covers the most common notions of statistical analysis,
and we will be expanding it. Yet, it is still at a draft stage and its
construction should not remain an individual initiative: we warmly encourage
anyone to debate and enrich it! If you can't find a
[Class](http://www.w3.org/TR/rdf-schema/#ch_classes)
for the statistical
test you have been working with, if you're more into [Bayesian statistics](http://en.wikipedia.org/wiki/Bayesian_statistics)
, or if there is there anything you'd like to suggest, let's build up this
vocabulary together!

**How can you contribute?** Simply sign in to get a [Github](https://github.com/)
account if you do not already have one, go to the [issue tracker](https://github.com/standard-analytics/schemas/issues)
to provide feedback, propose extensions, and share the word!


We have shown you here how to tag your quantitative arguments to make them
browsable, and how to export shareable [JSON-LD](http://json-ld.org/) versions of your
statistical results in [R](http://www.r-project.org/). To learn about
automatically marking up and packaging your analysis to publish [five-stars science](http://standardanalytics.io)
in three simple steps, stay tuned!
