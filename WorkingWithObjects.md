# Working with Cocoa Objects #

How about Cocoa objects?
With js-macosx, you can use any Cocoa class in JavaScript code. You don't even need to import the framework, as the Cocoa Framework provides good runtime information.

**You will still need to import the framework for constants, enumerations and structures defined there. You will also need to import the framework that is not already loaded by the host application.**

You can call methods on classes, which is how you create Cocoa objects.
You can call methods on objects just like any other function in JavaScript.

Let's see how that looks like:

```
with (macosx) {
    var string1 = NSString.alloc().init().autorelease(); // empty NSString object
    var string2 = NSString.stringWithFormat(__NSString("This is a format string: %@"), __NSString("and this is a value"));
}
```

Multi-input methods (or split calls) can be called by specifying the selector string:
```
with (macosx) {
    NSString['stringWithCString:encoding:']("javascript string", kUTF8Encoding);
}
```
or using msgSend helper function, which is provided by js-macosx bridge for all Cocoa objects:
```
with (macosx) {
    NSString.msgSend({ stringWithCString:"javascript string", encoding:kUTF8Encoding });
}
```

The code below demonstrates the use of the ScriptingBridge framework from js-macosx bridge:
```
with (macosx) {
    // importFramework("ScriptingBridge", false);
    var textEdit = SBApplication.applicationWithBundleIdentifier(__NSString("com.apple.TextEdit"));
    textEdit.activate();
    NSLog(__NSString("JavaScript-Cocoa Bridge Demo may have launched application %@ v%@"), textEdit.name(), textEdit.version());
}
```
