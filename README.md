## Improved Job Filter

A Chrome Extension Built in Vue, with the purpose of making people's (my) job search less tedious by enhancing the standard filtering options of job sites.

While this is a work in progress, it is a MVP that delivers on the basic idea. Features a popup window for configuring blacklists for keywords in the job title and company name, and hides jobs containg any such keywords. Currently works for:
* [Indeed(uk)](https://uk.indeed.com/)
* [Reed](https://www.reed.co.uk/)
* [Totaljobs](https://www.totaljobs.com/)
* [findajob.dwp.gov.uk](https://findajob.dwp.gov.uk/)
* [4 Day Week](https://4dayweek.io/)
* [LinkedIn](https://www.linkedin.com/)
* [Monster](https://www.monster.com/)
* [CV-Library](https://www.cv-library.co.uk/)
* [Seek](https://www.seek.com.au/)
* [ZipRecruiter](https://www.ziprecruiter.co.uk/)
* [Glassdoor](https://www.glassdoor.co.uk/)

### ToDo List:

-- current phase --


* Appearance
  * Make theme better
    * dark grey looks a bit drab?
  * General ease of use, presentation, word choice
  * svg icons for buttons, add, delete, close

* Filter Profile
  * If a filter in website is missing from profile, show message (and button?) in profile
  * Show error if user includes punctuation (, or /) in filter profile field

* Website Config
  * highlight elements on the page when mouseover website filter fields
  * Add container as a field
  * Confirmation upon trying to add any website filter field
  * Confirmation upon adding the title filter field 
  * Confirmation before clear site data
  * Partial match for website filter field
  * Add all the default page selectors
  * edit button to update website filter fields
  * If a filter in profile is missing from website, show message (and button?) in website
  * Warning (and resolve option) if the filter cannot find the container or any child fields


* Publish the extension on the marketplace.

-- backlog --

* Better filter options: Whitelist, AND, OR, Groups of AND/OR.
* Uncaught SyntaxError: Identifier 'lr' has already been declared
* A "how-to" guide