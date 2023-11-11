"use client";
import { CldUploadWidget } from 'next-cloudinary';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { TrashIcon, ImageIcon } from '@radix-ui/react-icons';

type image = {
    url: string;
    id: string
}

interface ImageUploadProps {
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    values?: image[] | undefined;
    value?: string | undefined
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    disabled,
    onChange,
    onRemove,
    values,
    value
}) => {
const onUpload = (result: any) => {
    onChange(result.info.secure_url);
};

return ( 
    <div>
        <div className="mb-4 flex items-center gap-4">
            {values!.length > 0 ? (
                <div className='flex flex-wrap items-center gap-3'>
                    {values!.map((url) => (
                        <div key={url.id} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                            <div className="z-10 absolute top-2 right-2">
                                <Button type="button" onClick={() => onRemove(url.id)} variant="destructive" size="sm">
                                    <TrashIcon className="h-4 w-4" />
                                </Button>
                            </div>
                            <Image
                                fill
                                className="object-cover"
                                alt="Image"
                                src={url.url}
                            />
                        </div>
                    ))}
                    <div>
                        <CldUploadWidget onUpload={onUpload} uploadPreset="ds7qvybc">
                            {({ open }) => {
                                const onClick = () => {
                                    open();
                                };

                                return (
                                    <Button 
                                    type="button" 
                                    aria-disabled={disabled} 
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
                </div>
            ) : (
                <div>
                    <CldUploadWidget onUpload={onUpload} uploadPreset="ds7qvybc">
                            {({ open }) => {
                            const onClick = () => {
                                open();
                            };

                            return (
                                <Button 
                                className='lg:w-[500px] lg:h-[300px]'
                                type="button" 
                                aria-disabled={disabled} 
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
            )}
        </div>
    </div>
);
}

export default ImageUpload;
