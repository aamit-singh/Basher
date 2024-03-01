import React from "react";

type FileUploaderProps = {
  imageUrl: string;
  onFieldChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
};

const FileUploader = ({
  imageUrl,
  onFieldChange,
  setFiles,
}: FileUploaderProps) => {
  return <div>FileUploader</div>;
};

export default FileUploader;
