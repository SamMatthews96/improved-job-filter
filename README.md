## Improved Job Filter

A Chrome Extension Built in Vue, with the purpose of making people's (my) job search less tedious by enhancing the standard filtering options of job sites.

### ToDo List:

-- current phase --

1:
2:
3: 

* Refactor
  * Helpers file is largely related to getting elements and ElementProperties
  * instead of using watch(state, ...) for everything, is it worth using signals
  * Filter is about to get a whole lot larger, and could potentially be broken up
    * It doesn't just filter anymore, it's more related to modifying the page appearance
  * The component names are not easy to understand

* adding a number field then deleting can cause other fields to wrongly display as valid
* Is it straightforward to disable the extension on a webpage
* trying to add multiple website filters of the same name should give error feedback

* Better filter options: 
  * Collections: All of, any of, nested all/any of
  * Field dropdown
  * Comparisons:
    * Not()
    * Contains word
    * Contains string
  * text field
  * e.g
    All
      title - contains word -  'javascript'
      title - !contains word - 'java'
      Any
        location - contains word - 'London'
        location - contains word - 'Redhill'

* Is it possible to do pay filters

* Add all the default page selectors

* on reed, the title field lights the entire job item, as it contains a button with invisible text
  * The solution may lie in using xpath to get multiple results, then choosing based on criteria
    * Is it within the container
    * Weight based on size

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
    * When adding a new profile, it should navigate to that profile
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
  * show excluded count
  * way of viewing the excluded ones