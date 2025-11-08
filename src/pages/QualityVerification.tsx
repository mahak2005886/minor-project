import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { 
  ShieldCheck, 
  Search, 
  Calendar,
  Package,
  Award,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

const qualityVerificationData = [
  {
    id: 1,
    date: "2024-01-15",
    tokenNo: "ABCD1234",
    cropName: "Wheat (Sharbati)",
    quantity: "25 quintals",
    status: "Complete",
    quality: "Grade A",
    submittedDate: "2024-01-10",
    collectionDate: "2024-01-12",
    testingCompletedDate: "2024-01-15"
  },
  {
    id: 2,
    date: "2024-01-18",
    tokenNo: "EFGH5678",
    cropName: "Rice (Basmati)",
    quantity: "40 quintals",
    status: "Quality Testing",
    quality: "Pending",
    submittedDate: "2024-01-16",
    collectionDate: "2024-01-17",
    testingCompletedDate: null
  },
  {
    id: 3,
    date: "2024-01-20",
    tokenNo: "IJKL9012",
    cropName: "Onion (Red)",
    quantity: "15 quintals",
    status: "Sample Collected",
    quality: "Pending",
    submittedDate: "2024-01-18",
    collectionDate: "2024-01-19",
    testingCompletedDate: null
  },
  {
    id: 4,
    date: "2024-01-12",
    tokenNo: "MNOP3456",
    cropName: "Tomato (Hybrid)",
    quantity: "30 quintals",
    status: "Complete",
    quality: "Grade B+",
    submittedDate: "2024-01-08",
    collectionDate: "2024-01-10",
    testingCompletedDate: "2024-01-12"
  },
  {
    id: 5,
    date: "2024-01-22",
    tokenNo: "QRST7890",
    cropName: "Potato (Chipsona)",
    quantity: "50 quintals",
    status: "Sample Collected",
    quality: "Pending",
    submittedDate: "2024-01-20",
    collectionDate: "2024-01-21",
    testingCompletedDate: null
  }
];

export default function QualityVerification() {
  const [searchToken, setSearchToken] = useState("");

  const filteredData = qualityVerificationData.filter(item => 
    searchToken === "" || item.tokenNo.toLowerCase().includes(searchToken.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Complete":
        return "bg-success text-success-foreground";
      case "Quality Testing":
        return "bg-accent text-accent-foreground";
      case "Sample Collected":
        return "bg-primary text-primary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getQualityColor = (quality: string) => {
    if (quality === "Grade A") return "text-success";
    if (quality === "Grade B+" || quality === "Grade B") return "text-accent";
    if (quality === "Grade C") return "text-orange-600";
    return "text-muted-foreground";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Complete":
        return <CheckCircle2 className="w-4 h-4" />;
      case "Quality Testing":
        return <AlertCircle className="w-4 h-4" />;
      case "Sample Collected":
        return <Clock className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Quality Verification</h1>
        <p className="text-muted-foreground">
          Track the quality verification status of your registered crops
        </p>
      </div>

      <Card className="shadow-card gradient-card border-0">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-foreground">Search Verification</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={searchToken}
                onChange={(e) => setSearchToken(e.target.value)}
                placeholder="Search by token number..."
                className="pl-10 bg-background border-border"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              {filteredData.length} records found
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6">
        {filteredData.map((item) => (
          <Card key={item.id} className="shadow-card gradient-card border-0 hover:shadow-elevated transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-foreground">{item.cropName}</h3>
                        <Badge className={getStatusColor(item.status)}>
                          {getStatusIcon(item.status)}
                          {item.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(item.date).toLocaleDateString('en-IN')}
                        </div>
                        <div className="flex items-center gap-1">
                          <Package className="w-4 h-4" />
                          {item.quantity}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-muted-foreground mb-1">Token Number</div>
                      <div className="text-lg font-mono font-bold text-primary bg-primary/10 py-1 px-3 rounded-lg">
                        {item.tokenNo}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-muted-foreground">SUBMISSION</Label>
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-background/50">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <div>
                          <div className="text-sm font-medium text-foreground">Submitted</div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(item.submittedDate).toLocaleDateString('en-IN')}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-muted-foreground">COLLECTION</Label>
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-background/50">
                        <div className={`w-2 h-2 rounded-full ${
                          item.collectionDate ? 'bg-success' : 'bg-muted-foreground'
                        }`}></div>
                        <div>
                          <div className="text-sm font-medium text-foreground">
                            {item.collectionDate ? 'Collected' : 'Pending'}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {item.collectionDate 
                              ? new Date(item.collectionDate).toLocaleDateString('en-IN')
                              : 'Awaiting collection'
                            }
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-muted-foreground">QUALITY RESULT</Label>
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-background/50">
                        <Award className={`w-4 h-4 ${getQualityColor(item.quality)}`} />
                        <div>
                          <div className={`text-sm font-medium ${getQualityColor(item.quality)}`}>
                            {item.quality}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {item.testingCompletedDate 
                              ? new Date(item.testingCompletedDate).toLocaleDateString('en-IN')
                              : 'Testing in progress'
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredData.length === 0 && (
        <Card className="shadow-card gradient-card border-0">
          <CardContent className="py-12">
            <div className="text-center text-muted-foreground">
              <ShieldCheck className="w-12 h-12 mx-auto mb-4 text-primary/50" />
              <p className="text-lg">No verification records found</p>
              <p className="text-sm mt-2">
                {searchToken ? "Try a different token number" : "Register your crops to see quality verification status"}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}