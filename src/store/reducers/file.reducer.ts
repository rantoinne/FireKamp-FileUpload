import produce from 'immer';
import { FILE_UPLOAD_STATUS } from '../../utils/enums';

import {
  ADD_FILE,
  CANCEL_UPLOAD,
  CANCEL_QUEUED_BULK,
  FilePayload,
  UPLOAD_COMPLETE,
  PICK_NEXT_UP
} from '../actions/file.actions';

export const initialState = [{
  index: -1,
  status: '',
  fileName: '',
  fileSize: 0,
  type: '',
}];

const FileReducer = produce((draft, action): any => {
  let globalState = draft;
  switch (action.type) {
    case ADD_FILE:
      if (draft?.[0].index === -1) {
        draft.pop();
      }
      draft.push(action.payload);
      break;
    case CANCEL_UPLOAD:
      draft?.forEach((d: FilePayload, index: number) => {
        if (d.status === FILE_UPLOAD_STATUS.UPLOADING) {
          globalState[d.index].status = FILE_UPLOAD_STATUS.INCOMPLETE;
        }
      });
      draft = globalState;
      break;
    case CANCEL_QUEUED_BULK:
      draft?.forEach((d: FilePayload, index: number) => {
        if (d.status === FILE_UPLOAD_STATUS.NEXT_UP) {
          globalState[d.index].status = FILE_UPLOAD_STATUS.INCOMPLETE;
        }
      });
      draft = globalState;
      break;
    case UPLOAD_COMPLETE:
      draft?.forEach((d: FilePayload, index: number) => {
        if (d.status === FILE_UPLOAD_STATUS.UPLOADING) {
          globalState[d.index].status = FILE_UPLOAD_STATUS.COMPLETED;
        }
      });
      draft = globalState;
      break;
    case PICK_NEXT_UP:
      const nextUpFile = globalState?.find((d: FilePayload) => d.status === FILE_UPLOAD_STATUS.NEXT_UP);
      console.log({ nextUpFile });
      draft?.forEach((d: FilePayload) => {
        if (d.index === nextUpFile?.index) {
          globalState[d.index].status = FILE_UPLOAD_STATUS.UPLOADING;
        }
      });
      draft = globalState;
      break;
    default:
      return draft;
  }
}, initialState);

export default FileReducer;
