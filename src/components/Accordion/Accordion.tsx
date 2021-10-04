import React, { FC } from 'react';
import { View } from 'react-native';
import styles from './Accordion.styles';

type Props = {
  HeaderComponent: React.ReactElement;
  ContentComponent: React.ReactElement;
  isExpanded: boolean;
}

const Accordion: FC<Props> = ({ HeaderComponent, ContentComponent, isExpanded }) => {
  return (
    <>
      {HeaderComponent}
      <View style={styles.separator} />
        {isExpanded && <View style={styles.viewStyle}>
        {ContentComponent}
      </View>
      }
    </>
  );
}

export default Accordion;