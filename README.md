A Chrome Extension Built in Vue, with the purpose of making people's (my) job search less tedious by enhancing the standard filtering options of job sites.

Currently consists of a popup window for configuring blacklists for keywords in the job title and company name.

Currently supports:
* https://uk.indeed.com/
* https://www.reed.co.uk/
* https://www.totaljobs.com/
* https://findajob.dwp.gov.uk/
* https://4dayweek.io/
* https://www.linkedin.com/
* https://www.monster.com/
* https://www.cv-library.co.uk/

Bugs, features in development, and ideas:
* the saving/loading of config doesn't work properly:
  * chrome.runtime will allow for saving of arrays, but returns them as dicts, indexed at "0","1" ...
  * This causes an issue when trying to iterate using a foreach.

* right now the filter can accept spaces, which don't work with the current filter-by-word logic
* add support for other websites
* add filter fields
  * pay (min,max)
  * tags
  * (consider how to handle & display fields that may not be present on every website)

* What if it could automatically cycle through jobs, going to the next page upon being finished. For each job, pull information from the job description, and use AI to  

*	If a job container contains elements that are not jobs, ignore
*	create filter profiles that auto switch by website
*	add an add custom website + css setting. 
  * Add a mini tutorial showing how it works