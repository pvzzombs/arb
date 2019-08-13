# arb
A arbitrary multi-precision library for operating large numbers represented as strings  

### How to use  
1. Get a copy in the ``dist`` directory.
2. Place it in your file as a script.
   ```html
   <!-- use the development version -->
   <script src="arb.js"></script>
   <!-- or use the production ready -->
   <script src="arb.min.js"></script>
   ```
3. Use it!

### Examples : (Documentation will come soon)
   ```javascript
   arb("12").add("12"); //returns "24.0"
   arb("12").sub("2"); //returns "10.0"
   arb("12").mul("12"); //returns "144.0"
   arb("12").div("12"); //returns "1"
   ```
LICENSE: MIT
