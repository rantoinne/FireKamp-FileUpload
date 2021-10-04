import { StyleSheet } from 'react-native';
import { COLOR_CODE } from '../../utils/enums';

const styles = StyleSheet.create({
  progressText: {
    fontSize: 8,
    color: COLOR_CODE.SILVER_CHALICE,
    marginTop: 4
  },
  waitingCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLOR_CODE.DUSTY_GRAY
  },
  cardContainer: {
    width: '100%',
    backgroundColor: COLOR_CODE.WHITE_LILAC,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  iconStyle: {
    width: 24,
    height: 28,
    resizeMode: 'cover',
  },
  textWrapper: {
    marginLeft: 15,
    alignItems: 'flex-start',
  },
  fileNameText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLOR_CODE.MINE_SHAFT
  },
  fileSizeText: {
    fontSize: 8,
    marginTop: 9,
    color: COLOR_CODE.SILVER_CHALICE
  },
  progressIndicatorWrapper: {
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default styles;
