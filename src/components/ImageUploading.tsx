/**
 * Copied from https://github.com/vutoan266/react-images-uploading and changed few things
 */
import * as React from 'react';

export interface ImageType {
    dataURL: string;
    file?: File;
    key?: string;
    onUpdate?: () => void;
    onRemove?: () => void;
}

export type ImageListType = Array<ImageType>;

export interface ImageUploadingPropsType {
    children?: (props: ExportInterface) => React.ReactNode;
    defaultValue?: ImageListType;
    onChange?: (value: ImageListType) => void;
    multiple?: boolean;
    maxNumber?: number;
    acceptType?: Array<string>;
    maxFileSize?: number;
    resolutionWidth?: number;
    resolutionHeight?: number;
    resolutionType?: ResolutionType;
    onError?: (errors: ErrorsType, files?: ImageListType) => void;
}

interface ExportInterface {
    imageList: ImageListType;
    onImageUpload: () => void;
    onImageRemoveAll: () => void;
    onInputChange: (e: any) => void;
    addFiles: (files: FileList) => void;
    errors: ErrorsType;
}

export type ErrorsType = {
    maxFileSize: boolean;
    maxNumber: boolean;
    acceptType: boolean;
    resolution: boolean;
};

export type ResolutionType = 'absolute' | 'less' | 'more' | 'ratio';

const getBase64 = (file: File): Promise<string> => {
    const reader = new FileReader();

    return new Promise((resolve) => {
        reader.addEventListener('load', () => resolve(String(reader.result)));
        reader.readAsDataURL(file);
    });
};

const checkResolution = (
    dataURL: string,
    resolutionType: ResolutionType = 'absolute',
    resolutionWidth = 0,
    resolutionHeight = 1,
): Promise<boolean> => {
    const image = new Image();

    return new Promise((resolve) => {
        image.addEventListener('load', () => {
            if (image.width && image.height) {
                switch (resolutionType) {
                    case 'absolute': {
                        if (image.width === resolutionWidth && image.height === resolutionHeight) return resolve(true);
                        return resolve(false);
                    }
                    case 'ratio': {
                        const ratio = resolutionWidth / resolutionHeight;
                        if (image.width / image.height === ratio) return resolve(true);
                        return resolve(false);
                    }
                    case 'less': {
                        if (image.width <= resolutionWidth && image.height <= resolutionHeight) return resolve(true);
                        return resolve(false);
                    }
                    case 'more': {
                        if (image.width >= resolutionWidth && image.height >= resolutionHeight) return resolve(true);
                        return resolve(false);
                    }
                }
            }
            resolve(true);
        });
        image.src = dataURL;
    });
};

const { useRef, useState, useCallback } = React;

const defaultErrors: ErrorsType = {
    maxFileSize: false,
    maxNumber: false,
    acceptType: false,
    resolution: false,
};

