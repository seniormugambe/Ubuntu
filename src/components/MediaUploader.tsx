import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  Image, 
  Video, 
  Music, 
  File,
  X,
  Check,
  AlertCircle,
  Camera,
  Mic,
  FileText
} from "lucide-react";
import { toast } from "sonner";

interface UploadFile {
  id: string;
  file: File;
  type: "image" | "video" | "audio" | "document";
  preview?: string;
  progress: number;
  status: "pending" | "uploading" | "completed" | "error";
  error?: string;
}

const MediaUploader = ({ onUploadComplete }: { onUploadComplete?: (files: UploadFile[]) => void }) => {
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptedTypes = {
    image: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
    video: ['.mp4', '.mov', '.avi', '.mkv', '.webm'],
    audio: ['.mp3', '.wav', '.ogg', '.m4a', '.aac'],
    document: ['.pdf', '.doc', '.docx', '.txt']
  };

  const maxFileSizes = {
    image: 10 * 1024 * 1024, // 10MB
    video: 100 * 1024 * 1024, // 100MB
    audio: 50 * 1024 * 1024, // 50MB
    document: 25 * 1024 * 1024 // 25MB
  };

  const getFileType = (file: File): "image" | "video" | "audio" | "document" => {
    const extension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (acceptedTypes.image.includes(extension)) return "image";
    if (acceptedTypes.video.includes(extension)) return "video";
    if (acceptedTypes.audio.includes(extension)) return "audio";
    if (acceptedTypes.document.includes(extension)) return "document";
    
    return "document";
  };

  const validateFile = (file: File): string | null => {
    const type = getFileType(file);
    const maxSize = maxFileSizes[type];
    
    if (file.size > maxSize) {
      return `File too large. Maximum size for ${type} files is ${Math.round(maxSize / (1024 * 1024))}MB`;
    }
    
    return null;
  };

  const createFilePreview = (file: File, type: string): Promise<string | undefined> => {
    return new Promise((resolve) => {
      if (type === "image") {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      } else {
        resolve(undefined);
      }
    });
  };

  const handleFileSelect = async (files: FileList) => {
    const newFiles: UploadFile[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const type = getFileType(file);
      const error = validateFile(file);
      const preview = await createFilePreview(file, type);
      
      const uploadFile: UploadFile = {
        id: Math.random().toString(36).substr(2, 9),
        file,
        type,
        preview,
        progress: 0,
        status: error ? "error" : "pending",
        error
      };
      
      newFiles.push(uploadFile);
    }
    
    setUploadFiles(prev => [...prev, ...newFiles]);
    
    // Start uploading valid files
    newFiles.filter(f => f.status === "pending").forEach(uploadFile => {
      simulateUpload(uploadFile.id);
    });
  };

  const simulateUpload = (fileId: string) => {
    setUploadFiles(prev => 
      prev.map(f => f.id === fileId ? { ...f, status: "uploading" as const } : f)
    );

    const interval = setInterval(() => {
      setUploadFiles(prev => {
        const file = prev.find(f => f.id === fileId);
        if (!file || file.status !== "uploading") {
          clearInterval(interval);
          return prev;
        }

        const newProgress = Math.min(file.progress + Math.random() * 15, 100);
        
        if (newProgress >= 100) {
          clearInterval(interval);
          toast.success("File uploaded successfully! 🎉", {
            description: `${file.file.name} is now available in your media library`
          });
          
          return prev.map(f => 
            f.id === fileId 
              ? { ...f, progress: 100, status: "completed" as const }
              : f
          );
        }
        
        return prev.map(f => 
          f.id === fileId 
            ? { ...f, progress: newProgress }
            : f
        );
      });
    }, 200);
  };

  const removeFile = (fileId: string) => {
    setUploadFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image": return <Image className="h-5 w-5" />;
      case "video": return <Video className="h-5 w-5" />;
      case "audio": return <Music className="h-5 w-5" />;
      case "document": return <FileText className="h-5 w-5" />;
      default: return <File className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "image": return "bg-blue-100 text-blue-700";
      case "video": return "bg-red-100 text-red-700";
      case "audio": return "bg-green-100 text-green-700";
      case "document": return "bg-purple-100 text-purple-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <Check className="h-4 w-4 text-green-600" />;
      case "error": return <AlertCircle className="h-4 w-4 text-red-600" />;
      default: return null;
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card 
        className={`p-8 border-2 border-dashed transition-colors ${
          isDragOver 
            ? 'border-primary bg-primary/5' 
            : 'border-muted-foreground/25 hover:border-primary/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Upload Media Files
            </h3>
            <p className="text-muted-foreground mb-4">
              Drag and drop your files here, or click to browse
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-4">
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              <Image className="h-3 w-3 mr-1" />
              Images (10MB max)
            </Badge>
            <Badge variant="outline" className="bg-red-50 text-red-700">
              <Video className="h-3 w-3 mr-1" />
              Videos (100MB max)
            </Badge>
            <Badge variant="outline" className="bg-green-50 text-green-700">
              <Music className="h-3 w-3 mr-1" />
              Audio (50MB max)
            </Badge>
            <Badge variant="outline" className="bg-purple-50 text-purple-700">
              <FileText className="h-3 w-3 mr-1" />
              Documents (25MB max)
            </Badge>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={openFileDialog} className="flex items-center space-x-2">
              <Upload className="h-4 w-4" />
              <span>Choose Files</span>
            </Button>
            
            <Button variant="outline" className="flex items-center space-x-2">
              <Camera className="h-4 w-4" />
              <span>Take Photo</span>
            </Button>
            
            <Button variant="outline" className="flex items-center space-x-2">
              <Mic className="h-4 w-4" />
              <span>Record Audio</span>
            </Button>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={Object.values(acceptedTypes).flat().join(',')}
          onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
          className="hidden"
        />
      </Card>

      {/* Upload Queue */}
      {uploadFiles.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Upload Queue</h3>
            <Badge variant="outline">
              {uploadFiles.filter(f => f.status === "completed").length} / {uploadFiles.length} completed
            </Badge>
          </div>

          <div className="space-y-4">
            {uploadFiles.map((uploadFile) => (
              <div key={uploadFile.id} className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
                {/* File Preview/Icon */}
                <div className="flex-shrink-0">
                  {uploadFile.preview ? (
                    <div className="w-12 h-12 rounded-lg overflow-hidden">
                      <img 
                        src={uploadFile.preview} 
                        alt={uploadFile.file.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getTypeColor(uploadFile.type)}`}>
                      {getFileIcon(uploadFile.type)}
                    </div>
                  )}
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="font-medium text-foreground truncate">
                      {uploadFile.file.name}
                    </p>
                    <Badge className={getTypeColor(uploadFile.type)}>
                      {uploadFile.type}
                    </Badge>
                    {getStatusIcon(uploadFile.status)}
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>{formatFileSize(uploadFile.file.size)}</span>
                    {uploadFile.status === "uploading" && (
                      <span>{Math.round(uploadFile.progress)}%</span>
                    )}
                    {uploadFile.error && (
                      <span className="text-red-600">{uploadFile.error}</span>
                    )}
                  </div>

                  {/* Progress Bar */}
                  {uploadFile.status === "uploading" && (
                    <Progress value={uploadFile.progress} className="mt-2" />
                  )}
                </div>

                {/* Actions */}
                <div className="flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(uploadFile.id)}
                    className="text-muted-foreground hover:text-red-600"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Upload Summary */}
          <div className="mt-6 pt-4 border-t border-muted/20">
            <div className="flex items-center justify-between text-sm">
              <div className="text-muted-foreground">
                Total size: {formatFileSize(uploadFiles.reduce((sum, f) => sum + f.file.size, 0))}
              </div>
              <div className="flex space-x-4">
                <span className="text-green-600">
                  {uploadFiles.filter(f => f.status === "completed").length} completed
                </span>
                <span className="text-blue-600">
                  {uploadFiles.filter(f => f.status === "uploading").length} uploading
                </span>
                <span className="text-red-600">
                  {uploadFiles.filter(f => f.status === "error").length} failed
                </span>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Upload Tips */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
        <h3 className="font-semibold text-foreground mb-3">Upload Tips</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Use high-quality images for better engagement</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Add descriptive titles and tags</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Include location for local discovery</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span>Respect copyright and community guidelines</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span>Compress large files to reduce upload time</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
              <span>Use local languages in descriptions</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MediaUploader;