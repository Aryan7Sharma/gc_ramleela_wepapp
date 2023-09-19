const numberToWords = (num) => {
    const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', 'Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  
    const convertThreeDigitNumber = (num) => {
      const hundredDigit = Math.floor(num / 100);
      const remainder = num % 100;
      let words = '';
  
      if (hundredDigit > 0) {
        words += units[hundredDigit] + ' Hundred';
      }
  
      if (remainder > 0) {
        if (words !== '') {
          words += ' and ';
        }
  
        if (remainder < 10) {
          words += units[remainder];
        } else if (remainder < 20) {
          words += teens[remainder - 10];
        } else {
          const tenDigit = Math.floor(remainder / 10);
          const unitDigit = remainder % 10;
          words += tens[tenDigit];
          if (unitDigit > 0) {
            words += ' ' + units[unitDigit];
          }
        }
      }
  
      return words;
    }
  
    if (num === 0) {
      return 'Zero Rupees only.';
    }
  
    const crore = Math.floor(num / 10000000);
    const lakh = Math.floor((num % 10000000) / 100000);
    const thousand = Math.floor((num % 100000) / 1000);
    const remainder = num % 1000;
  
    let words = '';
  
    if (crore > 0) {
      words += convertThreeDigitNumber(crore) + ' Crore ';
    }
  
    if (lakh > 0) {
      words += convertThreeDigitNumber(lakh) + ' Lakh ';
    }
  
    if (thousand > 0) {
      words += convertThreeDigitNumber(thousand) + ' Thousand ';
    }
  
    if (remainder > 0) {
      words += convertThreeDigitNumber(remainder);
    }
  
    return words + ' Rupees only.';
  }


  const payTypeTopayName = (paymentType) => {
    const paymentTypeName = {
        "0":"Cash",
        "1":"Cheque", 
        "2":"Paytm",
        "3":"Phone-Pay",
        "4":"Google-Pay",
        "5":"Others",
    }
    return paymentTypeName[paymentType]
}


const generateNewPassword = () => {
    const length = 8;
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset.charAt(randomIndex);
    }
    return password;
  }

  
  const hashPassword = async (plainPassword) => {
      try {
          const hashedPassword = await bcrypt.hash(plainPassword, 10);
          return hashedPassword;
      } catch (error) {
          throw error;
      }
  }
  

module.exports = {
    numberToWords,
    payTypeTopayName,
    generateNewPassword,
    hashPassword
}