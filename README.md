A Chrome Extension Built in Vue, with the purpose of making people's (my) job search less tedious by enhancing the standard filtering options of job sites.

Currently consists of a popup window for configuring blacklists for keywords in the job title and company name.

Only works for uk.indeed.com, but designed to be easily extendable to other websites with minimal effort.

Bugs, features in development, and ideas:
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
		
* convert the saved selector list into something readable by script

* reconsider the logic used by script to determine which 
filter rules to use. 
  * It doesn't necessarily need to rely on the manifest. Perhaps
  consider just getting the domain from the url and using a dict to decide based on that.