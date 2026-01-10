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
  * just make it not look like shit

* error in script, possibly due to creating multiple overlays

* Improve Filters
  * Better filter options: Whitelist, AND, OR, Groups of AND/OR.
  * The keyword filter considers "C++," and "C++" to be distinct words. Consider ignoring commas when splitting titles by word.
  * import to profile from websites that use that profile
  * import to website from profile that website uses (will need to support empty ElementPath)

* Website filters
  * Will need to make sure that the app gracefully handles a mismatch of keys between a page vs profile filter. 

* The pageSelectors.json adds to config by default

* Field entry QoL:
  * after clicking submit, getElementWithText may target a different field, so there should be a confirmation after doing the initial ConfigPageSelectContainer submission. It may need to be a partial text, in which case contains would be more appropriate. This will need ^^ the first item done first, as going by partial text allows for more uncertainty. The first option should account for that.

* Chrome issues
  * popup text is too small
  * text fields for title is large
  * not all elements follow the exact same structure
    e.g. > a:nth-child(1)[id="sj_5f88c33f92150522"][data-mobtk="1jeimd6q4iohq800"]
    and > a:nth-child(1)[id="sj_5f88c33f92150522"][data-mobtk="1jeimd6q4iohq801"]
  * popup doesn't seem to store correctly. Possible runtime issue

### Future Development Ideas:
* What if it could automatically cycle through jobs, going to the next page upon reaching the end. For each job, pull information from the job description, and export them somewhere?
