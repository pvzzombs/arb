/*
  arb.js
  0.0.9
  whats new:
  * implemented division using newton-raphson method
  * division contains decimal errors at the end
  * new functions:
  * cut, scut
*/
(function (scope) {
  //limits for faster solving
  var limits = {
    decimalDigits : 200,
    integerDigits : 200,
    //if 0.99999 99999 99999
    //or 1.00000 00000 00000
    roundDecimals : 15
  };

  //splice function for string
  function splice(str, start, delCount, newSubStr) {
    return str.slice(0, start) + newSubStr + str.slice(start + Math.abs(delCount));
  }

  //function cut
  function cut(n){
    var x;
    n = n.split(".");
    x = n[0].length - limits.integerDigits;
    x = (x < 0) ? 0 : x;
    n[0] = n[0].substr(x, limits.integerDigits);
    if(n[1]){
      n[1] = n[1].substr(0, limits.decimalDigits);
    }else{
      n[1] = "0";
    }

    return n.join(".");
  }

  //function signFix
  function signFix(n){
    var sign = "";
    var l = n.length;
    for(i = 0; i < l; i++){
      if(n[i] === "-"){
        if(sign === ""){
          sign = "-";
        }else{
          sign = "";
        }
      }else{
        break;
      }
    }
    return sign + n.replace(/-/g,"");
  }

  //floor function
  function floor(n) {
    if (n.indexOf(".") === -1) {
      return n;
    }
    return n.split(".")[0];
  }

  //removes decimals
  function removeDecimal(str) {
    return str.replace(/\./g, "");
  }

  //returns the sign of the number<string>
  function getSign(a) {
    if (a[0] !== "-") {
      return "";
    }
    return "-";
  }

  //absolute value of a number<string>
  function abs(num) {
    if (getSign(num) === "-") {
      return num.substr(1, num.length);
    }
    return num;
  }

  //integer if decimal is zero
  function turnToIntIfDecIsZero(str) {
    var a = str.split(".");
    if (a[1] === "0" && a[1].length === 1) {
      return a[0];
    }
    return str;
  }

  //forrmats two numbers and returns an array 
  function pair(a, b, skip) {
    a = a.split(".");
    b = b.split(".");

    a[1] = (a.length - 1) === 1 ? a[1] : "0";
    b[1] = (b.length - 1) === 1 ? b[1] : "0";

    if (!skip) {
      var ala = a[0].length;
      var alb = b[0].length;
      var bla = a[1].length;
      var blb = b[1].length;

      while (ala > alb) {
        b[0] = "0" + b[0];
        alb += 1;
      }
      while (ala < alb) {
        a[0] = "0" + a[0];
        ala += 1;
      }

      while (bla > blb) {
        b[1] += "0";
        blb += 1;
      }
      while (bla < blb) {
        a[1] += "0";
        bla += 1;
      }
    }

    return [a.join("."), b.join(".")];
  }

  //pair only decimal
  //forrmats two numbers and returns an array 
  function pairDecimal(a, b, skip) {
    a = a.split(".");
    b = b.split(".");

    a[1] = (a.length - 1) === 1 ? a[1] : "0";
    b[1] = (b.length - 1) === 1 ? b[1] : "0";

    if (!skip) {
      var bla = a[1].length;
      var blb = b[1].length;

      while (bla > blb) {
        b[1] += "0";
        blb += 1;
      }
      while (bla < blb) {
        a[1] += "0";
        bla += 1;
      }
    }
    return [a.join("."), b.join(".")];
  }

  //minimum negative
  function minNeg(_a, _b) {
    var al, bl, i;
    _a = removeLeadingZeroes(_a);
    _b = removeLeadingZeroes(_b);
    al = _a.length;
    bl = _b.length;
    if (al > bl) {
      return "-" + _a;
    }
    if (al < bl) {
      return "-" + _b;
    }
    if (al === bl) {
      for (i = 0; i < al; i++) {
        if (_a[i] * 1 < _b[i] * 1) {
          return "-" + _b;
        } else if (_a[i] * 1 > _b[i] * 1) {
          return "-" + _a;
        }
      }
    }
    return _a;
  }

  //minimum 
  function min(_a, _b) {
    var signa, signb;
    var al, bl, i;
    _a = removeLeadingZeroes(_a);
    _b = removeLeadingZeroes(_b);
    signa = getSign(_a);
    signb = getSign(_b);
    if (signa === "-" && signb !== "-") {
      return _a;
    }
    if (signa !== "-" && signb === "-") {
      return _b;
    }
    if (signa === "-" && signb === "-") {
      return minNeg(abs(_a), abs(_b));
    }
    al = _a.length;
    bl = _b.length;
    if (al < bl) {
      return _a;
    }
    if (al > bl) {
      return _b;
    }
    if (al === bl) {
      for (i = 0; i < al; i++) {
        if (_a[i] * 1 > _b[i] * 1) {
          return _b;
        } else if (_a[i] * 1 < _b[i] * 1) {
          return _a;
        }
      }
    }
    return _a;
  }

  //maximum neg
  function maxNeg(_a, _b) {
    var al, bl, i;
    _a = removeLeadingZeroes(_a);
    _b = removeLeadingZeroes(_b);
    al = _a.length;
    bl = _b.length;
    if (al < bl) {
      return "-" + _a;
    }
    if (al > bl) {
      return "-" + _b;
    }
    if (al === bl) {
      for (i = 0; i < al; i++) {
        if (_a[i] * 1 > _b[i] * 1) {
          return "-" + _b;
        } else if (_a[i] * 1 < _b[i] * 1) {
          return "-" + _a;
        }
      }
    }
    return _a;
  }

  //maximum
  function max(_a, _b) {
    var signa, signb;
    var al, bl, i;
    _a = removeLeadingZeroes(_a);
    _b = removeLeadingZeroes(_b);
    signa = getSign(_a);
    signb = getSign(_b);
    if (signa === "-" && signb !== "-") {
      return _b;
    }
    if (signa !== "-" && signb === "-") {
      return _a;
    }
    if (signa === "-" && signb === "-") {
      return maxNeg(abs(_a), abs(_b));
    }
    al = _a.length;
    bl = _b.length;
    if (al > bl) {
      return _a;
    }
    if (al < bl) {
      return _b;
    }
    if (al === bl) {
      for (i = 0; i < al; i++) {
        if (_a[i] * 1 < _b[i] * 1) {
          return _b;
        } else if (_a[i] * 1 > _b[i] * 1) {
          return _a;
        }
      }
    }
    return _a;
  }

  //remove leading zeroes 
  function removeLeadingZeroes(str) {
    str += "";
    var mark = 0;
    var strl, i;
    str = str.split("");
    strl = str.length;
    for (i = 0; i < strl; i++) {
      if (str[i] !== "0") {
        mark = i;
        break;
      }
    }
    if (str[i] === ".") {
      mark -= 1;
    }
    for (var j = 0; j < mark; j++) {
      str[j] = "";
    }
    return str.join("");
  }

  //remove trailing zeroes
  function removeTrailingZeroes(str) {
    str += "";
    var mark = 0;
    var strl, i;
    str = str.split("").reverse();
    strl = str.length;
    for (i = 0; i < strl; i++) {
      if (str[i] !== "0") {
        mark = i;
        break;
      }
    }
    if (str[i] === ".") {
      mark -= 1;
    }
    for (var j = 0; j < mark; j++) {
      str[j] = "";
    }
    return str.reverse().join("");
  }

  //produce zero <string>
  function zero(i) {
    if (i <= 0) {
      return "";
    }
    var str = "";
    while (i !== 0) {
      str += "0";
      i--;
    }
    return str;
  }

  function isMin(_a, _b, strict) {
    var al, bl, i;
    _a = removeLeadingZeroes(_a);
    _b = removeLeadingZeroes(_b);
    if (_a[0] === "-" && _b[0] !== "-") {
      return true;
    }
    if (_a[0] !== "-" && _b[0] === "-") {
      return false;
    }
    if (_a[0] === "-" && _b[0] === "-") {
      return isMax(_a.substr(1, _a.length), _b.substr(1, _b.length));
    }
    al = _a.length;
    bl = _b.length;
    if (al < bl) {
      return true;
    }
    if (al > bl) {
      return false;
    }
    if (al === bl) {
      for (i = 0; i < al; i++) {
        if (_a[i] * 1 > _b[i] * 1) {
          return false;
        } else if (_a[i] * 1 < _b[i] * 1) {
          return true;
        }
      }
    }
    if (strict) {
      return false;
    }
    return true;
  }

  //maximum
  function isMax(_a, _b, strict) {
    var al, bl, i;
    _a = removeLeadingZeroes(_a);
    _b = removeLeadingZeroes(_b);
    if (_a[0] === "-" && _b[0] !== "-") {
      return false;
    }
    if (_a[0] !== "-" && _b[0] === "-") {
      return true;
    }
    if (_a[0] === "-" && _b[0] === "-") {
      return isMin(_a.substr(1, _a.length), _b.substr(1, _b.length));
    }
    al = _a.length;
    bl = _b.length;
    if (al > bl) {
      return true;
    }
    if (al < bl) {
      return false;
    }
    if (al === bl) {
      for (i = 0; i < al; i++) {
        if (_a[i] * 1 < _b[i] * 1) {
          return false;
        } else if (_a[i] * 1 > _b[i] * 1) {
          return true;
        }
      }
    }
    if (strict) {
      return false;
    }
    return true;
  }

  //decimal counter
  function decimalCounter(_a, _b) {
    _a = removeTrailingZeroes(_a);
    _b = removeTrailingZeroes(_b);
    var a = _a.split(".");
    var b = _b.split(".");
    //if zero no decimal movement is needed, add ".0" to the back
    var decimalCount = 0;
    var zero = 0;
    if(a[1] !== undefined){
      if (a[1] === "0" && a[1].length === 1) {
        zero += 1;
      } else {
        decimalCount += a[1].length;
      }
    }
    
    if(b[1] !== undefined){
      if (b[1] === "0" && b[1].length === 1) {
        zero += 1;
      } else {
        decimalCount += b[1].length;
      }
    }
    
    return decimalCount;
  }

  //move decimal for division
  function moveDecimal(_a, _b) {
    var decimal = 0;
    var oldIndex = -1;
    var newIndex = -1;
    var temp = pair(_a, _b);
    //_b is the divisor!
    _a = removeTrailingZeroes(removeLeadingZeroes(temp[0]));
    _b = removeTrailingZeroes(removeLeadingZeroes(temp[1]));
    decimal = decimalCounter(_b, "0.0");

    //remove decimal of b
    _b = removeDecimal(turnToIntIfDecIsZero(_b));
    //get the current position
    //of the decimal
    oldIndex = _a.indexOf(".");
    //remove the decimal
    _a = removeDecimal(_a);
    //calculate the new pos
    newIndex = oldIndex + decimal;
    //put into place
    _a = splice(_a, newIndex, 0, ".");
    //finish
    if (_a[_a.length - 1] === ".") {
      _a += "0";
    }
    _b += ".0";
    return [_a, _b];

  }

  //fix Clean for addition
  function fixAdd(a, b){
    var t;

    a = signFix(a);
    b = signFix(b);

    signa = getSign(a);
    signb = getSign(b);

    a = abs(a);
    b = abs(b);

    t = pairDecimal(a, b);
    a = t[0];
    b = t[1];

    a = removeLeadingZeroes(a);
    b = removeLeadingZeroes(b);

    return [a, b, signa, signb];
  }

  //check fix for mult
  function fixMult(a, b){
    var d, signa, signb;

    a = signFix(a);
    b = signFix(b);

    signa = getSign(a);
    signb = getSign(b);

    a = abs(a);
    b = abs(b);

    a = (a.indexOf(".") > -1) ? removeTrailingZeroes(a) : a;
    b = (b.indexOf(".") > -1) ? removeTrailingZeroes(b) : b;

    d = decimalCounter(a, b);

    a = (a.slice(-2) === ".0") ? a.slice(0, a.length - 2) : a;
    b = (b.slice(-2) === ".0") ? b.slice(0, b.length - 2) : b;

    a = removeLeadingZeroes(a);
    b = removeLeadingZeroes(b);

    return [a, b, signa, signb, d];

  }

  //a adds the integer part of a string
  function a(_a, _b) {
    var al, bl, i;
    //_a and _b are strings
    //made of pure integers
    al = _a.length;
    bl = _b.length;
    if (al > bl) {
      _b = zero(al - bl) + _b;
    } else if (al < bl) {
      _a = zero(bl - al) + _a;
    }
    _a = _a.split("").reverse();
    _b = _b.split("").reverse();

    var carry = 0,
      sum = [],
      temp = 0;
    al = _a.length;
    for (i = 0; i < al; i++) {
      temp = _a[i] * 1 + _b[i] * 1 + carry;
      if (temp >= 10) {
        temp -= 10;
        carry = 1;
      } else {
        carry = 0;
      }
      sum.push(temp + "");
    }
    if (carry > 0) {
      sum.push("1");
    }
    return sum.reverse().join("");
  }

  //ad adds the decimal part of string
  function ad(_a, _b) {
    var al, bl, i;
    //_a and _b are are strings
    //made of pure integers
    al = _a.length;
    bl = _b.length;
    if (al > bl) {
      _b += zero(al - bl);
    } else if (al < bl) {
      _a += zero(bl - al);
    }
    _a = _a.split("").reverse();
    _b = _b.split("").reverse();

    var carry = 0,
      sum = [],
      temp = 0;
    al = _a.length;
    for (i = 0; i < al; i++) {
      temp = _a[i] * 1 + _b[i] * 1 + carry;
      if (temp >= 10) {
        temp -= 10;
        carry = 1;
      } else {
        carry = 0;
      }
      sum.push(temp + "");
    }
    return [sum.reverse().join(""), carry + ""];
  }

  //add is a operator
  function ADD(_a, _b) {
    var aa = _a.split(".");
    var bb = _b.split(".");
    //now add integer part only
    var integerPart = a(aa[0], bb[0]);
    //then add decimal part only
    var decimalPart = ad(aa[1], bb[1]);
    //then join the results
    return removeLeadingZeroes(a(integerPart, decimalPart[1])) + "." + removeTrailingZeroes(decimalPart[0]);
  }

  //s subtracts the integer part of a string
  function s(x, y) {
    var xl, yl, i;
    xl = x.length;
    yl = y.length;
    if (xl < yl) {
      x = zero(yl - xl) + x;
    } else if (xl > yl) {
      y = zero(xl - yl) + y;
    }
    x = x.split("").reverse();
    y = y.split("").reverse();

    var borrow = 0,
      diff = [],
      temp = 0;
    xl = x.length;
    for (i = 0; i < xl; i++) {
      temp = (x[i] * 1) - (y[i] * 1) - borrow;
      if (temp < 0) {
        temp = (10 + x[i] * 1 - y[i] * 1 - borrow);
        borrow = 1;
      } else {
        borrow = 0;
      }
      diff.push(temp);
    }
    return diff.reverse().join("");
  }

  //sd subtracts the decimal part of string
  function sd(x, y) {
    var xl, yl, i;
    xl = x.length;
    yl = y.length;
    if (xl < yl) {
      x += zero(yl - xl);
    } else if (xl > yl) {
      y += zero(xl - yl);
    }

    x = x.split("").reverse();
    y = y.split("").reverse();

    var borrow = 0,
      diff = [],
      temp = 0;
    xl = x.length;
    for (i = 0; i < xl; i++) {
      temp = (x[i] * 1) - (y[i] * 1) - borrow;
      if (temp < 0) {
        temp = (10 + x[i] * 1 - y[i] * 1 - borrow);
        borrow = 1;
      } else {
        borrow = 0;
      }
      diff.push(temp);
    }
    return [diff.reverse().join(""), borrow + ""];
  }

  //subtract is a operator
  function subtract(_a, _b) {
    var aa = _a.split(".");
    var bb = _b.split(".");
    //now subtract integer part only
    var integerPart = s(aa[0], bb[0]);
    //then subtract decimal part only
    var decimalPart = sd(aa[1], bb[1], aa[0], bb[0]);
    //then join the results
    return removeLeadingZeroes(s(integerPart, decimalPart[1])) + "." + removeTrailingZeroes(decimalPart[0]);
  }

  //decider
  function add(_a, _b) {
    var t = fixAdd(_a, _b);
    var signa = t[2];
    var signb = t[3];
    var aa = t[0];
    var bb = t[1];
    var first = max(aa, bb);
    var second = min(aa, bb);
    var output = "0.0";
    if (getSign(_a) === getSign(_b)) {
      return cut(signa + ADD(aa, bb));
    } else {
      if (aa === first && bb === first) {
        //different sign same numbers? Its zero!
        return "0.0";
      } else if (aa === first) {
        return cut(signa + subtract(first, second));
      } else if (bb === first) {
        return cut(signb + subtract(first, second));
      }
    }

    //if there's a failure automatic log activate
    console.log("Looks like there's something wrong at " + aa + ", " + bb + ", where original is " + _a + ", " + _b);
    return output;
  }

  //multiply large integer by a single digit
  function m(_a, _b) {
    _a = _a.split("").reverse().join("");
    var i, temp, carry = 0,
      output = "";
    var al = _a.length;
    for (i = 0; i < al; i++) {
      temp = (1 * _a[i]) * (1 * _b) + carry;
      output += (temp % 10);
      carry = Math.floor(temp / 10);
    }
    if (carry) {
      return carry + output.split("").reverse().join("");
    }
    return output.split("").reverse().join("");
  }

  //multiplying pure integers
  function mm(_a, _b) {
    //no suasy heck format
    //direct operation!
    _b = _b.split("").reverse().join("");
    var i, output = "0",
      tmp;
    var bl = _b.length;
    for (i = 0; i < bl; i++) {
      tmp = m(_a, _b[i]);
      output = a(output, tmp + zero(i));
    }
    return output;
  }

  //multiplication operator
  function multiply(_a, _b) {
    var t = fixMult(_a, _b);
    var sign = "-";
    var decimal = t[4];
    if (t[2] === t[3]) {
      sign = "";
    }
    var aa = removeDecimal(t[0]);
    var bb = removeDecimal(t[1].split("").reverse().join(""));

    if (aa === "0" || bb === "0") {
      return "0.0";
    } else if (aa === "1") {
      return sign + t[1];
    } else if (bb === "1") {
      return sign + t[0];
    }

    var i, output = "0",
      tmp;
    var bbl = bb.length;
    for (i = 0; i < bbl; i++) {
      tmp = m(aa, bb[i]);
      //console.log(tmp);
      output = a(output, tmp + zero(i));
      //console.log(output);
    }
    //console.log(decimal);
    if (decimal === 0) {
      return cut(sign + removeLeadingZeroes(output + ".0"));
    } else {
      var d = (output.length) - decimal;
      return cut(sign + removeLeadingZeroes(splice(output, d, 0, ".")));
    }
  }

  //used to calculate the reciprocal of a int
  function reciprocal(n){
    n = floor(n);
    var a, b, i;
    b = "0." + zero(n.length) + "1";
    for(i = 0; i < 25; i++){
      a = b;
      b = add(add(a, a), "-" + multiply(multiply(n, a), a));
    }
    return removeTrailingZeroes(b);
  }

  //division using reciprocal
  function divideR(x, y){
    if(y === "0" || y === "0.0" || y === "-0.0" || y === "-0"){
      throw "error: division by zero! ";
    }
    var nu = reciprocal(y);
    var output = multiply(x,nu);
    //remove the last five digits of decimal
    return removeTrailingZeroes(cut(output));
  }

  //create our function constructor for arb
  //arb stands for arbitrary
  function arbShell(n) {
    //n is string here
    //serialize n
    this.value = n.replace(/(\t|\s|[a-zA-Z])/g, "");
  }
  arbShell.prototype = {
    add: function (n) {
      var temp = this.value;
      this.value = add(temp, n.replace(/(\t|\s|[a-zA-Z])/g, ""));
      return this;
    },
    sub: function (n) {
      var temp = this.value;
      this.value = add(temp, "-" + n.replace(/(\t|\s|[a-zA-Z])/g, ""));
      return this;
    },
    mul: function (n) {
      var temp = this.value;
      this.value = multiply(temp, n.replace(/(\t|\s|[a-zA-Z])/g, ""));
      return this;
    },
    div: function (n) {
      var temp = this.value;
      this.value = divideR(temp, n.replace(/(\t|\s|[a-zA-Z])/g, ""));
      return this;
    }
  };

  //export our object
  if (typeof define === 'function' && define.amd) {
    define([], function (n) {
      return (new arbShell(n));
    });
  } else if (typeof exports === 'object') {
    module.exports = function (n) {
      return (new arbShell(n));
    };
  } else {
    scope.arb = function (n) {
      return (new arbShell(n));
    };
  }
})(this);