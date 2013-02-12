// *******************************************************************************************************
// bootstrap.js
// *******************************************************************************************************
(function(global) {
 global.consoleService = Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService);
 global.include = function include(src) {
 var o = {};
 Components.utils.import("resource://gre/modules/Services.jsm", o);
 var uri = o.Services.io.newURI(src, null, o.Services.io.newURI(__SCRIPT_URI_SPEC__, null, null));
 o.Services.scriptloader.loadSubScript(uri.spec, global);
 }})(this);

include("macosx.js");
//var macosx_debug = function(x) { consoleService.logStringMessage(x); }
var notificationHandler = null;
// *******************************************************************************************************
function startup(data, reason) {
    /// <summary>
    /// Bootstrap data structure @see https://developer.mozilla.org/en-US/docs/Extensions/Bootstrapped_extensions#Bootstrap_data
    /// -  string id
    /// -  string version
    /// -  nsIFile installPath
    /// -  nsIURI resourceURI
    /// Reason types:
    /// -  APP_STARTUP
    /// -  ADDON_ENABLE
    /// -  ADDON_INSTALL
    /// -  ADDON_UPGRADE
    /// -  ADDON_DOWNGRADE
    /// </summary>
    
    //var global = Components.utils.getGlobalForObject(this);
    var appInfo = Components.classes["@mozilla.org/xre/app-info;1"].getService(Components.interfaces.nsIXULAppInfo);
    var format_str = "JavaScript-Cocoa Bridge Demo %@ v%@ loaded into %@ v%@ because %@";
    var reason_str = "of unknown reason...";
    switch(reason) {
        case APP_STARTUP: reason_str = "application is starting."; break;
        case ADDON_ENABLE: reason_str = "user enabled extension."; break;
        case ADDON_INSTALL: reason_str = "extension is installed."; break;
        case ADDON_UPGRADE: reason_str = "user upgraded extension."; break;
        case ADDON_DOWNGRADE: reason_str = "user downgraded extension."; break;
    }
    
    with (macosx) {
        //importFramework("Cocoa"); // to import all Cocoa frameworks!
        importFramework("Foundation", false);
        importFramework("AppKit",  false);
        importFramework("/System/Library/Frameworks/CoreFoundation.framework", false);

        // NOTE: importFramework() is needed to access enums, constants, functions and structures.  
        //importFramework("ScriptingBridge", null, false);
        //var textEdit = SBApplication.applicationWithBundleIdentifier(__NSString("com.apple.TextEdit"));
        //textEdit.activate();
        //NSLog(__NSString("JavaScript-Cocoa Bridge Demo may have launched application %@ v%@"), textEdit.name(), textEdit.version());
        
        var format = CFStringCreateWithCString(null, format_str, kCFStringEncodingUTF8);
        var extensionID = CFStringCreateWithCString(null, data.id, kCFStringEncodingUTF8);
        var extensionVersion = CFStringCreateWithCString(null, data.version, kCFStringEncodingUTF8);
        var appName = CFStringCreateWithCString(null, appInfo.name, kCFStringEncodingUTF8);
        var appVersion = CFStringCreateWithCString(null, appInfo.version, kCFStringEncodingUTF8);
        var reason = CFStringCreateWithCString(null, reason_str, kCFStringEncodingUTF8);
        NSLog(format, extensionID, extensionVersion, appName, appVersion, reason);
        // THIS IS HOW TO CONVERT CFString to JS string
        //var description = CFCopyDescription(format);
        //var description_str = CFStringGetCStringPtr(description, CFStringGetFastestEncoding(description)).readString();
        //consoleService.logStringMessage("description="+description_str);
        //CFRelease(description);
        CFRelease(reason);
        CFRelease(appVersion);
        CFRelease(appName);
        CFRelease(extensionVersion);
        CFRelease(extensionID);
        CFRelease(format);
        
        with (DECLARE_INTERFACE({ TBExtNSWorkspaceNotificationHandler:NSObject })) {

            INSTANCE_METHOD(id, 'description', function() { with (macosx) { return NSString.stringWithFormat(__NSString("%@ Hello from JavaScript-Cocoa Bridge!"), this.__super.description()); }});

            INSTANCE_METHOD(void_t, {onApplicationLaunched:id}, function(note) {
                try {
                    with (macosx) {
                        if (note && note.__self) {
                            var userInfo = note.userInfo();
                            var appName = userInfo.objectForKey(__NSString("NSApplicationName"));
                            consoleService.logStringMessage("JavaScript-Cocoa Bridge: Notification handling => Application launched \""+appName.UTF8String().readString()+"\"");
                        }
                    }
                }
                catch (e) { Components.utils.reportError(e); }
            });

            DECLARE_INTERFACE_END();
        }
        notificationHandler = TBExtNSWorkspaceNotificationHandler.alloc().init();
        consoleService.logStringMessage("JavaScript-Cocoa Bridge: method overloading => "+notificationHandler.description().UTF8String().readString());
        var some_object = __NSObjectFromJSObject({string:"Bach",long:3,float:77.3,date:(new Date()),array:[1,2,3,"four"],bool:false});
        consoleService.logStringMessage("JavaScript-Cocoa Bridge: NSDictionary from javascript native object => "+some_object.description().UTF8String().readString());
        consoleService.logStringMessage("JavaScript-Cocoa Bridge: NSDictionary to javascript native object => "+__NSObjectToJSObject(some_object).toSource());
        consoleService.logStringMessage("JavaScript-Cocoa Bridge: NSDate to javascript native object => "+__NSObjectToJSObject(NSDate.date()).toDateString());
        consoleService.logStringMessage("JavaScript-Cocoa Bridge: struct handling => NSMakeRect(0,0,640,480)="+NSMakeRect(0,0,640,480).toSource());
        
        var ws = NSWorkspace.sharedWorkspace();
        var apps = ws.valueForKeyPath(__NSString("launchedApplications.NSApplicationName"));
        consoleService.logStringMessage("JavaScript-Cocoa Bridge: Running applications => "+apps.description().UTF8String().readString());
        ws.notificationCenter().msgSend({addObserver:notificationHandler, selector:NSSelectorFromString(__NSString("onApplicationLaunched:")), name:NSWorkspaceDidLaunchApplicationNotification, object:null});
    }
}
// *******************************************************************************************************
function shutdown(data, reason) {
    /// <summary>
    /// Reason types:
    /// -  APP_SHUTDOWN
    /// -  ADDON_DISABLE
    /// -  ADDON_UNINSTALL
    /// -  ADDON_UPGRADE
    /// -  ADDON_DOWNGRADE
    /// </summary>
    try {
        macosx.NSWorkspace.sharedWorkspace().notificationCenter().removeObserver(notificationHandler);
        notificationHandler.release();

        var output = macosx.CFStringCreateMutable(null, 0);
        macosx.CFStringAppendCString(output, "Shutting down JavaScript-Cocoa Bridge Demo because ", macosx.kCFStringEncodingUTF8);
        switch(reason) {
            case APP_SHUTDOWN:
                macosx.CFStringAppendCString(output, "application is terminating.", macosx.kCFStringEncodingUTF8);
                break;
            case ADDON_DISABLE:
                macosx.CFStringAppendCString(output, "user disabled extension.", macosx.kCFStringEncodingUTF8);
                break;
            case ADDON_UNINSTALL:
                macosx.CFStringAppendCString(output, "user uninstalled extension.", macosx.kCFStringEncodingUTF8);
                break;
            case ADDON_UPGRADE:
                macosx.CFStringAppendCString(output, "user upgraded extension.", macosx.kCFStringEncodingUTF8);
                break;
            case ADDON_DOWNGRADE:
                macosx.CFStringAppendCString(output, "user downgraded extension.", macosx.kCFStringEncodingUTF8);
                break;
            default:
                macosx.CFStringAppendCString(output, "of unknown reason...", macosx.kCFStringEncodingUTF8);
                break;
        }
        macosx.NSLog(output);
        macosx.CFRelease(output);
    }
    catch (e) { Components.utils.reportError(e); }
}
// *******************************************************************************************************
function install(data, reason) {
    /// <summary>
    /// Reason types:
    /// -  ADDON_INSTALL
    /// -  ADDON_UPGRADE
    /// -  ADDON_DOWNGRADE
    /// </summary>
}
// *******************************************************************************************************
function uninstall(data, reason) {
    /// <summary>
    /// Reason types:
    /// -  ADDON_UNINSTALL
    /// -  ADDON_UPGRADE
    /// -  ADDON_DOWNGRADE
    /// </summary>
}

