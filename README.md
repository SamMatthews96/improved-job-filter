## Improved Job Filter

A Chrome Extension Built in Vue, with the purpose of making people's (my) job search less tedious by enhancing the standard filtering options of job sites.

### ToDo List:

-- current phase --

* on reed, the title field lights the entire job item, as it contains a button with invisible text
  * The solution may lie in using xpath to get multiple results, then choosing based on criteria
    * Is it within the container
    * Weight based on size related to container?

* Make it straightforward to disable the extension on a webpage

* The way it handles the website URLs should be reconsidered
  Possibly related, but it doesn't save properly in production
examples that should be supported
https://localhost:5731/*
https://localhost:5731/job-search/*
https://localhost:5731/job-search/?queryParam=value
ignore queryParams for now
what if the user has config for localhost:xxxx/*,
but wants to add something on localhost:xxxx/yyyy/
Shelve this issue until there's an instance where this is needed.

* Add a 'none' option for collections

* Add website field button should have highlight message if disabled

* Add all the default page selectors

* Would the UX be better if the profile could be editted in the script menu
* the filter does not update if a website field container is updated

* UI / UX
  * General
    * svg icons for buttons, add, delete, close
    * disabled buttons should show different cursor
  * Script > .open-button
    * should have a logo
    * The logo could be some combination of a magnifying glass and a funnel
    * animated slide in/out button
  * ConfigPaneSelectContainer
    * Revise wording - 
    * Window is too wide
    * website field 
      * should default to the base url, 
      * probably shouldn't be a text field
    * submit button
      * it should explain why it is disabled
  * WebsiteConfigPane
    * Title should be the name of the extension
      * maybe have a sub title for the panel's purpose
      * Selected Profile could be centered, and named "Select filter profile: "
  * AddWebsiteFilterField
    * Should give user feedback via mouseover
  * AddFieldsToWebsiteFilter
    * should use a warning icon
    * pad / center
    * subtle color change, towards orange?
  * WebsiteFieldConfig
    * Visually, the container element should be a header / container of the fields
    * Validity feedback:
      * Could use background instead of border
      * Could use icons, i.e. tick vs cross/error symbol
      * If an element is invalid, there should be feedback, perhaps when mouseing over icon
  * Popup
    * Enable current page
      * improve wording
      * if current page is enabled
        * could disable button
        * could have disable option
          * would need to have confirmation
    * Add Filter Profile
      * Consider its location
      * Duplicate profile option
    * FilterProfileEdit 
      * Delete Profile
        * Confirmation
        * should be an X in the corner of the current profle config
        * It should be very clear as to what the displayed settings do, and to which container they belong
  * NewFilterModal
    * I don't like it, not 100% sure why yet
    * At the least, it should focus the text box on open

* Publish the extension on the marketplace.

-- backlog --

* Some websites may have multiple layouts that warrant checking for multiple containers
* light / dark theme toggle
* Ideas
  * Do filters for salary
  * show excluded count
  * way of viewing the excluded ones