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

* Improve Filters
  * The filter fields allow spaces, which don't work with the current filter-by-word logic
  * Better filter options: Whitelist, AND, OR, Groups of AND/OR.
  * The filter considers "C++," and "C++" to be distinct words. Consider ignoring commas when splitting titles by word.
  *	Create filter profiles: Currently the filter is universal, and a user might want different filters on different websites.

* Filter profiles
  * Each filter profile would be a collection of filter settings, for example, a number of blacklisted & whitelisted fields. 

* Website filters
  * each website, after calculating the container element(s), will allow the user to identify fields. In this context, a field would be a element of a search-result. The text-content of this element is what would be matched against the current filter profile.
  * Will need to make sure that the app gracefully handles a mismatch of keys between a page vs profile filter. 

* Support custom fields.
  * So like we have for title, we need to add that process for adding custom fields
  * Company name, for example. 
  * Add button to add field, then a field name and sample text
  * Eg: "Company Name" and "Company Title 2"
* The pageSelectors.json needs to added to config by default

* Field entry QoL:
  * after clicking submit, getElementWithText may target a different field, so there should be a confirmation after doing the initial ConfigPageSelectContainer submission.
  * it may need to be a partial text, in which case contains would be more appropriate. This will need ^^ the first item done first, as going by partial text allows for more uncertainty. The first option should account for that.

Priority:
  * Consider how Filter Profiles will work

### Future Development Ideas:
* What if it could automatically cycle through jobs, going to the next page upon reaching the end. For each job, pull information from the job description, and use AI to give jobs a score based on the user's qualifications and goals.
