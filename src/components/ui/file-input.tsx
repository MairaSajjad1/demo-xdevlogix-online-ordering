import { FC, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { AiOutlineCloudUpload as UploadIcon } from "react-icons/ai";
import { RxCross2 as Cross } from "react-icons/rx";
import { Button } from "./button";

interface FileInputProps {
  images?: string[];
  fileAllowed: number;
  onChange: (arg: File[] | string[]) => void;
}

const ImageList: FC<{
  images: string[];
  removeFile: (arg: string) => void;
}> = ({ images, removeFile }) => (
  <ul className="flex items-center gap-4">
    {images.map((image) => (
      <li
        className="max-w-[194px] group  w-full rounded-md overflow-hidden h-32 relative"
        key={image}
      >
        <Button
          className="absolute group-hover:opacity-100 opacity-0 duration-300 -top-2 -right-2 rounded-full z-30 "
          onClick={() => {
            removeFile(image);
          }}
          size={"icon"}
          variant={"destructive"}
        >
          <Cross className="h-5 w-5" />
        </Button>
        <Image
          // @ts-ignore
          src={image}
          alt={image}
          layout="fill"
          className="h-full w-full rounded-md object-contain"
        />
      </li>
    ))}
  </ul>
);

const FileList: FC<{ files: File[]; removeFile: (name: string) => void }> = ({
  files,
  removeFile,
}) => (
  <ul className="flex items-center gap-4">
    {files.map((file) => (
      <li
        className="max-w-[194px] group  w-full rounded-md overflow-hidden h-32 relative"
        key={file.name}
      >
        <Button
          className="absolute group-hover:opacity-100 opacity-0 duration-300 -top-2 -right-2 rounded-full z-30 "
          onClick={() => removeFile(file.name)}
          size={"icon"}
          variant={"destructive"}
        >
          <Cross className="h-5 w-5" />
        </Button>
        <Image
          // @ts-ignore
          src={file?.preview}
          alt={file?.name}
          onLoad={() => {
            // @ts-ignore
            URL.revokeObjectURL(file?.preview);
          }}
          layout="fill"
          className="h-full w-full rounded-md object-contain"
        />
      </li>
    ))}
  </ul>
);

const FileInput: FC<FileInputProps> = ({ images, fileAllowed, onChange }) => {
  const [files, setFiles] = useState<File[] | string[]>(images || []);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }
  }, []);

  const removeFile = (name: string) => {
    if (
      Array.isArray(files) &&
      files?.every((file) => typeof file === "string")
    ) {
      setFiles((files) =>
        (files as string[]).filter((fileName) => name !== fileName)
      );
    } else {
      setFiles((files) =>
        (files as File[]).filter((file) => file.name !== name)
      );
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxSize: 2024 * 1100,
    maxFiles: fileAllowed,
    onDrop,
  });

  useEffect(() => {
    onChange(files);
  }, [files]);

  const isImagesOnly =
    images && images.every((item) => typeof item === "string");

  return (
    <div className="rounded-lg  h-full border border-neutral-200 p-8 col-span-3">
      {isImagesOnly ? (
        <ImageList images={images || []} removeFile={removeFile} />
      ) : (
        <FileList files={files as File[]} removeFile={removeFile} />
      )}

      {(!images || images.length === 0) && (
        <div
          {...getRootProps({
            className: "cursor-pointer",
          })}
        >
          <input {...getInputProps({ name: "file" })} />
          <div className="flex flex-col items-center justify-center gap-2">
            <UploadIcon className="h-10 w-10 text-[#4540E1] fill-current" />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag & drop files here, or click to select files</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileInput;
