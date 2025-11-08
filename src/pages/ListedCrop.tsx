import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar,
  MapPin,
  Package,
  TrendingUp,
  Eye
} from "lucide-react";

const listedCropsData = [
  {
    id: 1,
    date: "2024-01-18",
    mandi: "Main Grain Market, Ludhiana",
    crop: "Wheat (Sharbati)",
    quantity: "25 quintals",
    minimumPrice: "₹2,550",
    currentBids: 8,
    status: "Active",
    expiryDate: "2024-01-25",
    quality: "Grade A"
  },
  {
    id: 2,
    date: "2024-01-20",
    mandi: "Central Mandi, Amritsar",
    crop: "Rice (Basmati)",
    quantity: "40 quintals",
    minimumPrice: "₹3,200",
    currentBids: 12,
    status: "Active",
    expiryDate: "2024-01-27",
    quality: "Grade A"
  },
  {
    id: 3,
    date: "2024-01-16",
    mandi: "Agricultural Market, Karnal",
    crop: "Onion (Red)",
    quantity: "15 quintals",
    minimumPrice: "₹1,450",
    currentBids: 5,
    status: "Sold",
    expiryDate: "2024-01-23",
    quality: "Grade B+"
  },
  {
    id: 4,
    date: "2024-01-22",
    mandi: "Grain Market, Jalandhar",
    crop: "Tomato (Hybrid)",
    quantity: "30 quintals",
    minimumPrice: "₹1,120",
    currentBids: 15,
    status: "Active",
    expiryDate: "2024-01-29",
    quality: "Grade A"
  },
  {
    id: 5,
    date: "2024-01-14",
    mandi: "Wholesale Market, Ludhiana",
    crop: "Potato (Chipsona)",
    quantity: "50 quintals",
    minimumPrice: "₹1,200",
    currentBids: 3,
    status: "Expired",
    expiryDate: "2024-01-21",
    quality: "Grade B"
  }
];

export default function ListedCrop() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-success text-success-foreground";
      case "Sold":
        return "bg-primary text-primary-foreground";
      case "Expired":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getQualityColor = (quality: string) => {
    if (quality === "Grade A") return "text-success";
    if (quality === "Grade B+" || quality === "Grade B") return "text-accent";
    return "text-muted-foreground";
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Listed Crops</h1>
        <p className="text-muted-foreground">
          View all your crops listed in various mandis with current market status
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-card gradient-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Listings</p>
                <p className="text-2xl font-bold text-success">3</p>
              </div>
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card gradient-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Bids</p>
                <p className="text-2xl font-bold text-primary">43</p>
              </div>
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card gradient-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Price</p>
                <p className="text-2xl font-bold text-accent">₹2,080</p>
              </div>
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-accent-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {listedCropsData.map((crop) => (
          <Card key={crop.id} className="shadow-card gradient-card border-0 hover:shadow-elevated transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-foreground">{crop.crop}</h3>
                        <Badge className={getStatusColor(crop.status)}>
                          {crop.status}
                        </Badge>
                        <Badge variant="outline" className={getQualityColor(crop.quality)}>
                          {crop.quality}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Listed: {new Date(crop.date).toLocaleDateString('en-IN')}
                        </div>
                        <div className="flex items-center gap-1">
                          <Package className="w-4 h-4" />
                          {crop.quantity}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {crop.mandi}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">MINIMUM PRICE</p>
                      <p className="text-lg font-bold text-primary">{crop.minimumPrice}</p>
                      <p className="text-xs text-muted-foreground">per quintal</p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">CURRENT BIDS</p>
                      <p className="text-lg font-bold text-success">{crop.currentBids}</p>
                      <p className="text-xs text-muted-foreground">interested buyers</p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">EXPIRES ON</p>
                      <p className="text-lg font-bold text-foreground">
                        {new Date(crop.expiryDate).toLocaleDateString('en-IN', { 
                          day: 'numeric', 
                          month: 'short' 
                        })}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {crop.status === 'Active' ? 
                          `${Math.ceil((new Date(crop.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left` :
                          'Listing ended'
                        }
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">ACTIONS</p>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          View Details
                        </Button>
                        {crop.status === 'Active' && (
                          <Button 
                            size="sm" 
                            className="text-xs gradient-primary text-primary-foreground hover:shadow-soft transition-all"
                          >
                            Manage
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {listedCropsData.length === 0 && (
        <Card className="shadow-card gradient-card border-0">
          <CardContent className="py-12">
            <div className="text-center text-muted-foreground">
              <Package className="w-12 h-12 mx-auto mb-4 text-primary/50" />
              <p className="text-lg">No crops listed yet</p>
              <p className="text-sm mt-2">Register and verify your crops to start listing them in mandis</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}