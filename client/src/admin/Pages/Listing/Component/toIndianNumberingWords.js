var double_digit_names = {
  10: "ten",
  11: "eleven",
  12: "twelve",
  13: "thirteen",
  14: "fourteen",
  15: "fifteen",
  16: "sixteen",
  17: "seventeen",
  18: "eighteen",
  19: "nineteen",
};
var single_digit_names = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
};
var tens_names = {
  2: "twenty",
  3: "thirty",
  4: "forty",
  5: "fifty",
  6: "sixty",
  7: "seventy",
  8: "eighty",
  9: "ninety",
};
function twoDigits(n) {
  let [a, b] = ("" + n).split("");
  if (!b) {
    return single_digit_names[a];
  }
  if (a == "0") {
    if (b == "0") {
      return "";
    } else {
      return single_digit_names[b];
    }
  } else if (a == "1") {
    return double_digit_names[a + b];
  } else {
    if (b == "0") {
      return tens_names[a];
    }
    return `${tens_names[a]} ${single_digit_names[b]}`;
  }
}
function threeDigits(n) {
  let [a, b, c] = ("" + n).split("");
  if (a == "0") {
    return twoDigits(b + c);
  } else {
    let twoDigit_str = twoDigits(b + c);
    if (twoDigit_str.length > 1) { twoDigit_str = `and ${twoDigit_str}` }
    return `${single_digit_names[a]} hundred ${twoDigit_str}`;
  }
}

function higherDigits(str_num) {
  let num_len = str_num.length;

  let hundreds_start = num_len - 3;
  let thousands_start = Math.max(0, num_len - 5);
  let lakhs_start = Math.max(0, num_len - 7);

  let hundreds = str_num.slice(hundreds_start);
  let thousands = str_num.slice(thousands_start, hundreds_start);
  let lakhs = str_num.slice(lakhs_start, thousands_start);

  let hundreds_str = hundreds != 0 ? threeDigits(hundreds) : "";
  let thousands_str =
    num_len > 3 && thousands != 0 ? twoDigits(thousands) + " thousand" : "";
  let lakhs_str = num_len > 5 && lakhs != 0 ? twoDigits(lakhs) + " lakhs" : "";

  return `${lakhs_str} ${thousands_str} ${hundreds_str}`;
}
function decimal_part(str_num) {
  if (str_num.includes(".")) {
    let decimal_num = str_num.split(".")[1];
    if (decimal_num == 0) {
      return "";
    }
    return twoDigits(decimal_num) + " paise";
  }
  return "";
}
function remove_beginning_zeroes(str_num) {
  let final_num = "";
  let begin_index = 0;
  for (let i = 0; i < str_num.length; i++) {
    if (str_num[i] == "0") {
      continue;
    } else {
      begin_index = i;
      break;
    }
  }
  final_num = str_num.slice(begin_index);
  return final_num;
}
function whole_part(str_num) {
  let whole_num;
  if (str_num.includes(".")) {
    whole_num = str_num.split(".")[0];
  } else {
    whole_num = str_num;
  }
  whole_num = remove_beginning_zeroes(whole_num);
  let whole_num_len = whole_num.length;
  if (whole_num_len < 3) {
    return twoDigits(whole_num);
  } else if (whole_num_len == 3) {
    return threeDigits(whole_num);
  } else if (whole_num_len < 8) {
    return higherDigits(whole_num);
  } else {
    let lakhs_str = higherDigits(whole_num.slice(whole_num.length - 7));
    let crores_str = whole_part(whole_num.slice(0, whole_num.length - 7));
    return `${crores_str} Crores ${lakhs_str}`;
  }
}
function inwords(num) {
  num = parseFloat(num);
  num = num.toFixed(2);
  let str_num = String(num);
  let decimal_str = decimal_part(str_num);
  if (decimal_str != "") {
    decimal_str = "and " + decimal_str;
  }
  let whole_str = whole_part(str_num);
  if (whole_str == "one") {
    return "one Rupee";
  }
  return `${whole_str} Rupees ${decimal_str}`;
}

export default inwords;
