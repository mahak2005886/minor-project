import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle, FileEdit } from "lucide-react";
import { useNavigate } from "react-router-dom";

const statesData = {
  "Punjab": {
    districts: {
      "Ludhiana": ["Main Grain Market", "Agricultural Produce Market", "Wholesale Market"],
      "Amritsar": ["Central Mandi", "Ranjit Avenue Market", "GT Road Market"],
      "Jalandhar": ["Grain Market", "Vegetable Market", "Central Mandi"],
      "Chandigarh": ["Sector 26 Mandi", "Industrial Area Market", "Grain Market"]
    }
  },
  "Haryana": {
    districts: {
      "Karnal": ["Rice Market", "Grain Mandi", "Agricultural Market"],
      "Panipat": ["Central Grain Market", "Wholesale Market", "Agricultural Mandi"],
      "Faridabad": ["Grain Market", "Agricultural Produce Market", "Central Mandi"],
      "Gurgaon": ["Sector 14 Market", "Agricultural Market", "Grain Mandi"]
    }
  },
  "Uttar Pradesh": {
    districts: {
      "Meerut": ["Sugar Market", "Grain Mandi", "Agricultural Market"],
      "Agra": ["Central Mandi", "Grain Market", "Agricultural Produce Market"],
      "Lucknow": ["Alambagh Market", "Chowk Market", "Agricultural Mandi"],
      "Kanpur": ["Central Market", "Grain Mandi", "Cotton Market"]
    }
  }
};

const cropOptions = [
  "Wheat", "Rice", "Maize", "Sugarcane", "Potato", "Onion", 
  "Tomato", "Cauliflower", "Mustard", "Bajra", "Gram", 
  "Barley", "Peas", "Cotton", "Jowar"
];

