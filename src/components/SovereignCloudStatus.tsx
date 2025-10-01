import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Server, 
  Zap, 
  Globe, 
  Lock,
  CheckCircle,
  AlertTriangle,
  Activity,
  MapPin,
  Clock,
  Wifi
} from "lucide-react";

const SovereignCloudStatus = () => {
  const [cloudStatus, setCloudStatus] = useState({
    status: "operational",
    uptime: 99.97,
    dataCenter: "Kampala National Data Center",
    latency: 12,
    activeUsers: 12847,
    dataProcessed: "2.3TB",
    securityLevel: "Maximum",
    lastUpdate: new Date()
  });

  const [infrastructureStats, setInfrastructureStats] = useState([
    { name: "Makerere University Hub", status: "online", load: 78, location: "Kampala" },
    { name: "Mbarara Innovation Center", status: "online", load: 65, location: "Mbarara" },
    { name: "Gulu Tech Hub", status: "online", load: 82, location: "Gulu" },
    { name: "Jinja Digital Center", status: "maintenance", load: 0, location: "Jinja" }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational": 
      case "online": 
        return "bg-green-100 text-green-700 border-green-200";
      case "maintenance": 
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "offline": 
        return "bg-red-100 text-red-700 border-red-200";
      default: 
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
      case "online":
        return <CheckCircle className="h-4 w-4" />;
      case "maintenance":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-green-50 to-blue-50 border-green-200/50">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-foreground">Uganda Sovereign Cloud</h3>
              <p className="text-sm text-muted-foreground">National Digital Infrastructure</p>
            </div>
          </div>
          <Badge className={getStatusColor(cloudStatus.status)}>
            {getStatusIcon(cloudStatus.status)}
            <span className="ml-1 capitalize">{cloudStatus.status}</span>
          </Badge>
        </div>

        {/* Main Status */}
        <div className="bg-white/80 rounded-lg p-4">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{cloudStatus.uptime}%</div>
              <div className="text-xs text-muted-foreground">Uptime</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{cloudStatus.latency}ms</div>
              <div className="text-xs text-muted-foreground">Avg Latency</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{cloudStatus.activeUsers.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Active Users</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{cloudStatus.dataProcessed}</div>
              <div className="text-xs text-muted-foreground">Data Today</div>
            </div>
          </div>
        </div>

        {/* Data Center Info */}
        <div className="bg-white/80 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-foreground flex items-center">
              <Server className="h-5 w-5 mr-2 text-blue-600" />
              Primary Data Center
            </h4>
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              <MapPin className="h-3 w-3 mr-1" />
              {cloudStatus.dataCenter}
            </Badge>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Security Level</span>
              <div className="flex items-center space-x-1">
                <Lock className="h-3 w-3 text-green-600" />
                <span className="font-medium text-green-600">{cloudStatus.securityLevel}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Data Sovereignty</span>
              <span className="font-medium text-green-600">100% Ugandan</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Compliance</span>
              <span className="font-medium text-blue-600">UCC Certified</span>
            </div>
          </div>
        </div>

        {/* Infrastructure Network */}
        <div className="space-y-3">
          <h4 className="font-semibold text-foreground flex items-center">
            <Wifi className="h-5 w-5 mr-2 text-purple-600" />
            National Innovation Network
          </h4>
          
          <div className="space-y-2">
            {infrastructureStats.map((hub, index) => (
              <div key={index} className="bg-white/80 rounded-lg p-3 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      hub.status === 'online' ? 'bg-green-500' : 
                      hub.status === 'maintenance' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    <div>
                      <div className="font-medium text-sm text-foreground">{hub.name}</div>
                      <div className="text-xs text-muted-foreground">{hub.location}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {hub.status === 'online' && (
                      <div className="text-xs text-muted-foreground">
                        {hub.load}% load
                      </div>
                    )}
                    <Badge className={getStatusColor(hub.status)}>
                      {hub.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Sovereignty Features */}
        <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-4">
          <h4 className="font-semibold text-green-800 mb-3 flex items-center">
            <Globe className="h-5 w-5 mr-2" />
            Digital Sovereignty Features
          </h4>
          
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-green-700">Data never leaves Uganda</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-green-700">Local content prioritization</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-green-700">Ugandan law compliance</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-green-700">Local language support</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-green-700">Cultural content protection</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-green-700">Economic data retention</span>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white/80 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-3 flex items-center">
            <Zap className="h-5 w-5 mr-2 text-yellow-600" />
            Real-time Performance
          </h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Network Speed</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <span className="text-sm font-medium">850 Mbps</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Server Load</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '67%' }}></div>
                </div>
                <span className="text-sm font-medium">67%</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Security Score</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '98%' }}></div>
                </div>
                <span className="text-sm font-medium">98/100</span>
              </div>
            </div>
          </div>
        </div>

        {/* Last Update */}
        <div className="text-center pt-4 border-t border-green-200/50">
          <div className="flex items-center justify-center space-x-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>Last updated: {cloudStatus.lastUpdate.toLocaleTimeString()}</span>
          </div>
          <div className="text-xs text-green-600 mt-1">
            🇺🇬 Proudly powered by Uganda's National Digital Infrastructure
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SovereignCloudStatus;