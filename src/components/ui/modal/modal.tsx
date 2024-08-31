import React, { FC, memo } from 'react';
import clsx from 'clsx';

import styles from './modal.module.css';

import { CloseIcon } from '@zlden/react-developer-burger-ui-components';
import { TModalUIProps } from './type';
import { ModalOverlayUI } from '@ui';

export const ModalUI: FC<TModalUIProps> = memo(
  ({ title, onClose, children, titleStyle }) => (
    <>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3 className={clsx('text', {
            [`text_type_${titleStyle}`]: titleStyle,
            [`text_type_main-large`]: !titleStyle
            })}>
            {title}
          </h3>
          <button className={styles.button} type='button'>
            <CloseIcon type='primary' onClick={onClose} />
          </button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
      <ModalOverlayUI onClick={onClose} />
    </>
  )
);