function generateToken(): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  
  let token = '';
  for (let i = 0; i < 4; i++) {
    token += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  for (let i = 0; i < 4; i++) {
    token += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  
  return token;
}

export default function CropRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    farmerName: "",
    mobileNumber: "",
    cropName: "",
    quantity: "",
    state: "",
    district: "",
    mandi: ""
  });
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [generatedToken, setGeneratedToken] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const availableDistricts = formData.state ? Object.keys(statesData[formData.state as keyof typeof statesData]?.districts || {}) : [];
  const availableMandiList = formData.state && formData.district ? 
    statesData[formData.state as keyof typeof statesData]?.districts[formData.district as keyof typeof statesData[keyof typeof statesData]['districts']] || [] : [];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }

    // Reset dependent fields
    if (field === "state") {
      setFormData(prev => ({ ...prev, district: "", mandi: "" }));
    } else if (field === "district") {
      setFormData(prev => ({ ...prev, mandi: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.farmerName.trim()) newErrors.farmerName = "Farmer name is required";
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobileNumber.replace(/\D/g, ''))) {
      newErrors.mobileNumber = "Please enter a valid 10-digit mobile number";
    }
    if (!formData.cropName) newErrors.cropName = "Crop name is required";
    if (!formData.quantity.trim()) {
      newErrors.quantity = "Quantity is required";
    } else if (isNaN(Number(formData.quantity)) || Number(formData.quantity) <= 0) {
      newErrors.quantity = "Please enter a valid quantity";
    }
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.district) newErrors.district = "District is required";
    if (!formData.mandi) newErrors.mandi = "Mandi is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const token = generateToken();
      setGeneratedToken(token);
      setShowSuccessDialog(true);
    }
  };

  const handleDialogClose = () => {
    setShowSuccessDialog(false);
    setFormData({
      farmerName: "",
      mobileNumber: "",
      cropName: "",
      quantity: "",
      state: "",
      district: "",
      mandi: ""
    });
    navigate("/");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Crop Registration</h1>
        <p className="text-muted-foreground">
          Register your crop for market listing and quality verification
        </p>
      </div>

      <Card className="shadow-card gradient-card border-0">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
            <FileEdit className="w-6 h-6 text-primary" />
            Registration Form
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="farmerName" className="text-sm font-medium text-foreground">
                  Farmer Name *
                </Label>
                <Input
                  id="farmerName"
                  value={formData.farmerName}
                  onChange={(e) => handleInputChange("farmerName", e.target.value)}
                  placeholder="Enter your full name"
                  className={`bg-background border-border ${errors.farmerName ? 'border-destructive' : ''}`}
                />
                {errors.farmerName && (
                  <p className="text-xs text-destructive">{errors.farmerName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobileNumber" className="text-sm font-medium text-foreground">
                  Mobile Number *
                </Label>
                <Input
                  id="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
                  placeholder="Enter 10-digit mobile number"
                  className={`bg-background border-border ${errors.mobileNumber ? 'border-destructive' : ''}`}
                />
                {errors.mobileNumber && (
                  <p className="text-xs text-destructive">{errors.mobileNumber}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cropName" className="text-sm font-medium text-foreground">
                  Crop Name *
                </Label>
                <Select 
                  value={formData.cropName} 
                  onValueChange={(value) => handleInputChange("cropName", value)}
                >
                  <SelectTrigger className={`bg-background border-border ${errors.cropName ? 'border-destructive' : ''}`}>
                    <SelectValue placeholder="Select crop" />
                  </SelectTrigger>
                  <SelectContent>
                    {cropOptions.map((crop) => (
                      <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.cropName && (
                  <p className="text-xs text-destructive">{errors.cropName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity" className="text-sm font-medium text-foreground">
                  Approx Quantity (in quintals) *
                </Label>
                <Input
                  id="quantity"
                  value={formData.quantity}
                  onChange={(e) => handleInputChange("quantity", e.target.value)}
                  placeholder="Enter quantity in quintals"
                  type="number"
                  className={`bg-background border-border ${errors.quantity ? 'border-destructive' : ''}`}
                />
                {errors.quantity && (
                  <p className="text-xs text-destructive">{errors.quantity}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="state" className="text-sm font-medium text-foreground">
                  State *
                </Label>
                <Select 
                  value={formData.state} 
                  onValueChange={(value) => handleInputChange("state", value)}
                >
                  <SelectTrigger className={`bg-background border-border ${errors.state ? 'border-destructive' : ''}`}>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(statesData).map((state) => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.state && (
                  <p className="text-xs text-destructive">{errors.state}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="district" className="text-sm font-medium text-foreground">
                  District *
                </Label>
                <Select 
                  value={formData.district} 
                  onValueChange={(value) => handleInputChange("district", value)}
                  disabled={!formData.state}
                >
                  <SelectTrigger className={`bg-background border-border ${errors.district ? 'border-destructive' : ''}`}>
                    <SelectValue placeholder="Select district" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableDistricts.map((district) => (
                      <SelectItem key={district} value={district}>{district}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.district && (
                  <p className="text-xs text-destructive">{errors.district}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mandi" className="text-sm font-medium text-foreground">
                Mandi *
              </Label>
              <Select 
                value={formData.mandi} 
                onValueChange={(value) => handleInputChange("mandi", value)}
                disabled={!formData.district}
              >
                <SelectTrigger className={`bg-background border-border ${errors.mandi ? 'border-destructive' : ''}`}>
                  <SelectValue placeholder="Select mandi" />
                </SelectTrigger>
                <SelectContent>
                  {availableMandiList.map((mandi) => (
                    <SelectItem key={mandi} value={mandi}>{mandi}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.mandi && (
                <p className="text-xs text-destructive">{errors.mandi}</p>
              )}
            </div>

            <Alert className="bg-primary/5 border-primary/20">
              <CheckCircle className="h-4 w-4 text-primary" />
              <AlertDescription className="text-primary">
                After successful registration, you will receive a unique token number for tracking your crop through the quality verification process.
              </AlertDescription>
            </Alert>

            <div className="flex justify-end pt-4">
              <Button 
                type="submit" 
                className="gradient-primary text-primary-foreground px-8 py-3 font-semibold hover:shadow-elevated transition-all duration-200"
              >
                Register Crop
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md gradient-card border-0 shadow-elevated">
          <DialogHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 gradient-success rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-success-foreground" />
            </div>
            <DialogTitle className="text-2xl font-bold text-success">
              Crop Registered Successfully!
            </DialogTitle>
            <DialogDescription className="text-center space-y-4 pt-4">
              <div className="text-lg font-semibold text-foreground">
                Sample Collection and Quality Verification
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Token Number:</div>
                <div className="text-2xl font-mono font-bold text-primary bg-primary/10 py-2 px-4 rounded-lg">
                  {generatedToken}
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                Please save this token number for future reference and quality verification tracking.
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center pt-4">
            <Button 
              onClick={handleDialogClose}
              className="gradient-primary text-primary-foreground px-8 hover:shadow-elevated transition-all duration-200"
            >
              OK
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}