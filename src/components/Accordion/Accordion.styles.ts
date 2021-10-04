import { StyleSheet } from 'react-native';
import { COLOR_CODE } from '../../utils/enums';

export default StyleSheet.create({
  viewStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%'
  },
  separator: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: COLOR_CODE.GALLERY_WHITE,
    marginTop: 10,
    marginBottom: 20
  }
});
