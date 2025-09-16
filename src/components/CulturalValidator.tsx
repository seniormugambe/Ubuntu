import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Brain, 
  Users, 
  ThumbsUp, 
  ThumbsDown,
  MessageSquare,
  Eye,
  Clock,
  Sparkles
} from "lucide-react";
import { toast } from "sonner";

interface CulturalSubmission {
  id: string;
  title: string;
  content: string;
  type: string;
  contributor: string;
  region: string;
  language: string;
  status: "pending" | "reviewing" | "validated" | "needs_review" | "rejected";
  aiConfidence: number;
  communityVotes: {
    accurate: number;
    inaccurate: number;
    needsContext: number;
  };
  validatorComments: string[];
  aiAnalysis: {
    culturalAccuracy: number;
    languageCorrectness: number;
    contextualRelevance: number;
    potentialConcerns: string[];
  };
  timestamp: Date;
}

const CulturalValidator = () => {
  const [submissions, setSubmissions] = useState<CulturalSubmission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(null);
  const [userRole] = useState<"contributor" | "validator" | "elder">("validator");

  useEffect(() => {
    // Mock submissions for validation
    const mockSubmissions: CulturalSubmission[] = [
      {
        id: "1",
        title: "Ubuntu Philosophy in Modern Workplace",
        content: "Ubuntu philosophy 'I am because we are' can be applied in modern workplaces by fostering collaborative decision-making, shared responsibility, and collective success. In traditional African societies, this meant that individual achievements were celebrated as community achievements.",
        type: "wisdom",
        contributor: "Sarah Nakamya",
        region: "Uganda",
        language: "English",
        status: "reviewing",
        aiConfidence: 87,
        communityVotes: { accurate: 12, inaccurate: 1, needsContext: 3 },
        validatorComments: [
          "Accurate representation of Ubuntu philosophy",
          "Could use more specific examples from traditional practice"
        ],
        aiAnalysis: {
          culturalAccuracy: 92,
          languageCorrectness: 95,
          contextualRelevance: 88,
          potentialConcerns: ["Needs more traditional context examples"]
        },
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
      },
      {
        id: "2",
        title: "Maasai Jumping Dance (Adumu)",
        content: "The Adumu is performed by young Maasai warriors to demonstrate their strength and agility. The higher a warrior jumps, the more attractive he is to potential wives. This dance is central to Maasai coming-of-age ceremonies.",
        type: "tradition",
        contributor: "Joseph Sankale",
        region: "Kenya/Tanzania",
        language: "English",
        status: "pending",
        aiConfidence: 94,
        communityVotes: { accurate: 8, inaccurate: 0, needsContext: 2 },
        validatorComments: [],
        aiAnalysis: {
          culturalAccuracy: 96,
          languageCorrectness: 98,
          contextualRelevance: 94,
          potentialConcerns: []
        },
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000)
      },
      {
        id: "3",
        title: "Yoruba Greeting Customs",
        content: "In Yoruba culture, younger people must prostrate (dobale for males, kunle for females) when greeting elders. This shows respect and acknowledges the wisdom that comes with age. However, this is not always practiced in modern urban settings.",
        type: "tradition",
        contributor: "Adunni Okafor",
        region: "Nigeria",
        language: "English",
        status: "needs_review",
        aiConfidence: 78,
        communityVotes: { accurate: 15, inaccurate: 2, needsContext: 5 },
        validatorComments: [
          "Accurate but needs clarification on regional variations",
          "Should mention that practices vary between traditional and modern contexts"
        ],
        aiAnalysis: {
          culturalAccuracy: 85,
          languageCorrectness: 92,
          contextualRelevance: 75,
          potentialConcerns: ["Regional variations not fully addressed", "Modern adaptations need more context"]
        },
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000)
      }
    ];

    setSubmissions(mockSubmissions);
  }, []);

  const handleVote = (submissionId: string, voteType: "accurate" | "inaccurate" | "needsContext") => {
    setSubmissions(prev => 
      prev.map(sub => 
        sub.id === submissionId 
          ? {
              ...sub,
              communityVotes: {
                ...sub.communityVotes,
                [voteType]: sub.communityVotes[voteType] + 1
              }
            }
          : sub
      )
    );

    toast.success("Vote recorded! 🗳️", {
      description: "Thank you for helping validate cultural knowledge"
    });
  };

  const handleStatusChange = (submissionId: string, newStatus: CulturalSubmission["status"]) => {
    setSubmissions(prev => 
      prev.map(sub => 
        sub.id === submissionId 
          ? { ...sub, status: newStatus }
          : sub
      )
    );

    const statusMessages = {
      validated: "Cultural knowledge validated! ✅",
      needs_review: "Marked for additional review 📝",
      rejected: "Submission rejected ❌"
    };

    toast.success(statusMessages[newStatus] || "Status updated");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "validated": return "bg-green-100 text-green-700 border-green-200";
      case "reviewing": return "bg-blue-100 text-blue-700 border-blue-200";
      case "needs_review": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "rejected": return "bg-red-100 text-red-700 border-red-200";
      case "pending": return "bg-gray-100 text-gray-700 border-gray-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "validated": return <CheckCircle className="h-4 w-4" />;
      case "reviewing": return <Eye className="h-4 w-4" />;
      case "needs_review": return <AlertTriangle className="h-4 w-4" />;
      case "rejected": return <XCircle className="h-4 w-4" />;
      case "pending": return <Clock className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-600";
    if (confidence >= 75) return "text-blue-600";
    if (confidence >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200/50">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-foreground">Cultural Knowledge Validator</h3>
              <p className="text-sm text-muted-foreground">Community-powered AI learning verification</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-gradient-to-r from-indigo-100 to-purple-100">
            <Users className="h-3 w-3 mr-1" />
            Community Driven
          </Badge>
        </div>

        {/* Validation Queue */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-foreground">Pending Validations</h4>
            <Badge variant="outline">{submissions.length} submissions</Badge>
          </div>

          {submissions.map((submission) => (
            <div key={submission.id} className="bg-white/80 rounded-lg p-4 border border-indigo-100">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-indigo-100 text-indigo-700 text-xs">
                        {submission.contributor.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h5 className="font-medium text-foreground">{submission.title}</h5>
                      <div className="text-sm text-muted-foreground">
                        by {submission.contributor} • {submission.region} • {submission.language}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(submission.status)}>
                      {getStatusIcon(submission.status)}
                      <span className="ml-1">{submission.status.replace('_', ' ')}</span>
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-foreground">{submission.content}</p>
                </div>

                {/* AI Analysis */}
                <div className="bg-indigo-50 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <Sparkles className="h-4 w-4 text-indigo-600" />
                    <span className="text-sm font-medium text-indigo-800">AI Analysis</span>
                    <Badge className={`text-xs ${getConfidenceColor(submission.aiConfidence)}`}>
                      {submission.aiConfidence}% confidence
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div className="text-center">
                      <div className="text-sm font-medium text-indigo-700">
                        {submission.aiAnalysis.culturalAccuracy}%
                      </div>
                      <div className="text-xs text-muted-foreground">Cultural Accuracy</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium text-indigo-700">
                        {submission.aiAnalysis.languageCorrectness}%
                      </div>
                      <div className="text-xs text-muted-foreground">Language Correctness</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium text-indigo-700">
                        {submission.aiAnalysis.contextualRelevance}%
                      </div>
                      <div className="text-xs text-muted-foreground">Contextual Relevance</div>
                    </div>
                  </div>

                  {submission.aiAnalysis.potentialConcerns.length > 0 && (
                    <div>
                      <div className="text-xs font-medium text-indigo-800 mb-1">AI Concerns:</div>
                      <div className="flex flex-wrap gap-1">
                        {submission.aiAnalysis.potentialConcerns.map((concern, index) => (
                          <Badge key={index} variant="outline" className="text-xs bg-yellow-50 text-yellow-700">
                            {concern}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Community Votes */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>{submission.communityVotes.accurate} accurate</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <XCircle className="h-4 w-4 text-red-600" />
                      <span>{submission.communityVotes.inaccurate} inaccurate</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <span>{submission.communityVotes.needsContext} needs context</span>
                    </div>
                  </div>

                  {/* Voting Buttons */}
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleVote(submission.id, "accurate")}
                      className="text-green-600 hover:bg-green-50"
                    >
                      <ThumbsUp className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleVote(submission.id, "inaccurate")}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <ThumbsDown className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleVote(submission.id, "needsContext")}
                      className="text-yellow-600 hover:bg-yellow-50"
                    >
                      <MessageSquare className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {/* Validator Actions */}
                {userRole === "validator" && submission.status !== "validated" && (
                  <div className="flex items-center space-x-2 pt-3 border-t border-indigo-100">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleStatusChange(submission.id, "validated")}
                      className="text-green-600 hover:bg-green-50"
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Validate
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleStatusChange(submission.id, "needs_review")}
                      className="text-yellow-600 hover:bg-yellow-50"
                    >
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Needs Review
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleStatusChange(submission.id, "rejected")}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <XCircle className="h-3 w-3 mr-1" />
                      Reject
                    </Button>
                  </div>
                )}

                {/* Comments */}
                {submission.validatorComments.length > 0 && (
                  <div className="pt-3 border-t border-indigo-100">
                    <div className="text-xs font-medium text-muted-foreground mb-2">Validator Comments:</div>
                    <div className="space-y-1">
                      {submission.validatorComments.map((comment, index) => (
                        <div key={index} className="text-xs text-muted-foreground bg-gray-50 rounded p-2">
                          {comment}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-4 border-t border-indigo-200/50">
          <div className="flex items-center justify-center space-x-1 text-xs text-muted-foreground">
            <Brain className="h-3 w-3" />
            <span>Ensuring AI learns authentic cultural knowledge through community validation</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CulturalValidator;