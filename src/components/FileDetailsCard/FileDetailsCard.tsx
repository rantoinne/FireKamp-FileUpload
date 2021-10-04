import React, { FC } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  ImageProps,
  ActivityIndicator,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLOR_CODE, FILE_UPLOAD_STATUS } from '../../utils/enums';


interface FileDetailsCardProps {
  imageSource: ImageProps;
  fileName: string;
  fileSize: number;
  status: FILE_UPLOAD_STATUS;
  onPressRemove?: () => void;
  onPressRetry?: () => void;
}

const FileDetailsCard: FC<FileDetailsCardProps> = ({
  imageSource,
  fileName,
  fileSize,
  status,
  onPressRemove,
  onPressRetry,
}) => {
  const getIndicatorViaStatus = () => {
    switch (status) {
      case FILE_UPLOAD_STATUS.UPLOADING: return (
        <>
          <ActivityIndicator
            size={20}
            color={COLOR_CODE.ACCENT}
          />
          <Text style={{ fontSize: 8, color: COLOR_CODE.SILVER_CHALICE, marginTop: 4 }}>
            Encrypting...
          </Text>
        </>
      );
      case FILE_UPLOAD_STATUS.NEXT_UP: return (
        <>
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: COLOR_CODE.DUSTY_GRAY
            }}
          />
          <Text style={{ fontSize: 8, color: COLOR_CODE.SILVER_CHALICE, marginTop: 4 }}>
            Waiting...
          </Text>
        </>
      );
      case FILE_UPLOAD_STATUS.COMPLETED: return (
        <>
          <AntDesign
            name="checkcircle"
            size={20}
            color={COLOR_CODE.JADE}
          />
          <Text style={{ fontSize: 8, color: COLOR_CODE.SILVER_CHALICE, marginTop: 4 }}>
            Done
          </Text>
        </>
      );
      case FILE_UPLOAD_STATUS.INCOMPLETE: return (
        <>
          <TouchableOpacity
            onPress={onPressRetry}
          >
            <Ionicons
              name="reload"
              size={20}
              color={COLOR_CODE.MANDY}
            />
          </TouchableOpacity>
          <Text style={{ fontSize: 8, color: COLOR_CODE.SILVER_CHALICE, marginTop: 4 }}>
            Failed
          </Text>
        </>
      );
      default: return null;
    }
  }

  return (
    <View
      style={{
        width: '100%',
        backgroundColor: COLOR_CODE.WHITE_LILAC,
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 22,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <Image
          source={imageSource}
          style={{
            width: 24,
            height: 28,
            resizeMode: 'cover',
          }}
        />
        <View
          style={{
            marginLeft: 15,
            alignItems: 'flex-start',
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: '500', color: COLOR_CODE.MINE_SHAFT }}>
            {fileName}
          </Text>
          <Text style={{ fontSize: 8, marginTop: 9, color: COLOR_CODE.SILVER_CHALICE }}>
            {parseFloat((fileSize / (1024)).toFixed(2))} MB
          </Text>
        </View>
      </View>

      <View
        style={{
          marginRight: 16,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {getIndicatorViaStatus()}
      </View>
    </View>
  );
};

export default FileDetailsCard;
