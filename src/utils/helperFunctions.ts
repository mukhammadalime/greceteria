import { ChangeEvent, SetStateAction } from "react";
import { ImageItemTypes } from "./user-types";

/// ADD PRODUCT MODAL HELPER FUNCTIONS
export const setImagesHandler = (
  e: ChangeEvent<HTMLInputElement>,
  setImagesForServer: (value: SetStateAction<FileList | []>) => void,
  setImagesForClient: (value: SetStateAction<ImageItemTypes[] | []>) => void
) => {
  const selectedFiles = (e.target as HTMLInputElement).files as FileList;

  /// Set images to state for server
  setImagesForServer((prevState: FileList | []): FileList => {
    const dataTransfer = new DataTransfer();
    /// Here: we combine two filelists and return new filelist
    for (let i = 0; i < prevState.length; i++)
      dataTransfer.items.add(prevState[i]);
    for (let i = 0; i < selectedFiles.length; i++)
      dataTransfer.items.add(selectedFiles[i]);
    return dataTransfer.files;
  });

  //// Set images to state for client
  let imagesArray: ImageItemTypes[] = [];
  for (let i = 0; i < selectedFiles.length; i++) {
    imagesArray.push({
      imageUrl: URL.createObjectURL(selectedFiles[i]),
      name: selectedFiles[i].name,
    });
  }

  setImagesForClient((prevState: ImageItemTypes[]): ImageItemTypes[] => [
    ...prevState,
    ...imagesArray,
  ]);
};

export const removeImagesHandler = (
  img: ImageItemTypes,
  setImagesForServer: (value: SetStateAction<FileList | []>) => void,
  setImagesForClient: (value: SetStateAction<ImageItemTypes[] | []>) => void
) => {
  /// Remove the filelist item from imagesForClient
  setImagesForClient((prevState: ImageItemTypes[]): ImageItemTypes[] =>
    prevState.filter((e: ImageItemTypes) => e.imageUrl !== img.imageUrl)
  );

  /// Remove the filelist item from imagesForServer
  setImagesForServer((prevState: FileList | []): FileList => {
    const dataTransfer = new DataTransfer();
    for (let i = 0; i < prevState.length; i++) {
      prevState[i].name !== img.name && dataTransfer.items.add(prevState[i]);
    }
    return dataTransfer.files;
  });
};
