# js-macosx
## Mozilla JavaScript-Cocoa Bridge for Mac OS X ##

Lightweight bridge for calling Cocoa frameworks from Mozilla JavaScript, js-macosx transparently handles definition of Cocoa API, both C and Objective-C, and provides automatic declarations for framework functions, structures, constants and enumerations, as well as allows creating and subclassing Cocoa classes.

The js-macosx bridge has dependency on js-ctypes and BridgeSupport. Whenever a Cocoa class, function, struct or const is encountered in the JavaScript code, js-macosx will replace it with the corresponding js-ctypes declaration based on the BridgeSupport file from the framework that object belongs to.

  * [Introduction](../wiki/Introduction.md)
  * [Using js-macosx, Step by Step](../wiki/StepByStep.md)
  * [Importing System Frameworks](../wiki/ImportingSystemFrameworks.md)
  * [Importing Other Frameworks](../wiki/ImportingOtherFrameworks.md)
  * [Working with Cocoa Objects](../wiki/WorkingWithObjects.md)
  * [Subclassing Cocoa Classes](../wiki/SubclassingCocoaClasses.md)
  * [Converting Cocoa and JavaScript Objects](../wiki/ConvertingCocoaJavascript.md)
  * [Known Issues and Limitations](../wiki/KnownIssues.md)

Download, extract and install Demo extension for Thunderbird or Firefox v18.0 or later, and check out Error Console to see some functionality of Mozilla JavaScript-Cocoa Bridge for Mac OS X in action.
