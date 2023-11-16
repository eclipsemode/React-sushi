import React from 'react';

export default function composeScripts(scripts: React.ComponentType[]) {
  return scripts.reduce((Prev, Curr) => () => (
    <>
      <Prev />
      <Curr />
    </>
  ));
}