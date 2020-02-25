# Importing Other Frameworks #

js-macosx's importFramework function recognizes any system framework just by its name. If you want to import frameworks that are not part of the system /System/Library/Frameworks, you must explicitly specify the location of that framework so that bridge can locate it.

```
macosx.importFramework("/Library/Frameworks/MyFramework.framework", false);
```

Important to note, that BridgeSupport files are included with all macOS system frameworks and will be loaded automatically when you import the framework. For non-system frameworks, bridge support will be loaded if it is included, but even if they were not included with the framework, you can still generate and load the bridge support files yourself. The _gen\_bridge\_metadata_ script is the standard way of generating bridge support files. Once the files are generated, you can include them into your framework, or you can load them directly by passing the full paths to the generated .bridgesupport and .dylib files as additional arguments to the importFramework function.

```
macosx.importFramework("/Users/me/OtherFramework.framework", false, "/Users/me/OtherFramework.bridgesupport", "/Users/me/OtherFramework.dylib");
```
