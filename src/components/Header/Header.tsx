import React, { FC } from 'react';
import { View, TouchableOpacity, Dimensions, Text } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { COLOR_CODE } from '../../utils/enums';

const { width } = Dimensions.get('window');

interface HeaderProps {
  title: string;
  onRightIconPress: () => void;
}

const Header: FC<HeaderProps> = ({
  title,
  onRightIconPress,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        shadowOffset: {
          width: 1,
          height: 3,
        },
        shadowColor: COLOR_CODE.BLACK,
        shadowOpacity: 0.1,
        shadowRadius: 2,
        padding: 15,
        elevation: 8
      }}
    >
      <View style={{ width: '33%' }} />
      <View style={{ width: '33%' }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 14,
            textAlign: 'center',
            color: COLOR_CODE.BLACK
          }}
        >
          {title}
        </Text>
      </View>
      <View
        style={{ width: '33%', alignItems: 'flex-end' }}
      >
        <TouchableOpacity
          hitSlop={{
            top: 4,
            bottom: 4,
            right: 4,
            left: 4,
          }}
          onPress={onRightIconPress}
        >
          <Entypo
            name="plus"
            size={28}
            color={COLOR_CODE.ACCENT}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
