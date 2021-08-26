import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from 'react-grid-dnd';
import styles from './DNDList.module.css';
import React from 'react';

function Example() {
  const [items, setItems] = React.useState([1, 2, 3, 4, 5, 6, 7]); // supply your own state

  // target id will only be set if dragging from one dropzone to another.
  function onChange(
    sourceId: any,
    sourceIndex: any,
    targetIndex: any,
    targetId: any,
  ) {
    const nextState = swap(items, sourceIndex, targetIndex);
    setItems(nextState);
  }

  return (
    <GridContextProvider onChange={onChange}>
      <GridDropZone
        id="items"
        boxesPerRow={4}
        rowHeight={100}
        className={styles.zone}
      >
        {items.map((item) => (
          <GridItem key={item}>
            <div className={styles.item}>{item}</div>
          </GridItem>
        ))}
      </GridDropZone>
    </GridContextProvider>
  );
}

export default Example;
