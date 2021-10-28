const checkEmpty = (
  text: string,
  deleteFunction: () => void,
  setFunction: () => void,
): void => {
  text === '' ? deleteFunction() : setFunction();
};

export default checkEmpty;
