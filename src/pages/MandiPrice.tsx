import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, TrendingUp, TrendingDown } from "lucide-react";

const statesData = {
  "Punjab": {
    districts: {
      "Ludhiana": ["Wheat", "Rice", "Maize", "Sugarcane"],
      "Amritsar": ["Wheat", "Rice", "Potato", "Onion"],
      "Jalandhar": ["Rice", "Wheat", "Tomato", "Cauliflower"],
      "Chandigarh": ["Wheat", "Rice", "Onion", "Potato"]
    }
  },
  "Haryana": {
    districts: {
      "Karnal": ["Rice", "Wheat", "Sugarcane", "Mustard"],
      "Panipat": ["Wheat", "Rice", "Bajra", "Gram"],
      "Faridabad": ["Wheat", "Mustard", "Barley", "Gram"],
      "Gurgaon": ["Wheat", "Mustard", "Bajra", "Jowar"]
    }
  },
  "Uttar Pradesh": {
    districts: {
      "Meerut": ["Sugarcane", "Wheat", "Rice", "Potato"],
      "Agra": ["Wheat", "Mustard", "Barley", "Peas"],
      "Lucknow": ["Rice", "Wheat", "Sugarcane", "Potato"],
      "Kanpur": ["Wheat", "Rice", "Cotton", "Sugarcane"]
    }
  }
};

const cropPrices = {
  "Wheat": { price: "₹2,550", unit: "per quintal", change: "+5.2%", trend: "up" },
  "Rice": { price: "₹3,200", unit: "per quintal", change: "-2.1%", trend: "down" },
  "Maize": { price: "₹1,850", unit: "per quintal", change: "+3.8%", trend: "up" },
  "Sugarcane": { price: "₹385", unit: "per quintal", change: "+1.5%", trend: "up" },
  "Potato": { price: "₹1,200", unit: "per quintal", change: "+8.3%", trend: "up" },
  "Onion": { price: "₹1,450", unit: "per quintal", change: "-4.2%", trend: "down" },
  "Tomato": { price: "₹1,120", unit: "per quintal", change: "+12.5%", trend: "up" },
  "Cauliflower": { price: "₹800", unit: "per quintal", change: "+6.7%", trend: "up" },
  "Mustard": { price: "₹5,800", unit: "per quintal", change: "-1.8%", trend: "down" },
  "Bajra": { price: "₹2,100", unit: "per quintal", change: "+2.3%", trend: "up" },
  "Gram": { price: "₹5,200", unit: "per quintal", change: "+4.1%", trend: "up" },
  "Barley": { price: "₹1,750", unit: "per quintal", change: "-0.5%", trend: "down" },
  "Peas": { price: "₹4,500", unit: "per quintal", change: "+7.2%", trend: "up" },
  "Cotton": { price: "₹6,800", unit: "per quintal", change: "+3.5%", trend: "up" },
  "Jowar": { price: "₹2,800", unit: "per quintal", change: "+1.9%", trend: "up" }
};

const mandiData = {
  "Ludhiana": ["Main Grain Market", "Agricultural Produce Market", "Wholesale Market"],
  "Amritsar": ["Central Mandi", "Ranjit Avenue Market", "GT Road Market"],
  "Jalandhar": ["Grain Market", "Vegetable Market", "Central Mandi"],
  "Chandigarh": ["Sector 26 Mandi", "Industrial Area Market", "Grain Market"],
  "Karnal": ["Rice Market", "Grain Mandi", "Agricultural Market"],
  "Panipat": ["Central Grain Market", "Wholesale Market", "Agricultural Mandi"],
  "Faridabad": ["Grain Market", "Agricultural Produce Market", "Central Mandi"],
  "Gurgaon": ["Sector 14 Market", "Agricultural Market", "Grain Mandi"],
  "Meerut": ["Sugar Market", "Grain Mandi", "Agricultural Market"],
  "Agra": ["Central Mandi", "Grain Market", "Agricultural Produce Market"],
  "Lucknow": ["Alambagh Market", "Chowk Market", "Agricultural Mandi"],
  "Kanpur": ["Central Market", "Grain Mandi", "Cotton Market"]
};

export default function MandiPrice() {
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedCrop, setSelectedCrop] = useState<string>("");

  const availableDistricts = selectedState ? Object.keys(statesData[selectedState as keyof typeof statesData]?.districts || {}) : [];
  const availableCrops = selectedState && selectedDistrict ? 
    statesData[selectedState as keyof typeof statesData]?.districts[selectedDistrict as keyof typeof statesData[keyof typeof statesData]['districts']] || [] : [];
  const availableMandiList = selectedDistrict ? mandiData[selectedDistrict as keyof typeof mandiData] || [] : [];

  const showResults = selectedState && selectedDistrict && selectedCrop;
  const cropInfo = selectedCrop ? cropPrices[selectedCrop as keyof typeof cropPrices] : null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Mandi Price Check</h1>
        <p className="text-muted-foreground">
          Get real-time crop prices and find mandis in your area
        </p>
      </div>

      <Card className="shadow-card gradient-card border-0">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-foreground">Select Location & Crop</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">State</label>
              <Select 
                value={selectedState} 
                onValueChange={(value) => {
                  setSelectedState(value);
                  setSelectedDistrict("");
                  setSelectedCrop("");
                }}
              >
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(statesData).map((state) => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">District</label>
              <Select 
                value={selectedDistrict} 
                onValueChange={(value) => {
                  setSelectedDistrict(value);
                  setSelectedCrop("");
                }}
                disabled={!selectedState}
              >
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Select District" />
                </SelectTrigger>
                <SelectContent>
                  {availableDistricts.map((district) => (
                    <SelectItem key={district} value={district}>{district}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Crop</label>
              <Select 
                value={selectedCrop} 
                onValueChange={setSelectedCrop}
                disabled={!selectedDistrict}
              >
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Select Crop" />
                </SelectTrigger>
                <SelectContent>
                  {availableCrops.map((crop) => (
                    <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {showResults && cropInfo && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="shadow-card gradient-card border-0">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground">Current Price</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center p-6">
                <h3 className="text-2xl font-bold text-primary mb-2">{selectedCrop}</h3>
                <div className="text-4xl font-bold text-foreground mb-2">{cropInfo.price}</div>
                <p className="text-muted-foreground mb-4">{cropInfo.unit}</p>
                <div className="flex items-center justify-center gap-2">
                  {cropInfo.trend === 'up' ? (
                    <TrendingUp className="w-5 h-5 text-success" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-destructive" />
                  )}
                  <Badge 
                    variant={cropInfo.trend === 'up' ? 'default' : 'destructive'}
                    className={cropInfo.trend === 'up' ? 'bg-success text-success-foreground' : ''}
                  >
                    {cropInfo.change}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-2">vs last week</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card gradient-card border-0">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Available Mandis in {selectedDistrict}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {availableMandiList.map((mandi, index) => (
                  <div 
                    key={index} 
                    className="p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-colors cursor-pointer border border-border/50"
                  >
                    <h4 className="font-medium text-foreground">{mandi}</h4>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        Open Today
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {selectedDistrict}, {selectedState}
                      </span>
                    </div>
                    <p className="text-sm text-success font-medium mt-2">
                      Current Rate: {cropInfo.price}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {!showResults && (
        <Card className="shadow-card gradient-card border-0">
          <CardContent className="py-12">
            <div className="text-center text-muted-foreground">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-primary/50" />
              <p className="text-lg">Select state, district, and crop to view prices</p>
              <p className="text-sm mt-2">Real-time market prices and mandi information</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}