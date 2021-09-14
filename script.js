function reverseStr(str){
    var listOfChars = str.split('');
    var reverseListOfChars = listOfChars.reverse(); 
    var reversedStr = reverseListOfChars.join('');

    return reversedStr;
}

function isPalindrome(str){
    var reverse = reverseStr(str);
    return str===reverse;
}

function convertDateToStr(date){
    var dateStr = {date:'', month:'', year:''}

    if(date.day<10){
        dateStr.date = "0" + date.day;
    }
    else{
        dateStr.date = date.day.toString();
    }
    if(date.month<10){
        dateStr.month = "0" + date.month;
    }
    else{
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();
    return dateStr;
}

function getAllDateFormats(date){
    var dateStr = convertDateToStr(date);

    var ddmmyyyy = dateStr.date + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.date + dateStr.year; 
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.date;
    var ddmmyy = dateStr.date + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.date + dateStr.year.slice(-2); 
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.date;
    return [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd ]
}

function checkPalindromeForAllDateFormats(date){
    var listOfPalindromes = getAllDateFormats(date);

    var flag = false

    for (var i=0; i < listOfPalindromes.length; i++){
        if(isPalindrome(listOfPalindromes[i])){
            flag = true;
            break;
        }
    }
    return flag;
}

function isLeapYear(year){
    if(year % 400 === 0){
        return true;
    }
    if(year % 100 === 0){
        return false;
    }
    if(year % 4 === 0){
        return true;
    }
    return false;
}

function getNextDate(date){
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

    if(month === 2){
        if(isLeapYear(year)){
            if(day>29){
                day = 1;
                month++;
            }
        }
        else{
            if(day>28){
                day =1;
                month++;
            }
        }
    }
    else{
        if(day > daysInMonth[month-1]){
            day = 1;
            month++;
        }
    }

    if(month>12){
        month = 1;
        year++;
    }
    return {
        day:day,
        month:month,
        year:year
    };
}
function getNextPalindromeDate(date){
    var ctr = 0;
    var nextDate = getNextDate(date);

    while(1){
        ctr++;
        var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if (isPalindrome){
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [ctr, nextDate];
}

function getPreviousDate(date){
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

    if(month === 3){
        if(isLeapYear(year)){
            if(day===1){
                day = 29;
                month--;
            }
        }
        else{
            if(day<1){
                day =28;
                month--;
            }
        }
    }
    else{
        if(day < 1){
            day = daysInMonth[month-1];
            month--;
        }
    }
    if(month <1){
        month = 12;
        year--;
    }
    return {
        day:day,
        month:month,
        year:year
    };

}

function getPreviousPalindromeDate(date){
    var ctr = 0;
    var previousDate = getPreviousDate(date);

    while(1){
        ctr++;
        var isPalindrome = checkPalindromeForAllDateFormats(previousDate);
        if (isPalindrome){
            break;
        }
        previousDate = getPreviousDate(previousDate);
    }
    return [ctr, previousDate];

}

var dateInputRef = document.getElementById("bday-input");
var showBtnRef = document.getElementById("show-btn");
var resultRef = document.getElementById("result");

function clickHandler(e){
    var bdayStr = dateInputRef.value;
    if(bdayStr !== ""){
        var listOfDate = bdayStr.split('-');
        var date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        };
        console.log(date);
        var isPalindrome = checkPalindromeForAllDateFormats(date);
        console.log(isPalindrome);
        if(isPalindrome){
            resultRef.innerText = "Yay! Your Birthday is a palindrome!🎉"
        }
        else{
            var [ctr,nextDate] = getNextPalindromeDate(date);
            resultRef.innerText = 'The next palindrome date is on '+ nextDate.day +"-"+ nextDate.month +"-"+ nextDate.year + "..You missed it by " + ctr + " days";
        }
    }
}
showBtnRef.addEventListener("click", clickHandler);