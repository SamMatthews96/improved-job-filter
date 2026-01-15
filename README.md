## Improved Job Filter

A Chrome Extension Built in Vue, with the purpose of making people's (my) job search less tedious by enhancing the standard filtering options of job sites.

### ToDo List:

-- current phase --

* The component names are not easy to understand
* Is it straightforward to disable the extension on a webpage
* trying to add multiple website filters of the same name should give error feedback

* Better filter options: Whitelist, AND, OR, Groups of AND/OR.
* Add all the default page selectors

* Website Config
  * https://uk.indeed.com/?from=gnav-app-tracker vs https://uk.indeed.com/
    When setting the container it should default to the base url

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
      * Selected Profile could be centered, and named "Select filer profile: "
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
    * When adding a new profile, it should navigate to that profile
    * Enable current page
      * improve wording
      * if current page is enabled
        * could disable button
        * could have disable option
          * would need to have confirmation
    * Add Filter Profile
      * Consider its locate
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