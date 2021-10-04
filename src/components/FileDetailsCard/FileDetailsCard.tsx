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
import styles from './FileDetailsCard.styles';
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
          <Text style={styles.progressText}>
            Encrypting...
          </Text>
        </>
      );
      case FILE_UPLOAD_STATUS.NEXT_UP: return (
        <>
          <View style={styles.waitingCircle} />
          <Text style={styles.progressText}>
            Waiting...
          </Text>
        </>
      );
      case FILE_UPLOAD_STATUS.COMPLETED: return (
        <>
          <AntDesign
            size={20}
            name="checkcircle"
            color={COLOR_CODE.JADE}
          />
          <Text style={styles.progressText}>
            Done
          </Text>
        </>
      );
      case FILE_UPLOAD_STATUS.INCOMPLETE: return (
        <>
          <TouchableOpacity onPress={onPressRetry}>
            <Ionicons
              name="reload"
              size={20}
              color={COLOR_CODE.MANDY}
            />
          </TouchableOpacity>
          <Text style={styles.progressText}>
            Failed
          </Text>
        </>
      );
      default: return null;
    }
  }

  return (
    <View style={styles.cardContainer}>
      <View style={styles.rowContainer}>
        <Image
          source={imageSource}
          style={styles.iconStyle}
        />
        <View style={styles.textWrapper}>
          <Text style={styles.fileNameText}>
            {fileName}
          </Text>
          <Text style={styles.fileSizeText}>
            {parseFloat((fileSize / (1024 * 1024)).toFixed(2))} MB
          </Text>
        </View>
      </View>

      <View style={styles.progressIndicatorWrapper}>
        {getIndicatorViaStatus()}
      </View>
    </View>
  );
};

export default FileDetailsCard;
