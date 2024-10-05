import { manageFormError } from "@/lib/utils";
import { useState, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";

const ImageInput = ({ name }: { name: string }) => {
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const errorMessage = manageFormError(errors, name);
  // Handle drag over event
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  // Handle drag leave event
  const handleDragLeave = () => {
    setDragging(false);
  };

  // Handle file drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, onChange: any) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      onChange(file); // Update react-hook-form
      setFileName(file.name); // Set file name for display
    }
  };

  // Handle manual input click
  const handleContainerClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger file input click
    }
  };

  // Handle file input change (fallback for manual file selection)
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: any
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file); // Update react-hook-form
      setFileName(file.name); // Set file name for display
    }
  };

  return (
    <div className='w-full mb-5'>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange } }) => (
          <div>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, onChange)}
              onClick={handleContainerClick} // Click to open file dialog
              className={`flex flex-col items-center justify-center py-9 w-full border ${
                dragging ? "border-primary" : "dark:border-neutral"
              } rounded cursor-pointer bg-mainBg`}
            >
              <div className='mb-3 flex items-center justify-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='40'
                  height='40'
                  viewBox='0 0 40 40'
                  fill='none'
                >
                  <g id='Upload 02'>
                    <path
                      id='icon'
                      d='M16.296 25.3935L19.9997 21.6667L23.7034 25.3935M19.9997 35V21.759M10.7404 27.3611H9.855C6.253 27.3611 3.33301 24.4411 3.33301 20.8391C3.33301 17.2371 6.253 14.3171 9.855 14.3171V14.3171C10.344 14.3171 10.736 13.9195 10.7816 13.4326C11.2243 8.70174 15.1824 5 19.9997 5C25.1134 5 29.2589 9.1714 29.2589 14.3171H30.1444C33.7463 14.3171 36.6663 17.2371 36.6663 20.8391C36.6663 24.4411 33.7463 27.3611 30.1444 27.3611H29.2589'
                      stroke='var(--primary)'
                      strokeWidth='1.6'
                      strokeLinecap='round'
                    />
                  </g>
                </svg>
              </div>
              <h2 className='text-center text-neutral text-xs mb-1'>
                {fileName ? "Image uploaded" : "Upload PNG or JPG format image"}
              </h2>
              <h4 className='text-center text-secondary text-sm'>
                {fileName
                  ? fileName
                  : "Drag and Drop your file here or click to browse"}
              </h4>
              <input
                ref={fileInputRef}
                type='file'
                accept='image/png, image/jpeg, application/pdf'
                className='hidden'
                onChange={(e) => handleInputChange(e, onChange)} // Handle file input change
              />
            </div>
            {errorMessage && (
              <small className='text-red-400'>{errorMessage}</small>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default ImageInput;
