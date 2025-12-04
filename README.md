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

Installation
While this is currently a work in progress and not deployed to the google marketplace, this extension can still be used by doing the following:
* Install Google Chrome, Node and NPM if not done so already
* Clone/Download this repository
* Navigate to the project's folder in the command line
* type "npm install" and enter, then wait for the required modules to install
* type "npm run build" and enter. Wait for the build to finish. In the project folder, a dist folder should have been created in the root of the project. Make a note of where the dist folder is
* Open Google Chrome and navigate to your extensions. Either click the triple dots in the top right corner and go to Extensions > Manage Extensions, or simply enter "chrome://extensions" in the brower search bar.
* Enable Developer mode in the top right of the window
* Click "Load unpacked" in the top left of the window. 
* Navigate to the location of the dist folder that was previously created and select that folder. You should now see improved-job-filter 
* The extension should now be successfully installed.

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
