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

background highlight should show on top of contains
The Reset Site Data Button acts strangely as the mouseleave can be triggered when the button resizes

https://uk.indeed.com/?from=gnav-app-tracker vs https://uk.indeed.com/

* Website Config
  * Confirmation + highlight before setting container
  * Add all the default page selectors

* Appearance
  * Make theme better
    * dark grey looks a bit drab?
  * General ease of use, presentation, word choice
  * svg icons for buttons, add, delete, close
  * animated slide in/out button

* trying to add multiple website filters of the same name triggers an error

* Publish the extension on the marketplace.

-- backlog --

* Better filter options: Whitelist, AND, OR, Groups of AND/OR.