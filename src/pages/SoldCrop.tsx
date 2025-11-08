import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar,
  User,
  TrendingUp,
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin
} from "lucide-react";

const soldCropsData = [
  {
    id: 1,
    date: "2024-01-16",
    crop: "Onion (Red)",
    quantity: "15 quintals",
    retailerName: "Raj Enterprises",
    retailerContact: "+91 98765 43210",
    finalPrice: "₹1,580",
    totalAmount: "₹23,700",
    transactionStatus: "Completed",
    trackingId: "TRK123456789",
    paymentStatus: "Paid",
    deliveryStatus: "Delivered",
    mandi: "Agricultural Market, Karnal",
    deliveryDate: "2024-01-18"
  },
  {
    id: 2,
    date: "2024-01-12",
    crop: "Wheat (Sharbati)",
    quantity: "20 quintals",
    retailerName: "Grain Masters Ltd",
    retailerContact: "+91 87654 32109",
    finalPrice: "₹2,650",
    totalAmount: "₹53,000",
    transactionStatus: "Completed",
    trackingId: "TRK234567890",
    paymentStatus: "Paid",
    deliveryStatus: "Delivered",
    mandi: "Main Grain Market, Ludhiana",
    deliveryDate: "2024-01-14"
  },
  {
    id: 3,
    date: "2024-01-20",
    crop: "Rice (Basmati)",
    quantity: "35 quintals",
    retailerName: "Premium Rice Co.",
    retailerContact: "+91 76543 21098",
    finalPrice: "₹3,400",
    totalAmount: "₹1,19,000",
    transactionStatus: "In Transit",
    trackingId: "TRK345678901",
    paymentStatus: "Advance Paid",
    deliveryStatus: "In Transit",
    mandi: "Central Mandi, Amritsar",
    deliveryDate: "2024-01-24"
  },
  {
    id: 4,
    date: "2024-01-08",
    crop: "Potato (Chipsona)",
    quantity: "45 quintals",
    retailerName: "Fresh Produce Hub",
    retailerContact: "+91 65432 10987",
    finalPrice: "₹1,350",
    totalAmount: "₹60,750",
    transactionStatus: "Completed",
    trackingId: "TRK456789012",
    paymentStatus: "Paid",
    deliveryStatus: "Delivered",
    mandi: "Wholesale Market, Ludhiana",
    deliveryDate: "2024-01-10"
  },
  {
    id: 5,
    date: "2024-01-22",
    crop: "Tomato (Hybrid)",
    quantity: "28 quintals",
    retailerName: "Veggie Express",
    retailerContact: "+91 54321 09876",
    finalPrice: "₹1,280",
    totalAmount: "₹35,840",
    transactionStatus: "Processing",
    trackingId: "TRK567890123",
    paymentStatus: "Pending",
    deliveryStatus: "Preparing",
    mandi: "Grain Market, Jalandhar",
    deliveryDate: "2024-01-25"
  }
];

export default function SoldCrop() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-success text-success-foreground";
      case "In Transit":
        return "bg-primary text-primary-foreground";
      case "Processing":
        return "bg-accent text-accent-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "text-success";
      case "Advance Paid":
        return "text-primary";
      case "Pending":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  const getDeliveryStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle className="w-4 h-4" />;
      case "In Transit":
        return <Truck className="w-4 h-4" />;
      case "Preparing":
        return <Clock className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const totalSales = soldCropsData.reduce((sum, crop) => sum + parseInt(crop.totalAmount.replace(/[₹,]/g, '')), 0);
  const completedTransactions = soldCropsData.filter(crop => crop.transactionStatus === 'Completed').length;
  const pendingDeliveries = soldCropsData.filter(crop => crop.deliveryStatus !== 'Delivered').length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Sold Crops</h1>
        <p className="text-muted-foreground">
          Track your crop sales history and transaction details
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-card gradient-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Sales</p>
                <p className="text-2xl font-bold text-success">₹{totalSales.toLocaleString()}</p>
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
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-primary">{completedTransactions}</p>
              </div>
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card gradient-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-accent">{pendingDeliveries}</p>
              </div>
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-accent-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card gradient-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Price</p>
                <p className="text-2xl font-bold text-foreground">₹2,252</p>
              </div>
              <div className="w-10 h-10 bg-muted/10 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {soldCropsData.map((sale) => (
          <Card key={sale.id} className="shadow-card gradient-card border-0 hover:shadow-elevated transition-all duration-200">
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-foreground">{sale.crop}</h3>
                      <Badge className={getStatusColor(sale.transactionStatus)}>
                        {sale.transactionStatus}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(sale.date).toLocaleDateString('en-IN')}
                      </div>
                      <div className="flex items-center gap-1">
                        <Package className="w-4 h-4" />
                        {sale.quantity}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {sale.mandi}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-muted-foreground mb-1">Total Amount</div>
                    <div className="text-2xl font-bold text-success">{sale.totalAmount}</div>
                    <div className="text-sm text-muted-foreground">{sale.finalPrice} per quintal</div>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-medium text-foreground flex items-center gap-2">
                      <User className="w-4 h-4 text-primary" />
                      Retailer Details
                    </h4>
                    <div className="p-3 rounded-lg bg-background/50 space-y-1">
                      <p className="font-medium text-foreground">{sale.retailerName}</p>
                      <p className="text-sm text-muted-foreground">{sale.retailerContact}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-foreground flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      Payment Status
                    </h4>
                    <div className="p-3 rounded-lg bg-background/50 space-y-1">
                      <p className={`font-medium ${getPaymentStatusColor(sale.paymentStatus)}`}>
                        {sale.paymentStatus}
                      </p>
                      <p className="text-sm text-muted-foreground">Final Price: {sale.finalPrice}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-foreground flex items-center gap-2">
                      <Truck className="w-4 h-4 text-primary" />
                      Delivery Status
                    </h4>
                    <div className="p-3 rounded-lg bg-background/50 space-y-1">
                      <div className="flex items-center gap-2">
                        {getDeliveryStatusIcon(sale.deliveryStatus)}
                        <span className="font-medium text-foreground">{sale.deliveryStatus}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {sale.deliveryStatus === 'Delivered' ? 'Delivered on' : 'Expected by'}: {' '}
                        {new Date(sale.deliveryDate).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-foreground">Tracking</h4>
                    <div className="p-3 rounded-lg bg-background/50 space-y-2">
                      <p className="text-sm font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                        {sale.trackingId}
                      </p>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="w-full text-xs hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        Track Shipment
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {soldCropsData.length === 0 && (
        <Card className="shadow-card gradient-card border-0">
          <CardContent className="py-12">
            <div className="text-center text-muted-foreground">
              <Package className="w-12 h-12 mx-auto mb-4 text-primary/50" />
              <p className="text-lg">No sales history found</p>
              <p className="text-sm mt-2">Your sold crops will appear here once you complete transactions</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}