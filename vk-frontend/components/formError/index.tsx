import React, { ReactNode } from 'react';
import styles from './FieldError.module.scss';

const FieldError = ({children}: {children: ReactNode}) => {
  return (
    <div className={styles.main}>
      <span>{children}</span>
    </div>
  );
};

export default FieldError;
