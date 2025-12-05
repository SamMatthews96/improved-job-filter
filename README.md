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
* Publish the extension on the marketplace.

* Styling

* Improve Filter
  * The filter fields allow spaces, which don't work with the current filter-by-word logic
  * Better filter options: Whitelist, AND, OR, Groups of AND/OR.
  * The filter considers "C++," and "C++" to be distinct words. Consider ignoring commas when splitting titles by word.
  *	Create filter profiles: Currently the filter is universal, and a user might want different filters on different websites.

* User customisation
  * Allow users to add websites to the filter list
  * Allow users to add filter fields.
  * Consider how to make as user friendly as possible. I built this by finding the CSS selectors of the search container, job title and company name, but that isn't user friendly.
  * At its core, the app needs to know the selector for the search container, and then any fields contained within each search item. 

### Future Development Ideas:
* What if it could automatically cycle through jobs, going to the next page upon reaching the end. For each job, pull information from the job description, and use AI to give jobs a score based on the user's qualifications and goals.
