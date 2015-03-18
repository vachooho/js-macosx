# Converting Cocoa and JavaScript Objects #

The js-macosx bridge provides some helpers to convert Cocoa objects into JavaScript objects and vice versa.

  * <pre>__NSString</pre> for converting JavaScript strings into NSString
  * <pre>__NSObjectFromJSObject</pre> and
  * <pre>__NSObjectToJSObject</pre> for more generalized conversion.

These functions can convert the following JavaScript and Cocoa types

  * Boolean
  * String
  * Number
  * Array
  * dictionary/hash