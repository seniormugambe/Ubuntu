import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Eye,
  ThumbsUp,
  MessageSquare,
  Zap
} from "lucide-react";

interface ModerationResult {
  id: string;
  content: string;
  author: string;
  status: "approved" | "flagged" | "rejected";
  confidence: number;
  reasons: string[];
  aiSuggestion: string;
}

const AIContentModerator = () => {
  const [moderationQueue, setModerationQueue] = useState<ModerationResult[]>([]);
  const [stats, setStats] = useState({
    processed: 1247,
    approved: 1189,
    flagged: 42,
    rejected: 16
  });

  useEffect(() => {
    // Simulate AI moderation results
    const mockResults: ModerationResult[] = [
      {
        id: "1",
        content: "Excited to share our new community garden project! Everyone is welcome to join and help grow fresh vegetables for our neighborhood. Ubuntu spirit in action! 🌱",
        author: "Maria Nakato",
        status: "approved",
        confidence: 98,
        reasons: ["Positive community content", "No harmful language", "Promotes collaboration"],
        aiSuggestion: "Excellent community-building content. Approved automatically."
      },
      {
        id: "2", 
        content: "This platform is getting too crowded with all these new people. We should limit who can join our community discussions.",
        author: "Anonymous User",
        status: "flagged",
        confidence: 75,
        reasons: ["Potentially exclusionary language", "Against Ubuntu philosophy"],
        aiSuggestion: "Content may conflict with inclusive community values. Suggest review."
      },
      {
        id: "3",
        content: "Check out this amazing traditional dance performance from our cultural festival! The youth are keeping our heritage alive. 💃🏿",
        author: "Samuel Ochieng",
        status: "approved",
        confidence: 95,
        reasons: ["Cultural celebration", "Positive engagement", "Educational value"],
        aiSuggestion: "Great cultural content that aligns with platform values."
      }
    ];

    setModerationQueue(mockResults);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "flagged":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Eye className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "flagged":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card className="p-4 bg-gradient-to-br from-green-50/50 to-blue-50/50 border-green-200/50">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-green-600" />
          <h3 className="font-semibold text-foreground">AI Content Moderation</h3>
          <Badge variant="outline" className="text-xs bg-green-100 text-green-700">
            Live
          </Badge>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="bg-white rounded-lg p-3 border border-green-100">
            <div className="text-lg font-bold text-green-600">{stats.processed}</div>
            <div className="text-xs text-muted-foreground">Posts Processed</div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-green-100">
            <div className="text-lg font-bold text-blue-600">
              {((stats.approved / stats.processed) * 100).toFixed(1)}%
            </div>
            <div className="text-xs text-muted-foreground">Approval Rate</div>
          </div>
        </div>

        {/* Recent Moderation Results */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Recent AI Decisions</h4>
          
          {moderationQueue.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg p-3 border border-gray-100 space-y-2"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(item.status)}
                  <Badge className={`text-xs ${getStatusColor(item.status)}`}>
                    {item.status.toUpperCase()}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {item.confidence}% confidence
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">{item.author}</span>
              </div>

              <p className="text-sm text-foreground line-clamp-2">
                {item.content}
              </p>

              <div className="bg-gray-50 rounded p-2">
                <div className="text-xs font-medium text-gray-700 mb-1">AI Analysis:</div>
                <div className="text-xs text-gray-600">{item.aiSuggestion}</div>
              </div>

              <div className="flex flex-wrap gap-1">
                {item.reasons.map((reason, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-xs bg-blue-50 text-blue-700"
                  >
                    {reason}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* AI Features */}
        <div className="bg-white rounded-lg p-3 border border-green-100">
          <h4 className="text-sm font-medium text-foreground mb-2">AI Protection Features</h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-3 w-3 text-green-600" />
              <span>Hate speech detection</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-3 w-3 text-green-600" />
              <span>Cultural sensitivity analysis</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-3 w-3 text-green-600" />
              <span>Ubuntu philosophy alignment</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-3 w-3 text-green-600" />
              <span>Multi-language support</span>
            </div>
          </div>
        </div>

        <div className="text-center pt-2 border-t border-green-200/50">
          <div className="flex items-center justify-center space-x-1 text-xs text-muted-foreground">
            <Zap className="h-3 w-3" />
            <span>Protecting Ubuntu values with AI</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AIContentModerator;