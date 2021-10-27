const checkEmpty = (
  text: string,
  deleteFunction: Function,
  setFunction: Function,
) => {
  text === '' ? deleteFunction() : setFunction();
};

export default checkEmpty;
