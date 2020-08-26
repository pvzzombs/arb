# arb (EXPERIMENTAL BRANCH)
A arbitrary multi-precision library for operating large numbers represented as strings  
  
[![CodeFactor](https://www.codefactor.io/repository/github/pvzzombs/arb/badge/master)](https://www.codefactor.io/repository/github/pvzzombs/arb/overview/master)[![DeepScan grade](https://deepscan.io/api/teams/5260/projects/7030/branches/64956/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=5260&pid=7030&bid=64956)  
  
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

## Documentation and Examples
### Adding large numbers
```
syntax: arb(number<type:string>).add(number<type:string>);
return: <type:object>
```   
**Example**   
```js
var a = arb("0.1").add("0.2");
console.log(a);
```  
  
### Subtracting large numbers
```
syntax: arb(number<type:string>).sub(number<type:string>);
return: <type:object>
```   
**Example**   
```js
var s = arb("-1").sub("1");
console.log(s);
```  
  
### Multiplying large numbers
```
syntax: arb(number<type:string>).mul(number<type:string>);
return: <type:object>
```   
**Example**   
```js
var m = arb("11111111111111").mul("11111111111111");
console.log(m);
```  
  
### Dividing large numbers
```
syntax: arb(number<type:string>).div(number<type:string>);
return: <type:object>
```   
**Example**   
```js
var d = arb("11111111111111").div("11111111111111");
console.log(d);
```  
  
### Comparison operators  
```
syntax: arb(number<type:string>).eq(number<type:string>);
return: <type:boolean>
syntax: arb(number<type:string>).gt(number<type:string>);
return: <type:boolean>
syntax: arb(number<type:string>).gte(number<type:string>);
return: <type:boolean>
syntax: arb(number<type:string>).lt(number<type:string>);
return: <type:boolean>
syntax: arb(number<type:string>).lte(number<type:string>);
return: <type:boolean>
```   
**Example**   
```js
var c = arb("11111111111111").eq("11111111111111");
console.log(c);
```  
  
## Experimental features  
### Power of somewhat large numbers
```
syntax: arb(number<type:string>).pow(number<type:string>);
return: <type:object>
throws: <type:error>
reason: very large exponent
```   
**Example**   
```js
try{
  var p = arb("11111111111111").pow("11111111111111");
  console.log(p);
}catch(e){
  console.log(e);
}
```  
  
LICENSE: MIT
