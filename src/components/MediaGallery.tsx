import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Image, 
  Video, 
  Music, 
  Play, 
  Pause,
  Volume2,
  VolumeX,
  Download,
  Share2,
  Heart,
  Eye,
  ChevronLeft,
  ChevronRight,
  Maximize,
  X
} from "lucide-react";
import { toast } from "sonner";

interface MediaItem {
  id: string;
  type: "image" | "video" | "audio";
  url: string;
  thumbnail?: string;
  title: string;
  description: string;
  creator: string;
  location: string;
  tags: string[];
  likes: number;
  views: number;
  duration?: string;
  size: string;
  uploadDate: Date;
}

const MediaGallery = () => {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState<"all" | "image" | "video" | "audio">("all");

  const mediaItems: MediaItem[] = [
    {
      id: "1",
      type: "image",
      url: "/api/placeholder/800/600",
      title: "Traditional Kiganda Wedding Ceremony",
      description: "Beautiful moments from a traditional wedding in Buganda, showcasing our rich cultural heritage and customs.",
      creator: "Sarah Nakamya",
      location: "Entebbe, Uganda",
      tags: ["#Buganda", "#Wedding", "#Culture", "#Tradition"],
      likes: 234,
      views: 1567,
      size: "2.3 MB",
      uploadDate: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: "2",
      type: "video",
      url: "/api/placeholder/800/600",
      thumbnail: "/api/placeholder/400/300",
      title: "Matooke Farming Techniques",
      description: "Learn sustainable farming methods from experienced farmers in Masaka. Traditional knowledge meets modern techniques.",
      creator: "James Mukasa",
      location: "Masaka, Uganda",
      tags: ["#Agriculture", "#Matooke", "#Farming", "#Sustainability"],
      likes: 456,
      views: 3421,
      duration: "5:23",
      size: "45.2 MB",
      uploadDate: new Date(Date.now() - 4 * 60 * 60 * 1000)
    },
    {
      id: "3",
      type: "audio",
      url: "/api/placeholder/audio",
      title: "Traditional Luganda Folk Songs",
      description: "Collection of traditional folk songs passed down through generations, recorded by village elders.",
      creator: "Elder Nakato",
      location: "Kampala, Uganda",
      tags: ["#Music", "#Luganda", "#Folk", "#Heritage"],
      likes: 189,
      views: 892,
      duration: "12:45",
      size: "8.7 MB",
      uploadDate: new Date(Date.now() - 6 * 60 * 60 * 1000)
    },
    {
      id: "4",
      type: "image",
      url: "/api/placeholder/800/600",
      title: "Lake Victoria Sunset",
      description: "Breathtaking sunset over Lake Victoria captured from Entebbe. Nature's beauty in Uganda.",
      creator: "Grace Achieng",
      location: "Entebbe, Uganda",
      tags: ["#Nature", "#LakeVictoria", "#Sunset", "#Photography"],
      likes: 567,
      views: 2341,
      size: "3.1 MB",
      uploadDate: new Date(Date.now() - 8 * 60 * 60 * 1000)
    },
    {
      id: "5",
      type: "video",
      url: "/api/placeholder/800/600",
      thumbnail: "/api/placeholder/400/300",
      title: "Coding Bootcamp Graduation",
      description: "Celebrating 50 new developers graduating from our Luganda-taught coding bootcamp. The future of tech in Uganda!",
      creator: "David Ssemakula",
      location: "Kampala, Uganda",
      tags: ["#Tech", "#Education", "#Graduation", "#Innovation"],
      likes: 789,
      views: 4567,
      duration: "3:17",
      size: "28.9 MB",
      uploadDate: new Date(Date.now() - 12 * 60 * 60 * 1000)
    },
    {
      id: "6",
      type: "audio",
      url: "/api/placeholder/audio",
      title: "Ubuntu Philosophy Podcast",
      description: "Deep dive into Ubuntu philosophy and its relevance in modern African society. Featuring community leaders.",
      creator: "Ubuntu Voices",
      location: "Kampala, Uganda",
      tags: ["#Podcast", "#Ubuntu", "#Philosophy", "#Community"],
      likes: 345,
      views: 1234,
      duration: "25:30",
      size: "15.2 MB",
      uploadDate: new Date(Date.now() - 24 * 60 * 60 * 1000)
    }
  ];

  const filteredMedia = filter === "all" ? mediaItems : mediaItems.filter(item => item.type === filter);

  const openMediaViewer = (media: MediaItem, index: number) => {
    setSelectedMedia(media);
    setCurrentIndex(index);
  };

  const closeMediaViewer = () => {
    setSelectedMedia(null);
    setIsPlaying(false);
  };

  const navigateMedia = (direction: "prev" | "next") => {
    const currentFilteredIndex = filteredMedia.findIndex(item => item.id === selectedMedia?.id);
    let newIndex;
    
    if (direction === "prev") {
      newIndex = currentFilteredIndex > 0 ? currentFilteredIndex - 1 : filteredMedia.length - 1;
    } else {
      newIndex = currentFilteredIndex < filteredMedia.length - 1 ? currentFilteredIndex + 1 : 0;
    }
    
    setSelectedMedia(filteredMedia[newIndex]);
    setCurrentIndex(newIndex);
    setIsPlaying(false);
  };

  const handleLike = (mediaId: string) => {
    toast.success("Media liked! ❤️", {
      description: "Supporting our community creators"
    });
  };

  const handleShare = (media: MediaItem) => {
    const text = `Check out "${media.title}" by ${media.creator} on Ubuntu Social! 🎬\n\n${media.tags.join(' ')}`;
    
    if (navigator.share) {
      navigator.share({
        title: media.title,
        text: text,
      });
    } else {
      navigator.clipboard.writeText(text);
      toast.success("Media link copied!");
    }
  };

  const getMediaIcon = (type: string) => {
    switch (type) {
      case "image": return <Image className="h-4 w-4" />;
      case "video": return <Video className="h-4 w-4" />;
      case "audio": return <Music className="h-4 w-4" />;
      default: return <Image className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "image": return "bg-blue-100 text-blue-700";
      case "video": return "bg-red-100 text-red-700";
      case "audio": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Community Media</h2>
          <p className="text-muted-foreground">Photos, videos, and audio from our Ubuntu community</p>
        </div>
        <Badge variant="outline">{filteredMedia.length} items</Badge>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2">
        {[
          { id: "all", label: "All Media", icon: Eye },
          { id: "image", label: "Photos", icon: Image },
          { id: "video", label: "Videos", icon: Video },
          { id: "audio", label: "Audio", icon: Music }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <Button
              key={tab.id}
              variant={filter === tab.id ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(tab.id as any)}
              className="flex items-center space-x-2"
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </Button>
          );
        })}
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMedia.map((media, index) => (
          <Card 
            key={media.id} 
            className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => openMediaViewer(media, index)}
          >
            <div className="relative aspect-video bg-gray-100">
              {media.type === "image" && (
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <Image className="h-16 w-16 text-blue-500" />
                </div>
              )}
              
              {media.type === "video" && (
                <div className="w-full h-full bg-gradient-to-br from-red-100 to-pink-100 flex items-center justify-center relative">
                  <Video className="h-16 w-16 text-red-500" />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-black/70 text-white text-xs">
                      {media.duration}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
                      <Play className="h-6 w-6 text-white ml-1" />
                    </div>
                  </div>
                </div>
              )}
              
              {media.type === "audio" && (
                <div className="w-full h-full bg-gradient-to-br from-green-100 to-teal-100 flex items-center justify-center">
                  <Music className="h-16 w-16 text-green-500" />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-black/70 text-white text-xs">
                      {media.duration}
                    </Badge>
                  </div>
                </div>
              )}
              
              <div className="absolute top-2 left-2">
                <Badge className={getTypeColor(media.type)}>
                  {getMediaIcon(media.type)}
                  <span className="ml-1 capitalize">{media.type}</span>
                </Badge>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                {media.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {media.description}
              </p>
              
              <div className="flex items-center justify-between text-sm">
                <div>
                  <div className="font-medium text-foreground">{media.creator}</div>
                  <div className="text-muted-foreground">{media.location}</div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-3 text-muted-foreground">
                    <span className="flex items-center space-x-1">
                      <Heart className="h-3 w-3" />
                      <span>{media.likes}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>{media.views}</span>
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1 mt-3">
                {media.tags.slice(0, 3).map((tag, tagIndex) => (
                  <Badge key={tagIndex} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Media Viewer Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full max-h-full">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={closeMediaViewer}
              className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>

            {/* Navigation */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMedia("prev")}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:bg-white/20"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMedia("next")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:bg-white/20"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            {/* Media Content */}
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="aspect-video bg-gray-100 flex items-center justify-center">
                {selectedMedia.type === "image" && (
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <Image className="h-24 w-24 text-blue-500" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-blue-600">
                        <div className="text-lg font-semibold">High-Quality Image</div>
                        <div className="text-sm">Click to view full resolution</div>
                      </div>
                    </div>
                  </div>
                )}
                
                {selectedMedia.type === "video" && (
                  <div className="w-full h-full bg-gradient-to-br from-red-100 to-pink-100 flex items-center justify-center relative">
                    <Video className="h-24 w-24 text-red-500" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button
                        variant="ghost"
                        size="lg"
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-16 h-16 bg-black/50 rounded-full text-white hover:bg-black/70"
                      >
                        {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
                      </Button>
                    </div>
                    <div className="absolute bottom-4 right-4 flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsMuted(!isMuted)}
                        className="bg-black/50 text-white hover:bg-black/70"
                      >
                        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                )}
                
                {selectedMedia.type === "audio" && (
                  <div className="w-full h-full bg-gradient-to-br from-green-100 to-teal-100 flex items-center justify-center">
                    <div className="text-center">
                      <Music className="h-24 w-24 text-green-500 mx-auto mb-4" />
                      <Button
                        variant="ghost"
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="bg-green-500 text-white hover:bg-green-600 mb-4"
                      >
                        {isPlaying ? <Pause className="h-5 w-5 mr-2" /> : <Play className="h-5 w-5 mr-2" />}
                        {isPlaying ? "Pause" : "Play"}
                      </Button>
                      <div className="text-sm text-green-600">
                        Duration: {selectedMedia.duration}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Media Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {selectedMedia.title}
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      {selectedMedia.description}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>By {selectedMedia.creator}</span>
                      <span>•</span>
                      <span>{selectedMedia.location}</span>
                      <span>•</span>
                      <span>{selectedMedia.size}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(selectedMedia.id)}
                      className="text-muted-foreground hover:text-red-500"
                    >
                      <Heart className="h-4 w-4 mr-1" />
                      {selectedMedia.likes}
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleShare(selectedMedia)}
                      className="text-muted-foreground hover:text-primary"
                    >
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-green-500"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {selectedMedia.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaGallery;