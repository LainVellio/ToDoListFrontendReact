import React from 'react';
import {
  EColors,
  EditMenuItemType,
  ENumberingType,
  ETextStyle,
} from '../../../interfaces';

interface EditMenuItemsProps<T> {
  items: T[];
  currentItem: string;
  renderItem: (item: T) => JSX.Element;
}

const EditMenuItems = <
  T extends EditMenuItemType<EColors | ETextStyle | ENumberingType>,
>({
  items,
  currentItem,
  renderItem,
}: EditMenuItemsProps<T>) => {
  return (
    <>
      {items.map((item: T, index: number) =>
        item.value
          ? currentItem !== item.value && (
              <span key={index}>{renderItem(item)}</span>
            )
          : null,
      )}
    </>
  );
};

export default EditMenuItems;
