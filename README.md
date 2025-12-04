## Improved Job Filter

A Chrome Extension Built in Vue, with the purpose of making people's (my) job search less tedious by enhancing the standard filtering options of job sites.

While this is a work in progress, it is a MVP that delivers on the basic idea. Features a popup window for configuring blacklists for keywords in the job title and company name, and hides jobs containg any such keywords. Currently works for:
* https://uk.indeed.com/
* https://www.reed.co.uk/
* https://www.totaljobs.com/
* https://findajob.dwp.gov.uk/
* https://4dayweek.io/
* https://www.linkedin.com/
* https://www.monster.com/
* https://www.cv-library.co.uk/

### Installation
While this is currently a work in progress and not deployed to the google marketplace, this extension can still be used by doing the following:
* Install Google Chrome, Node and NPM if not done so already.
* Clone/Download this repository.
* Navigate to the project's folder in the command line.
* type "npm install" and enter, then wait for the required modules to install.
* type "npm run build" and enter. Wait for the build to finish. In the project folder, a dist folder should have been created in the root of the project. Make a note of where the dist folder is.
* Open Google Chrome and navigate to your extensions. Either click the triple dots in the top right corner and go to Extensions > Manage Extensions, or simply enter "chrome://extensions" in the brower search bar.
* Enable Developer mode in the top right of the window.
* Click "Load unpacked" in the top left of the window. 
* Navigate to the location of the dist folder that was previously created and select that folder. You should now see improved-job-filter 
* The extension should now be successfully installed.

### ToDo List:
* Styling
* Improve Filter
  * The filter fields allow spaces, which don't work with the current filter-by-word logic
  * If the filter works off of words anyway, then perhaps the config should just feature a single text field instead of requiring the user to click "add" for each keyword.
  * Better filter options: Whitelist, AND, OR, Groups of AND/OR.
  * The filter considers "C++," and "C++" to be distinct words. Consider ignoring commas when splitting titles by word.
* Add support for other websites
  * glassdoor
  * seek
  * zip recruiter
* User customisation
  * Allow users to customise their own filters for websites not included. Any website that features search results could use an app like this.
  * Allow users to add fields to the existing filter list.
  * Consider how to make as user friendly as possible. I built this by finding the CSS selectors of the search container, job title and company name, but that isn't user friendly.
  * At its core, the app needs to know the selector for the search container, and then any fields contained within each search item.  
*	Create filter profiles: Currently the filter is universal, and a user might want different filters on different websites.
* What if it could automatically cycle through jobs, going to the next page upon reaching the end. For each job, pull information from the job description, and use AI to give jobs a score based on the user's qualifications and goals
  * Certainly a widening of the scope, so not yet.
*	If a job container contains elements that are not jobs, ignore
