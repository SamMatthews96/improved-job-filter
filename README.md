## Improved Job Filter

A Chrome Extension Built in Vue, with the purpose of making people's (my) job search less tedious by enhancing the standard filtering options of job sites.

### ToDo List:

-- current phase --

Requires internet
* on reed, the title field lights the entire job item, as it contains a button with invisible text
  * The solution may lie in using xpath to get multiple results, then choosing based on criteria
    * Is it within the container
    * Weight based on size related to container?
* The way it handles the website URLs should be reconsidered
  Possibly related, but it doesn't save properly in production

Doesn't require internet

* Would the UX be better if the profile could be editted in the script menu
* Add "AddMissingFields" back to Popup
* Trying to add multiple website filters of the same name should give error feedback
* Should the website filter fields be an ordered array
* Consider if the having to match to popup fieldNames requires that the fieldName in the website config be unique 
* Make it straightforward to disable the extension on a webpage
* Add all the default page selectors

* UI / UX
  * General
    * dark grey looks a bit drab?
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
      * should be disabled until a container is found
      * it should explain why it is disabled
  * WebsiteConfigPane
    * Title should be the name of the extension
      * maybe have a sub title for the panel's purpose
      * Selected Profile could be centered, and named "Select filter profile: "
  * AddWebsiteFilterField
    * Button should id disable if empty or duplicate
    * Should give user feedback, perhaps via button mouseover
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
        * Each field should be more visually part of one block, perhaps inside a subtle border, though this is due to be reworked under the better filter options task
      * Add Field could use same component as in website
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