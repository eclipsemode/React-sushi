import React from 'react';

interface IProps{
  children: React.ReactNode
}
const composeReactComponents = (providers: React.ComponentType<IProps>[]) =>
  providers.reduce((Prev: React.ComponentType<IProps>, Curr: React.ComponentType<IProps>) => ({ children }: IProps) => (
    <Prev>
      <Curr>{children}</Curr>
    </Prev>
  ));

export {composeReactComponents}