const upToTwoDecimal = (value) => {
    const num = Number(value);
    if (num % 1 === 0) {
      return num.toFixed(0); // no decimal
    } else if (num % 1 === 0.5) {
      return num.toFixed(1); // one decimal
    } else {
      return num.toFixed(2); // two decimals
    }
  };


  export const fixDecimalService={
    upToTwoDecimal
  }