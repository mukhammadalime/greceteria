import { ChangeEvent, SetStateAction } from "react";
import { ImageItemTypes, ProductItemTypes } from "./user-types";

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

export const createFormDataHandler = (
  productRefs: {
    nameRef: React.RefObject<HTMLInputElement>;
    brandNameRef: React.RefObject<HTMLInputElement>;
    weightRef: React.RefObject<HTMLInputElement>;
    priceRef: React.RefObject<HTMLInputElement>;
    storeRef: React.RefObject<HTMLInputElement>;
    descriptionRef: React.RefObject<HTMLInputElement>;
    featuresRef: React.RefObject<HTMLInputElement>;
    discountPercentRef: React.RefObject<HTMLInputElement>;
  },
  weightType: string,
  product: ProductItemTypes | undefined,
  selectedCategory: string,
  inStock: string
) => {
  const name = productRefs.nameRef.current?.value;
  const brandName = productRefs.brandNameRef.current?.value;
  const weight = productRefs.weightRef.current?.value;
  const price = productRefs.priceRef.current?.value;
  const store = productRefs.storeRef.current?.value;
  const description = productRefs.descriptionRef.current?.value;
  const features = productRefs.featuresRef.current?.value;
  const discountPercent = productRefs.discountPercentRef.current?.value;

  const formData = new FormData();
  formData.append("name", name as string);
  formData.append("brandName", brandName as string);
  formData.append("weight", `${weight}${weightType}` as string);
  formData.append("price", price as string);
  formData.append("store", store as string);
  formData.append("description", description as string);
  formData.append("features", features as string);
  formData.append("discountPercent", discountPercent as string);
  formData.append("inStock", inStock ? inStock : "");
  // This will be needed in the backend when changing the category of the product
  if (product?.category && product?.category._id !== selectedCategory)
    formData.append("category", `New ${selectedCategory}` as string);
  else formData.append("category", selectedCategory as string);

  return formData;
};
