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
import { getIconForType } from '../../utils/iconHelper';

interface IncompleteProps {
  data: any;
}

const Incomplete: FC<IncompleteProps> = ({
  data,
}: IncompleteProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

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
          Incomplete Uploads
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginRight: 8
          }}
        >
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
      <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
        <TouchableOpacity
          onPress={() => null}
          style={{ borderBottomWidth: 1, marginRight: 10, borderColor: COLOR_CODE.ACCENT }}
        >
          <Text style={{ fontSize: 8, color: COLOR_CODE.ACCENT, fontWeight: '700' }}>
            RETRY ALL
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => null}
          style={{ borderBottomWidth: 1, marginRight: 10, borderColor: COLOR_CODE.ACCENT }}
        >
          <Text style={{ fontSize: 8, color: COLOR_CODE.ACCENT, fontWeight: '700' }}>
            DISMISS ALL
          </Text>
        </TouchableOpacity>
      </View>
      {
        data?.map((d: any) => (
          <FileDetailsCard
            key={d.index}
            imageSource={getIconForType(d.type)}
            fileName={d.fileName}
            fileSize={d.fileSize}
            status={FILE_UPLOAD_STATUS.INCOMPLETE}
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

export default Incomplete;
