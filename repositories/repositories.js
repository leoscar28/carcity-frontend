import User from '/repositories/user/user';
import UploadStatus from "@/repositories/uploadStatus/uploadStatus";
export const repository = ($axios) => ({
  user: User($axios),
  uploadStatus: UploadStatus($axios),
})
