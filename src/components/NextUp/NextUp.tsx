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
import FileDetailsCard from '../FileDetailsCard';
import { useDispatch } from 'react-redux';
import { handleCancelAllQueued } from '../../store/actions/file.actions';
import { getIconForType } from '../../utils/iconHelper';

interface NextUpProps {
  data: any[];
}

const NextUp: FC<NextUpProps> = ({
  data,
}: NextUpProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const dispatch = useDispatch();

  const cancelBulk = () => {
    dispatch(handleCancelAllQueued());
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
          Next Up
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
              onPress={cancelBulk}
              style={{ borderBottomWidth: 1, marginRight: 10, borderColor: COLOR_CODE.ACCENT }}
            >
              <Text style={{ fontSize: 8, color: COLOR_CODE.ACCENT, fontWeight: '700' }}>
                CANCEL ALL
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
            imageSource={getIconForType(d.type)}
            fileName={d.fileName}
            fileSize={d.fileSize}
            status={FILE_UPLOAD_STATUS.NEXT_UP}
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

export default NextUp;
