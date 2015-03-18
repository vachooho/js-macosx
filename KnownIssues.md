# Known Issues and Limitations #

  * Unions are not handled
  * Structures with bit fields are not handled
  * Works on 64-bit Intel only (probably not a big deal, since both Firefox and Thunderbird are built 64-bit on Mac)
  * Works with Geico v18.0 or higher
  * No automatic unloading for libraries and frameworks.
  * https://bugzilla.mozilla.org/show_bug.cgi?id=556097

I wrote this bridge over past two weekends, didn't have much time to test it completely.