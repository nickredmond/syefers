var ASCII_OFFSET = 64;
var Z_CODE = 26;
var ALPHABET_SIZE = 26;
var DEFAULT_VARIANCE = 7;

var onEncodePress = function() {
	transformText(encode);
};
var onDecodePress = function() {
  transformText(decode);
};
var transformText = function(transformFunction) {
  var inputText = document.getElementById("inputText").value;
  var shiftAmount = document.getElementById("varianceInput").value || DEFAULT_VARIANCE;
  var transformedText = transformFunction(inputText, shiftAmount);
  document.getElementById("resultText").innerHTML = transformedText;
};

var shiftText = function(inputText, variance, isPositiveShift) {
	var text = inputText.toUpperCase();
  var encodedText = "";
  
  for (var i = 0; i < text.length; i++) {
  	var nextChar = text[i];
    if ("A".charCodeAt(0) <= nextChar.charCodeAt(0) && 
        nextChar.charCodeAt(0) <= "Z".charCodeAt(0)) {
    	var charValue = nextChar.charCodeAt(0) - ASCII_OFFSET;

      var shiftDirection = isPositiveShift ? 1 : -1;
      var shiftVariance = shiftDirection * variance;
      var encodedCharValue = (charValue + shiftVariance) % ALPHABET_SIZE;

      if (encodedCharValue <= 0) {
        encodedCharValue = Z_CODE + encodedCharValue;
      }

      var encodedChar = 
      	String.fromCharCode(encodedCharValue + ASCII_OFFSET);

      encodedText += encodedChar;
    }
    else {
    	encodedText += nextChar;
    }
  }
  
  return encodedText;
}

var encode = function(inputText, variance) {
  return shiftText(inputText, variance, true);
}
var decode = function(inputText, variance) {
  return shiftText(inputText, variance, false);
}