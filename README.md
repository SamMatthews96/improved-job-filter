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

* pageSelectors.json should add to config by default

* Ignore ", /" when splitting by word.

* Appearance
  * use a theme that doesn't look like shit
    * consistent text size, font
    * borders, background, spacing
  * General ease of use, presentation, word choice
  * svg icons for buttons, add, delete, close
  * Filter Profile
  * Website Config

* Inform the user if there is a mismatch between the website config and the selected filter.
  * If a filter in website is missing from profile, show message (and button?) in profile
  * If a filter in profile is missing from website, show message (and button?) in website

* Warning if the filter cannot find the container or any child fields

* highlight elements on the page when mouseover website filter fields
* edit button to update website filter fields

* Confirmation upon trying to add any website filter field
* Confirmation upon adding the title filter field 
* Confirmation before clear site data

* Partial match for website filter field

* Publish the extension on the marketplace.

-- backlog --

* Better filter options: Whitelist, AND, OR, Groups of AND/OR.
* Uncaught SyntaxError: Identifier 'lr' has already been declared
* A "how-to" guide