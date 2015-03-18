# Importing System Frameworks #

Mac OS X uses frameworks to distribute shared code and resources, such as the interfaces to the operating system itself. For OS X software developers the guideline for including header files and linking with system software is straightforward: add the framework to your project and include the top-level header file in your source files. For js-macosx bridge, the similar "include" feature is done using _importFramework_ function:

```
macosx.importFramework("Cocoa");
```

This will tell js-macosx that you plan to use Cocoa framework!

When including header files in C, it is traditional to include only the master header file. For js-macosx, importFramework takes care of all the dependent frameworks, and imports them too. In case of Cocoa framework, in the above example, AppKit and Foundation frameworks will be imported too.

If you are worried that including all the dependencies may consume too much memory or if you are planning to work with only the subset of the functionality, provided by the framework, which does not use dependent frameworks, you can use the second argument to instruct the function to skip dependent frameworks while importing:

```
macosx.importFramework("CoreFoundation", false); // import CoreFoundation without dependent frameworks
```

The above importFramework call gives you full access to the functions, enums, structs and constants defined in the CoreFoundation framework. Check out this JavaScript code:

```
var appInfo = Components.classes["@mozilla.org/xre/app-info;1"].getService(Components.interfaces.nsIXULAppInfo);
with (macosx) {
    importFramework("CoreFoundation", false);
    importFramework("Foundation", false);
    importFramework("AppKit", false);

    var format = CFStringCreateWithCString(null, "JavaScript-Cocoa Bridge loaded into %@ v%@", kCFStringEncodingUTF8);
    var appName = CFStringCreateWithCString(null, appInfo.name, kCFStringEncodingUTF8);
    var appVersion = CFStringCreateWithCString(null, appInfo.version, kCFStringEncodingUTF8);

    NSLog(format, appName, appVersion);

    CFRelease(appVersion);
    CFRelease(appName);
    CFRelease(format);
}
```
We just logged the name and version of the host application in the system log file, from JavaScript. Cool huh?!

Here is more: one of many possible ways to convert CoreFoundation string into JavaScript string.
```
with (macosx) {
    var description = CFCopyDescription(coreFoundationObject);
    var js_description = CFStringGetCStringPtr(description, CFStringGetFastestEncoding(description)).readString();
    // js_description is a JavaScript string object
    CFRelease(description);
}
```