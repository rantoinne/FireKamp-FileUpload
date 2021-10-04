import React, { FC, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'
import ImageLinks from '../../utils/ImageLinks';
import { COLOR_CODE, FILE_UPLOAD_STATUS } from '../../utils/enums';
import Accordion from '../Accordion';
import FileDetailsCard from '../../components/FileDetailsCard';
import { useDispatch } from 'react-redux';
import { handleCancelUpload } from '../../store/actions/file.actions';

interface UploadingProps {
  data: any[];
}

const Uploading: FC<UploadingProps> = ({
  data,
}: UploadingProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const dispatch = useDispatch();

  const cancelUpload = () => {
    dispatch(handleCancelUpload());
  };

  const renderHeaderComponent = () => (
    <TouchableOpacity
      onPress={() => setIsExpanded(!isExpanded)}
      style={{
        width: '100%',
      }}
    >
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Text>
          Uploading
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginRight: 8
          }}
        >
          {!!data.length && (
            <TouchableOpacity
              onPress={cancelUpload}
              style={{ borderBottomWidth: 1, marginRight: 10, borderColor: COLOR_CODE.ACCENT }}
            >
              <Text style={{ fontSize: 8, color: COLOR_CODE.ACCENT, fontWeight: '700' }}>
                CANCEL UPLOAD
              </Text>
            </TouchableOpacity>
          )}
          <Entypo
            name={isExpanded ? 'chevron-thin-up' : 'chevron-thin-down'}
            size={10}
            color={COLOR_CODE.BLACK}
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderFiles = () => (
    <>
      {
        data?.map((d: any) => (
          <FileDetailsCard
            key={d.index}
            fileSize={d.fileSize}
            fileName={d.fileName}
            imageSource={ImageLinks.pdf}
            status={FILE_UPLOAD_STATUS.UPLOADING}
          />
        ))
      }
    </>
  );

  const renderEmptyDataView = () => (
    <Text style={{ fontSize: 8, color: COLOR_CODE.SILVER_CHALICE }}>
      No file to upload.
    </Text>
  );

  const renderContentComponent = () => (
    <View
      style={{
        width: '100%',
      }}
    >
      {
        data?.length ? renderFiles() : renderEmptyDataView()
      }
    </View>
  );

  return (
    <Accordion
      isExpanded={isExpanded}
      HeaderComponent={renderHeaderComponent()}
      ContentComponent={renderContentComponent()}
    />
  );
};

export default Uploading;
