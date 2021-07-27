export const stringHasInteger = (
  str: string, 
  options: { allowZero?: boolean; allowEmpty?: boolean; allowNegative?: boolean } = { 
    allowZero: false, 
    allowEmpty: true,
    allowNegative: false 
  }
) => {
  if (str === '' && options?.allowEmpty) {
    return true;
  }

  const numb = Number(str);

  const badCasesChecks = [
    isNaN(numb),
    !options?.allowZero && numb === 0,
    !options.allowNegative && numb < 0
  ];

  if (badCasesChecks.some((isInvalid) => isInvalid)) {
    return false;
  }

  const hasDot = str.includes('.');

  return !hasDot && Number.isInteger(numb);
};

export const getRandomInt = (min: number, max: number) => min + Math.floor(Math.random() * (max - min + 1));