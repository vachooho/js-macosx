# Introduction #

Interaction with OS is part of any application. Unfortunately, classic JavaScript does not have any facilities to interact with the OS. This ability is usually provided by the host environment.
Mozilla's JavaScript is the most advanced JavaScript engine. It includes number of technologies that can interact with OS.

One of those is js-ctypes API, which allows application and extension code to call back and forth to native code in binary format. Js-ctypes can load libraries, construct types, and perform miscellaneous tasks like type-casting. This API also provides numerous predefined types that correspond to primitives and common typedefs in C.

That's cool! Well, that's what I thought too, until I got the real task to take care of on macOS. The amount of code I had to write in JavaScript was huge and the result didn't look neither nice nor elegant.
Besides, I thought it should all be automatic!

This is where Apple's BridgeSupport comes in handy.
<pre>
BridgeSupport files are XML files that describe the API symbols of frameworks or libraries that cannot be<br>
introspected at runtime. These are generally ANSI C symbols that are non-object-oriented items such as<br>
constants, enumerations, structures, and functions but can also include some additional information<br>
about classes, methods, and informal protocols.<br>
</pre><pre>
BridgeSupport files are a major component of the Objective-C bridges (RubyCocoa and PyObjC)<br>
supported in OS X for scripting languages such as Ruby and Python.<br>
</pre>

If these files are there for RubyCocoa and PyObjC, why can't we use the same files for another bridge, a JavaScript bridge? That's how js-macosx was developed.

Lightweight bridge for calling Cocoa frameworks from Mozilla JavaScript, js-macosx transparently handles definition of Cocoa API, both C and Objective-C, and provides automatic declarations for framework functions, structures, constants and enumerations, as well as allows creating and subclassing Cocoa classes. Whenever a Cocoa class, function, struct or const is encountered in the JavaScript code, js-macosx will replace it with the corresponding js-ctypes declaration based on the BridgeSupport file from the framework that object belongs to. This allows extension developers to quickly use any system framework without having to create the needed definitions manually, which can often lead to bugs and mistakes.