const ImageUploading: React.FC<ImageUploadingPropsType> = ({
    multiple,
    onChange,
    maxNumber,
    children,
    defaultValue,
    acceptType,
    maxFileSize,
    resolutionWidth,
    resolutionHeight,
    resolutionType,
    onError,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [imageList, setImageList] = useState(() => {
        let initImageList: Array<ImageType> = [];
        if (defaultValue) {
            initImageList = defaultValue.map((item: ImageType) => ({
                ...item,
                key: item.dataURL,
                onUpdate: (): void => onImageUpdate(item.dataURL),
                onRemove: (): void => onImageRemove(item.dataURL),
            }));
        }
        return initImageList;
    });

    const [keyUpdate, setKeyUpdate] = useState<string>('');
    const [errors, setErrors] = useState<ErrorsType>({ ...defaultErrors });

    const onStandardizeDataChange = (list: ImageListType): void => {
        if (onChange) {
            const sData: ImageListType = list.map(({ key, onUpdate, onRemove, ...restOfItem }) => ({
                ...restOfItem,
            }));
            onChange(sData);
        }
    };

    const handleClickInput = useCallback((): void => {
        inputRef.current && inputRef.current.click();
    }, [inputRef]);

    const onImageUpload = useCallback((): void => {
        setKeyUpdate((prevKey) => {
            if (prevKey) {
                return '';
            }
            return prevKey;
        });
        handleClickInput();
    }, [handleClickInput]);

    const onImageRemoveAll = useCallback((): void => {
        setImageList([]);
        onStandardizeDataChange([]);
    }, []);

    const onImageRemove = (key: string): void => {
        setImageList((previousList) => {
            const updatedList = previousList.filter((item: ImageType) => item.key !== key);
            onStandardizeDataChange(updatedList);
            return updatedList;
        });
    };

    const onImageUpdate = (key: string): void => {
        setKeyUpdate(key);
        handleClickInput();
    };

    const getListFile = (files: FileList): Promise<ImageListType> => {
        const promiseFiles: Array<Promise<string>> = [];

        for (let i = 0; i < files.length; i++) {
            promiseFiles.push(getBase64(files[i]));
        }

        return Promise.all(promiseFiles).then((fileListBase64: Array<string>) => {
            const fileList: ImageListType = fileListBase64.map((base64, index) => {
                const key = `${new Date().getTime().toString()}-${files[index].name}`;
                return {
                    dataURL: base64,
                    file: files[index],
                    key,
                    onUpdate: (): void => onImageUpdate(key),
                    onRemove: (): void => onImageRemove(key),
                };
            });
            return fileList;
        });
    };

    const validate = async (fileList: ImageListType): Promise<boolean> => {
        const newErrors = { ...defaultErrors };

        if (maxNumber && !keyUpdate && fileList.length + imageList.length > maxNumber) {
            newErrors.maxNumber = true;
        } else {
            for (let i = 0; i < fileList.length; i++) {
                const { file, dataURL } = fileList[i];

                if (file) {
                    const fileType: string = file.type;
                    if (!fileType.includes('image')) {
                        newErrors.acceptType = true;
                        break;
                    }
                    if (maxFileSize) {
                        if (file.size > maxFileSize) {
                            newErrors.maxFileSize = true;
                            break;
                        }
                    }
                    if (acceptType && acceptType.length > 0) {
                        const type: string = file.name.split('.').pop() || '';
                        if (acceptType.indexOf(type) < 0) {
                            newErrors.acceptType = true;
                            break;
                        }
                    }
                }
                if (dataURL && resolutionType) {
                    const checkRes = await checkResolution(dataURL, resolutionType, resolutionWidth, resolutionHeight);
                    if (!checkRes) {
                        newErrors.resolution = true;
                        break;
                    }
                }
            }
        }
        setErrors(newErrors);
        if (Object.values(newErrors).find(Boolean)) {
            onError && onError(newErrors, fileList);
            return false;
        }
        return true;
    };

    const onInputChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        const { files } = e.target;
        addFiles(files);
    };

    const addFiles = async (files: FileList) => {
        if (files) {
            const fileList = await getListFile(files);
            if (fileList.length > 0) {
                const checkValidate = await validate(fileList);
                if (checkValidate) {
                    let updatedFileList: ImageListType;
                    if (keyUpdate) {
                        updatedFileList = imageList.map((item: ImageType) => {
                            if (item.key === keyUpdate) return { ...fileList[0] };
                            return item;
                        });
                    } else {
                        if (multiple) {
                            updatedFileList = [...imageList, ...fileList];
                            if (maxNumber && updatedFileList.length > maxNumber) {
                                updatedFileList = imageList;
                            }
                        } else {
                            updatedFileList = [fileList[0]];
                        }
                    }
                    setImageList(updatedFileList);
                    onStandardizeDataChange(updatedFileList);
                }
            }
        }
        keyUpdate && setKeyUpdate('');
        if (inputRef.current) inputRef.current.value = '';
    };

    const acceptString =
        acceptType && acceptType.length > 0 ? acceptType.map((item) => `.${item}`).join(', ') : 'image/*';

    return (
        <>
            <input
                type="file"
                accept={acceptString}
                ref={inputRef}
                multiple={multiple && !keyUpdate}
                onChange={onInputChange}
                style={{ display: 'none' }}
            />
            {children &&
                children({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onInputChange,
                    addFiles,
                    errors,
                })}
        </>
    );
};

ImageUploading.defaultProps = {
    maxNumber: 1000,
    multiple: false,
    acceptType: [],
};

export default ImageUploading;
