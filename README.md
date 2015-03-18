# js-macosx
## Mozilla JavaScript-Cocoa Bridge for Mac OS X ##

Lightweight bridge for calling Cocoa frameworks from Mozilla JavaScript, js-macosx transparently handles definition of Cocoa API, both C and Objective-C, and provides automatic declarations for framework functions, structures, constants and enumerations, as well as allows creating and subclassing Cocoa classes.

The js-macosx bridge has dependency on js-ctypes and BridgeSupport. Whenever a Cocoa class, function, struct or const is encountered in the JavaScript code, js-macosx will replace it with the corresponding js-ctypes declaration based on the BridgeSupport file from the framework that object belongs to.

  * [Introduction](Introduction.md)
  * [Using js-macosx, Step by Step](StepByStep.md)
  * [Importing System Frameworks](ImportingSystemFrameworks.md)
  * [Importing Other Frameworks](ImportingOtherFrameworks.md)
  * [Working with Cocoa Objects](WorkingWithObjects.md)
  * [Subclassing Cocoa Classes](SubclassingCocoaClasses.md)
  * [Converting Cocoa and JavaScript Objects](ConvertingCocoaJavascript.md)
  * [Known Issues and Limitations](KnownIssues.md)

Download, extract and install Demo extension for Thunderbird or Firefox v18.0 or later, and check out Error Console to see some functionality of Mozilla JavaScript-Cocoa Bridge for Mac OS X in action.
