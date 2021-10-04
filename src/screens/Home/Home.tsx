import React, { FC, useMemo } from 'react';
import {
  Text,
  SafeAreaView,
  Alert,
  ScrollView,
  View,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { useDispatch, useSelector } from 'react-redux';
import { handleAddFile, handleNextUpStatusChange, handleUploadComplete } from '../../store/actions/file.actions';
import { selectFiles } from '../../store/selectors/file.selectors';
import Header from '../../components/Header';
import { FILE_UPLOAD_STATUS } from '../../utils/enums';
import Uploading from '../../components/Uploading';
import NextUp from '../../components/NextUp';
import styles from './Home.styles';
import Completed from '../../components/Completed';
import Incomplete from '../../components/Incomplete';
import delay from '../../utils/delay';

interface HomeProps {
  navigation: any;
}

const Home: FC<HomeProps> = ({ navigation }: HomeProps) => {
  const dispatch = useDispatch();
  const files: any[] = useSelector(selectFiles);

  const uploadingFiles = useMemo(() => files?.filter(f => f.status === FILE_UPLOAD_STATUS.UPLOADING), [files]);
  const nextUpFiles = useMemo(() => files?.filter(f => f.status === FILE_UPLOAD_STATUS.NEXT_UP), [files]);
  const completedFiles = useMemo(() => files?.filter(f => f.status === FILE_UPLOAD_STATUS.COMPLETED), [files]);
  const incompleteFiles = useMemo(() => files?.filter(f => f.status === FILE_UPLOAD_STATUS.INCOMPLETE), [files]);

  const hasAtleastOneUploadingFile = useMemo(() => files?.filter(f => f.status === FILE_UPLOAD_STATUS.UPLOADING).length > 0, [files]);

  const uploadFile = async () => {
    console.log(!!nextUpFiles);
    dispatch(handleUploadComplete());
    if (!!nextUpFiles) {
      dispatch(handleNextUpStatusChange());
      await uploadFileTimer();
    }
    // return;
  };

  const uploadFileTimer = async () => {
    await delay();
    uploadFile();
  };

  const pickDocumentFromStorage = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      })
      console.log({ res });
      dispatch(handleAddFile({
        index: files?.[0].index === -1 ? 0 : files.length,
        fileName: res?.[0]?.name ?? "Filename unknown",
        status: hasAtleastOneUploadingFile ? FILE_UPLOAD_STATUS.NEXT_UP : FILE_UPLOAD_STATUS.UPLOADING,
        fileSize: res?.[0]?.size,
        type: res?.[0]?.type
      }));
      uploadFileTimer();
    } catch (err: any) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert(err.message);
      } else {
        throw Alert.alert(err.message);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        title="Manage Files"
        onRightIconPress={pickDocumentFromStorage}
      />
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 32 }}
      >
        <Uploading data={uploadingFiles} />
        <View style={styles.separator} />

        <NextUp data={nextUpFiles} />
        <View style={styles.separator} />

        <Completed data={completedFiles} />
        <View style={styles.separator} />

        <Incomplete data={incompleteFiles} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;
