import { ENumberingType } from '../interfaces';

const getNumberingSymbol = (index: number, numberingType: ENumberingType) => {
  switch (numberingType) {
    case ENumberingType.void:
      return '';
    case ENumberingType.number:
      return `${index + 1}.`;
    case ENumberingType.point:
      return '•';
  }
};

export default getNumberingSymbol;
