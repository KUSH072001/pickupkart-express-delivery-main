
import React, { useState, useRef, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { User, Upload, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProfileImageUploadProps {
  currentImage?: string;
  onImageUpload: (file: File) => void;
}

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({ currentImage, onImageUpload }) => {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(currentImage);
  const [isHovering, setIsHovering] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid file type',
        description: 'Please select an image file (JPEG, PNG, etc.)',
        variant: 'destructive',
      });
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Image size should be less than 5MB',
        variant: 'destructive',
      });
      return;
    }
    
    // Create preview URL
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    
    // Notify parent component
    onImageUpload(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    setPreviewUrl(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileChange} 
        accept="image/*"
        className="hidden"
      />
      
      <div 
        className="relative"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {previewUrl ? (
          <>
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-primary">
              <img 
                src={previewUrl} 
                alt="Profile preview" 
                className="w-full h-full object-cover"
              />
            </div>
            {isHovering && (
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white hover:text-primary hover:bg-transparent"
                  onClick={handleButtonClick}
                >
                  <Upload size={20} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white hover:text-red-500 hover:bg-transparent"
                  onClick={handleRemoveImage}
                >
                  <X size={20} />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div 
            className="w-32 h-32 rounded-full bg-muted flex items-center justify-center border-2 border-dashed border-muted-foreground cursor-pointer hover:border-primary transition-colors"
            onClick={handleButtonClick}
          >
            <User size={40} className="text-muted-foreground" />
          </div>
        )}
      </div>
      
      <Button 
        variant="outline" 
        onClick={handleButtonClick} 
        className="flex items-center"
      >
        <Upload className="mr-2 h-4 w-4" />
        {previewUrl ? 'Change Photo' : 'Upload Photo'}
      </Button>
      
      <p className="text-xs text-muted-foreground">
        JPEG or PNG, max 5MB
      </p>
    </div>
  );
};

export default ProfileImageUpload;
