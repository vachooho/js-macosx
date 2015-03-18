# Subclassing Cocoa Classes #

The library allows creation of Cocoa classes in JavaScript. Implementation of this support is minimal.
Use DECLARE\_INTERFACE(class\_and\_superclass, protocols) function to create new Cocoa class.
class\_and\_superclass can be either array [class, superclass] or hash {className:superclass}
Protocols are not handled at this time.

The function returns the new class interface object that can be used to declare methods.
Only instance method declaration is supported in the current release.
To declare an instance method use INSTANCE\_METHOD(return\_type, method\_signature, implementation);. You can access to the "self" object inside the method implementation just using JavaScript's "`this`" keyword. Also `this.__super` provides access to super methods, and `this.__cmd` is the currently running selector, just like in Objective-C!

Call DECLARE\_INTERFACE\_END() to finish class declaration and add it to the Cocoa runtime.

Sample class definition:

```
with (macosx.DECLARE_INTERFACE({ TBExtNSWorkspaceNotificationHandler:NSObject })) {
    
    INSTANCE_METHOD(id, 'description', function() {
                    with (macosx) {
                        return NSString.stringWithFormat(__NSString("%@ Hello from JavaScript-Cocoa Bridge!"), this.__super.description()); }});
    
    INSTANCE_METHOD(void_t, {onApplicationLaunched:id}, function(note) {
                    try {
                        with (macosx) {
                            if (note && note.__self) {
                                var userInfo = note.userInfo();
                                var appName = userInfo.objectForKey(__NSString("NSApplicationName"));
                            }
                        }
                    }
                    catch (e) { Components.utils.reportError(e); }});
    
    DECLARE_INTERFACE_END();
}
```

Currently, only new classes derived from an existing class are allowed. Top-level class definitions are not allowed. If base class for interface is omitted, NSObject is substituted.
The following return types can be defined:
  * void\_t
  * id
  * class\_t
  * SEL
  * char
  * int
  * short
  * long
  * long\_long
  * unsigned\_char
  * unsigned\_int
  * unsigned\_short
  * unsigned\_long
  * unsigned\_long\_long
  * float
  * double
  * bool
  * string
  * any other return type can be specified using the Objective-C type encoding

Once the class is defined, it can be used in the JavaScript code. For example, the sample class declared above can be used as a callback to get notifications from Cocoa's NSWorkspace object when some application is launched by user.

```
var notificationHandler = null;
with (macosx) {
    // create notification handler object
    notificationHandler = TBExtNSWorkspaceNotificationHandler.alloc().init();
    // subscribe to NSWorkspace's NSWorkspaceDidLaunchApplicationNotification
    NSWorkspace.sharedWorkspace().notificationCenter().msgSend({addObserver:notificationHandler, selector:NSSelectorFromString(__NSString("onApplicationLaunched:")), name:NSWorkspaceDidLaunchApplicationNotification, object:null});
}
```
Just make sure, you keep notificationHandler object around () to avoid it being garbage collected. When done using it, unsubscribe from NSWorkspace notifications and release it.

```
macosx.NSWorkspace.sharedWorkspace().notificationCenter().removeObserver(notificationHandler);
notificationHandler.release();
```
