function reverseStr(str){
    var listOfChars = str.split('');
    var reverseListOfChars = listOfChars.reverse(); 
    var reversedStr = reverseListOfChars.join('');

    return reversedStr;
}
console.log(reverseStr("Hello"));

function isPalindrome(str){
    var reverse = reverseStr(str);
    return str===reverse;
}
function convertDateToStr(date){
    var dateStr = {date:'', month:'', year:'' }
}
console.log(isPalindrome("madam"));