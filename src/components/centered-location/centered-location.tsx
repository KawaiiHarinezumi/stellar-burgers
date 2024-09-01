import React, { FC, ReactNode } from 'react';
import { CenteredLocationUI } from '../ui/centered-location/centered-location';

export type TCenteredLocationProps = {
    title?: string;
    textStyle?: string;
    children: ReactNode;
}

export const CenteredLocation: FC<TCenteredLocationProps> = ({
  title,
  textStyle,
  children
}) => (
  <CenteredLocationUI
    title={title}
    textStyle={textStyle}
    children={children}
  />
);