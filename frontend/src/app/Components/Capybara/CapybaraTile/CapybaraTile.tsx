import React from 'react';
import CapybaraLink from './CapybaraLink/CapybaraLink';
import { CapybaraTileProps } from './types';

const CapybaraTile: React.FC<CapybaraTileProps> = ({ type, content, styles, dimensions }) => {
  switch (type) {
    case 'link':
      return (
        <CapybaraLink styles={styles} to={content.url} dimensions={dimensions}>
          {content.title}
        </CapybaraLink>
      );
    case 'folder':
      return (
        <CapybaraLink styles={styles} to={content.url} dimensions={dimensions}>
          {content.title}
        </CapybaraLink>
      );
    default:
      throw new Error('Invalid capybara tile type recieved while mapping types to Components');
  }
};

export default CapybaraTile;
