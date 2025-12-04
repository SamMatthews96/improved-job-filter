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
* right now the filter can accept spaces, which don't work with the current filter-by-word logic
* add support for other websites
* add support for custom, user defined websites
*	create filter profiles that auto switch by website
* add more filter fields
  * pay (min,max)
  * tags
  * (consider how to handle & display fields that may not be present on every website)
  * custom, user defined fields
* Remove the global state as it seems unnecessary
* What if it could automatically cycle through jobs, going to the next page upon reaching the end. For each job, pull information from the job description, and use AI to give jobs a score based on the user's qualifications and goals
  * Certainly a widening of the scope, so not yet.

*	If a job container contains elements that are not jobs, ignore
