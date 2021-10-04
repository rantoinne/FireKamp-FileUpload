import { Dispatch } from 'redux';

export const ADD_FILE = 'file/add';
export const CANCEL_UPLOAD = 'file/cancel-upload';
export const CANCEL_QUEUED_BULK = 'file/cancel-queued-bulk';
export const UPLOAD_COMPLETE = 'file/upload-complete';
export const PICK_NEXT_UP = 'file/pick-next-up';

export type FilePayload = {
  index: number,
  status: string,
  fileName: string,
  fileSize: number,
  type: string,
};

type CancelUpload = {
  index: number
}

type BulkOperation = {
  indices: number[]
}

// When + is pressed
export function addFile(filePayload: FilePayload) {
  return { type: ADD_FILE, payload: filePayload };
}

export function handleAddFile(filePayload: FilePayload) {
  return async (dispatch: Dispatch) => {
    dispatch(addFile(filePayload));
  };
}


// When CANCEL UPLOAD is pressed
export function cancelUpload() {
  return { type: CANCEL_UPLOAD };
}

export function handleCancelUpload() {
  return async (dispatch: Dispatch) => {
    dispatch(cancelUpload());
  };
}

// When upload completes
export function uploadComplete() {
  return { type: UPLOAD_COMPLETE };
}

export function handleUploadComplete() {
  return async (dispatch: Dispatch) => {
    dispatch(uploadComplete());
  };
}

// When pick new to upload from NEXT UP
export function nextUpStatusChange() {
  return { type: PICK_NEXT_UP };
}

export function handleNextUpStatusChange() {
  return async (dispatch: Dispatch) => {
    dispatch(nextUpStatusChange());
  };
}




// When CANCEL ALL is pressed
export function cancelAllQueued() {
  return { type: CANCEL_QUEUED_BULK };
}

export function handleCancelAllQueued() {
  return async (dispatch: Dispatch) => {
    dispatch(cancelAllQueued());
  };
}









export function handleBulkRemove(filePayload: FilePayload) {
  return async (dispatch: Dispatch) => {
    dispatch(addFile(filePayload));
  };
}

// incomplete retry
export function handleBulkUpload(filePayload: FilePayload) {
  return async (dispatch: Dispatch) => {
    dispatch(addFile(filePayload));
  };
}
