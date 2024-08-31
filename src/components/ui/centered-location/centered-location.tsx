import React, { FC, ReactNode } from 'react';
import style from './centered-location.module.css';
import clsx from 'clsx';

export type TCenteredLocationUIProps = {
    title?: string;
    textStyle?: string;
    children: ReactNode;
  }

export const CenteredLocationUI: FC<TCenteredLocationUIProps> = ({
  title,
  textStyle,
  children
}: TCenteredLocationUIProps) => (
  <div className={style.container}>
    {title && (
      <h2
        className={clsx('text', {
          [`text_type_${textStyle}`]: textStyle,
          [`text_type_main-large`]: !textStyle
        })}
      >
        {title}
      </h2>
    )}
    {children}
  </div>
);