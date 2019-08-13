(function (scope) {
  /*
  //splice function for string
  if (!String.prototype.splice) {
    String.prototype.splice = function (start, delCount, newSubStr) {
      return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
    };
  }*/

  //splice function for string
  function splice(str, start, delCount, newSubStr) {
    return str.slice(0, start) + newSubStr + str.slice(start + Math.abs(delCount));
  }

  //produce string
  function produce(str, i) {
    if (str === "") {
      return "";
    }else if(i <= 0){
      return "";
    }
    var j;
    var output = "";
    for (j = 0; j < i; j++) {
      output += str;
    }
    return output;
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

  //fill zero infornt
  function fillZeroFront(str, i) {
    while (i !== 0) {
      str = "0" + str;
      i--;
    }
    return str;
  }

  //produce zero <string>
  function zero(i) {
    var str = "";
    while (i !== 0) {
      str += "0";
      i--;
    }
    return str;
  }

  //fill zero at the ack
  function fillZeroBack(str, i) {
    while (i !== 0) {
      str = str + "0";
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
    if (a[1] === "0" && a[1].length === 1) {
      zero += 1;
    } else {
      decimalCount += a[1].length;
    }
    if (b[1] === "0" && b[1].length === 1) {
      zero += 1;
    } else {
      decimalCount += b[1].length;
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
    //Count the decimal movement
    //by counting the decimal
    //places of the divisor.
    _a = temp[0];
    _b = temp[1];
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
    if(_a[_a.length-1] === "."){
      _a += "0";
    }
    return [_a, _b];

  }

  //a adds the integer part of a string
  function a(_a, _b) {
    var al, bl, i;
    //_a and _b are only decimals
    //check if a.lentgth > b.lentgth
    al = _a.length;
    bl = _b.length;
    while (al > bl) {
      _b = "0" + _b;
      bl += 1;
    }
    while (al < bl) {
      _a = "0" + _a;
      al += 1;
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
    //_a and _b are only decimals
    //check if a.lentgth > b.lentgth
    al = _a.length;
    bl = _b.length;
    while (al > bl) {
      _b += "0";
      bl += 1;
    }
    while (al < bl) {
      _a += "0";
      al += 1;
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
    var temp = pair(_a, _b);
    _a = temp[0];
    _b = temp[1];
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
    while (xl < yl) {
      x = "0" + x;
      xl += 1;
    }
    while (xl > yl) {
      y = "0" + y;
      yl += 1;
    }
    x = x.split("").reverse();
    y = y.split("").reverse();

    var borrow = 0;
    var diff = [];
    var temp = 0;
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
    while (xl < yl) {
      x = "0" + x;
      xl += 1;
    }
    while (xl > yl) {
      y = "0" + y;
      yl += 1;
    }
    x = x.split("").reverse();
    y = y.split("").reverse();

    var borrow = 0;
    var diff = [];
    var temp = 0;
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
    var temp = pair(_a, _b);
    _a = temp[0];
    _b = temp[1];
    var aa = _a.split(".");
    var bb = _b.split(".");
    //now subtract integer part only
    var integerPart = s(aa[0], bb[0]);
    //then subtract decimal part only
    var decimalPart = sd(aa[1], bb[1]);
    //then join the results
    return removeLeadingZeroes(s(integerPart, decimalPart[1])) + "." + removeTrailingZeroes(decimalPart[0]);
  }

  //decider
  function add(_a, _b) {
    var signa = getSign(_a);
    var signb = getSign(_b);
    var aa = abs(_a);
    var bb = abs(_b);
    var first = max(aa, bb);
    var second = min(aa, bb);
    var output = "";
    if (getSign(_a) === getSign(_b)) {
      output = signa + ADD(aa, bb);
    } else {
      if (aa === first && bb === first) {
        //different sign same numbers? Its zero!
        return "0.0";
      } else if (aa === first) {
        output = signa + subtract(first, second);
      } else if (bb === first) {
        output = signb + subtract(first, second);
      }
    }
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
  function mm(_a, _b){
    //no suasy heck format
    //direct operation!
    _b = _b.split("").reverse().join("");
    var i, output = "0", tmp;
    var bl = _b.length;
    for(i = 0; i < bl; i++){
      tmp = m(_a, _b[i]);
      output = a(output, tmp + zero(i));
    }
    return output;
  }
  //multiplication operator
  function multiply(_a, _b) {
    //store orginal
    var oa = _a;
    var ob = _b;

    var sign = "-";
    var decimal = 0;
    var temp = pair(_a, _b, true);
    _a = removeTrailingZeroes(temp[0]);
    _b = removeTrailingZeroes(temp[1]);
    if (getSign(_a) === getSign(_b)) {
      sign = "";
    }
    _a = abs(_a);
    _b = abs(_b);
    decimal = decimalCounter(_a, _b);
    _a = turnToIntIfDecIsZero(_a);
    _b = turnToIntIfDecIsZero(_b).split("").reverse().join("");
    var aa = removeDecimal(_a);
    var bb = removeDecimal(_b);
    
    if(aa === "0" || bb === "0"){
      return "0.0";
    }else if(aa === "1"){
      //reverse bb
      return sign + removeLeadingZeroes(removeTrailingZeroes(abs(ob)));
    }else if(bb === "1"){
      return sign + removeLeadingZeroes(removeTrailingZeroes(abs(oa)));
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
      return sign + removeLeadingZeroes(output + ".0");
    } else {
      var d = (output.length) - decimal;
      return sign + removeLeadingZeroes(splice(output, d, 0, "."));
    }
  }

  //divide
  function divide(_a, _b, fn) {
    var sign = "-",
      app;
    //var decimal = 0;
    var temp = pair(_a, _b, true);
    _a = removeTrailingZeroes(temp[0]);
    _b = removeTrailingZeroes(temp[1]);
    if (getSign(_a) === getSign(_b)) {
      sign = "";
    }
    _a = abs(_a);
    _b = abs(_b);
    temp = moveDecimal(_a, _b);
    temp = pair(temp[0], temp[1]);
    _a = removeLeadingZeroes(removeTrailingZeroes(temp[0]));
    _b = removeLeadingZeroes(removeTrailingZeroes(temp[1]));
    var output = "0";
    var mult = "1";
    var od = "", mtr;
    od = _b;
    while(true) {
      mtr = produce("9", (_a.length - 3) - (_b.length - 2));
      if(mtr === ""){
        _b = od;
        mult = "1";
      }else{
        _b = mm(removeDecimal(removeLeadingZeroes(removeTrailingZeroes(_b))), mtr);
        mult = mtr;
      }
      if (isMax(_a, _b)) {
        _a = subtract(_a, _b);
        console.log(_a, _b);
        output = a(output, mult);
        
      }
      if (isMin(_a, _b, true) || _a.split(".") == "0") {
        clearInterval(app);
        if (fn) {
          fn(output);
        }
        return output;
        //console.error("Hoy gising!!!");
      }
    }
  }

  //create our function constructor for arb
  //arb stands for arbitrary
  function arbShell(n){
    //n is string here
    //Serialize n
    this.value = n.replace(/(\t|\s|[a-zA-Z])/g, "");
  }
  arbShell.prototype = {
    add : function(n){
      var temp = this.value;
      this.value = add(temp, n.replace(/(\t|\s|[a-zA-Z])/g, ""));
      return this;
    },
    sub : function(n){
      var temp = this.value;
      this.value = add(temp, "-" + n.replace(/(\t|\s|[a-zA-Z])/g, ""));
      return this;
    },
    mul : function(n){
      var temp = this.value;
      this.value = multiply(temp, n.replace(/(\t|\s|[a-zA-Z])/g, ""));
      return this;
    },
    div : function(n){
      //this is a fallback function
      //division is not yet implemented well
      var temp = this.value;
      this.value = String((temp * 1) / (n * 1));
      return this;
    }
  };

  //export our function
  if (typeof define === 'function' && define.amd) {
    define([], function(n){
      return (new arbShell(n));
    });
  } else if (typeof exports === 'object') {
    module.exports = function(n){
      return (new arbShell(n));
    };
  } else {
    scope.arb = function(n){
      return (new arbShell(n));
    };
  }
})(this);