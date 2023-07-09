describe("The arb.js test suite", function(){
  var arb = require("../../src/index.js");
  
  var mulTestPair = ["1234567890", "9876543210"];
  var mulTestAnswer = "12193263111263526900.0";
  var addTestPair = ["1234567890", "9876543210"];
  var addTestAnswer = "11111111100.0";
  var subTestPair = ["1234567890", "9876543210"];
  var subTestAnswer = "-8641975320.0";
  var divTestPair = ["1234567890", "9876543210"];
  var divTestAnswer = "0.1249999988609375000";
  
  
  describe("Addition tests", function(){
    it("should work properly on addition", function(){
      //console.info("Running Addition Test...");
      expect(arb(addTestPair[0]).add(addTestPair[1]).value).toBe(addTestAnswer);
    });
  });
  
  describe("Subtraction tests", function(){
    //console.info("Running Subtraction Test...");
    it("should work properly on subtraction", function(){
      expect(arb(subTestPair[0]).sub(subTestPair[1]).value).toBe(subTestAnswer);
    });
  });
  
  describe("Multiplication tests", function(){
    //console.info("Running multiplication Test...");
    it("should work properly on multiplication", function(){
      expect(arb(mulTestPair[0]).mul(mulTestPair[1]).value).toBe(mulTestAnswer);
    });
  });
  
  describe("Division tests", function(){
    //console.info("Running Division Test...");
    it("should work properly on division", function(){
      expect(arb(divTestPair[0]).div(divTestPair[1]).value.substr(0, 21)).toBe(divTestAnswer);
      expect(arb("1").div("0.0001").value).toBe("10000.0");
      expect(arb("1").div("89").value.substr(0, 22)).toBe("0.01123595505617977528");
    });
  });
  
  describe("Equal tests", function(){
    it("should work properly on equal", function(){
      expect(arb("12345").eq("12345.0")).toBe(true);
    });
  });
  
  describe("Less than tests", function(){
    it("should work properly", function(){
      expect(arb("12345.0").lt("12346")).toBe(true);
      expect(arb("-12345.0").lt("12345.0")).toBe(true);
    });
  });
  
  describe("Greater than tests", function(){
    it("should work properly", function(){
      expect(arb("123465365.0").gt("12346")).toBe(true);
      expect(arb("-2345827389.0").gt("-1239999999945.0")).toBe(true);
    });
  });
  
  describe("Less than or equal tests", function(){
    it("should work properly", function(){
      expect(arb("12345.0").lte("12346")).toBe(true);
      expect(arb("12345.0").lte("12345.0")).toBe(true);
    });
  });
  
  describe("Greater than or equal tests", function(){
    it("should work properly", function(){
      expect(arb("12346.0").gte("12346")).toBe(true);
      expect(arb("9112345.0").gte("12345.0")).toBe(true);
    });
  });
});
