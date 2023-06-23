import { PhotoIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import React from "react";

interface ImageUploadProps {
  image: File | null;
  preview: string;
  id: string;
  name: string;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onImageRemove: () => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  image,
  preview,
  id,
  name,
  onImageChange,
  onImageRemove,
}) => {
  return (
    <div className="mt-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Imagen
      </label>
      {!preview && (
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
          <div className="text-center">
            <PhotoIcon
              className="mx-auto h-12 w-12 text-gray-300"
              aria-hidden="true"
            />
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <label
                htmlFor={id}
                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span>Subir una imagen</span>
                <input
                  key={preview}
                  onChange={onImageChange}
                  id={id}
                  name={name}
                  type="file"
                  className="sr-only"
                />
              </label>
              <p className="pl-1">o arrastra y suelta</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">
              JPEG, PNG, JPG, SVG, WEBP max 6MB
            </p>
          </div>
        </div>
      )}
      {preview && (
        <div className="mt-4">
          <Image
            src={preview}
            alt="Preview"
            width={500}
            height={250}
            className="rounded-md"
          />
          <button
            onClick={onImageRemove}
            type="button"
            className="mt-2 w-full justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
          >
            Eliminar imagen
          </button>
        </div>
      )}
    </div>
  );
};
