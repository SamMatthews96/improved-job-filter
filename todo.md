

when config updated, runFilter

Script needs to pass params to Filter based on which website
it is


work out filter logic
currently we use blacklist
it should be by word:
If I blacklist Java, it should hide jobs with:
    java
    Java
    Java Developer
It should not hide:
    javascript
    JavaScript

consider making a wrapper for chrome.runtime tools
the rationale is to make it easier to test when running it locally,
as chrome.runtime does not work there. So inside the wrapper, we check if 
chrome.runtime is defined. If it is, we use the chrome runtime. If not, we 
use a custom class that mimics the functionality.

methods used:
chrome
    storage.local
        set
        get
        onChanged.addListener
    runtime
        getManiFest
        ?onMessage.addListener
        ?sendMessage



