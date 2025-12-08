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

* Filter profiles
  * Each filter profile would be a collection of filter settings, for example, a number of blacklisted & whitelisted fields. 
* Website filters
  * each website, after calculating the container element(s), will allow the user to identify fields. In this context, a field would be a element of a search-result. The text-content of this element is what would be matched against the current filter profile.
  * Will need to make sure that the app gracefully handles a mismatch of keys between a page vs profile filter. 
  
* We have the beginnings of creating a function to create a relative selector: a string that, when we call container.children[i].querySelector, gets one of the fields to be filtered.
  * Once it is refined, we need to pass the title selector in the emit,
then make the UI to support custom fields.
  * Also, the config needs to be saved.
  * Also, the pageSelectors.json needs to added to the storage by default

* Field entry QoL:
  * after clicking submit, getElementWithText may target a different field, so there should be a confirmation after doing the initial ConfigPageSelectContainer submission.
  * it may need to be a partial text, in which case contains would be more appropriate. This will need ^^ the first item done first, as going by partial text allows for more uncertainty. The first option should account for that.


### Future Development Ideas:
* What if it could automatically cycle through jobs, going to the next page upon reaching the end. For each job, pull information from the job description, and use AI to give jobs a score based on the user's qualifications and goals.
