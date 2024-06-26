"use client";
import { CldUploadWidget } from 'next-cloudinary';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { TrashIcon, ImageIcon } from '@radix-ui/react-icons';

type image = {
    url: string;
}

interface ImageUploadProps {
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: number | string) => void;
    values: string[];
    value?: string
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    disabled,
    onChange,
    onRemove,
    values,
}) => {
const onUpload = (result: any) => {
    onChange(result.info.secure_url);
};

return ( 
    <div>
      <div className="mb-4 flex items-center gap-4">
        {values.map((url: string) => (
          <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
            <div className="z-10 absolute top-2 right-2">
              <Button type="button" onClick={() => onRemove(url)} variant="destructive" size="sm">
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
            <Image
              fill
              className="object-cover"
              alt="Image"
              src={url}
            />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="ds7qvybc">
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button 
              type="button" 
              disabled={disabled} 
              variant="secondary" 
              onClick={onClick}
            >
              <ImageIcon className="h-4 w-4 mr-2" />
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
);
}

export default ImageUpload;
