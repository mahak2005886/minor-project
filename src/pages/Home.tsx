import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Sprout, 
  TrendingUp, 
  FileEdit, 
  ShieldCheck,
  MapPin,
  Calendar
} from "lucide-react";

export default function Home() {
  const stats = [
    {
      title: "Registered Crops",
      value: "12",
      icon: Sprout,
      color: "bg-success/10 text-success",
      trend: "+2 this month"
    },
    {
      title: "Market Value",
      value: "₹45,600",
      icon: TrendingUp,
      color: "bg-accent/10 text-accent-foreground",
      trend: "+8% from last week"
    },
    {
      title: "Pending Quality Check",
      value: "3",
      icon: ShieldCheck,
      color: "bg-primary/10 text-primary",
      trend: "2 completed today"
    },
    {
      title: "Total Sales",
      value: "₹1,23,400",
      icon: FileEdit,
      color: "bg-success/10 text-success",
      trend: "+12% this month"
    }
  ];

  const recentActivities = [
    {
      action: "Crop Registered",
      crop: "Wheat (Sharbati)",
      location: "Mandi Gobindgarh",
      date: "Today, 10:30 AM",
      status: "success"
    },
    {
      action: "Quality Verified",
      crop: "Rice (Basmati)",
      location: "Ludhiana Mandi",
      date: "Yesterday, 3:45 PM",
      status: "success"
    },
    {
      action: "Price Updated",
      crop: "Onion (Red)",
      location: "Chandigarh Mandi",
      date: "2 days ago",
      status: "info"
    }
  ];

  const upcomingTasks = [
    {
      task: "Quality verification pending",
      crop: "Tomato (Hybrid)",
      dueDate: "Tomorrow",
      priority: "high"
    },
    {
      task: "Sample collection scheduled",
      crop: "Potato (Chipsona)",
      dueDate: "In 2 days",
      priority: "medium"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="gradient-primary rounded-2xl p-8 text-primary-foreground">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Good Morning, Farmer!</h1>
            <p className="text-primary-foreground/80 text-lg">
              Here's what's happening with your crops today
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-primary-foreground/80 mb-1">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Today</span>
            </div>
            <p className="text-2xl font-semibold">
              {new Date().toLocaleDateString('en-IN', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-card hover:shadow-elevated transition-all duration-300 gradient-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <Card className="shadow-card gradient-card border-0">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-foreground">Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-colors">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.status === 'success' ? 'bg-success' : 'bg-primary'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground">{activity.action}</p>
                    <p className="text-sm text-primary font-medium">{activity.crop}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{activity.location}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{activity.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card className="shadow-card gradient-card border-0">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-foreground">Upcoming Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task, index) => (
                <div key={index} className="p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-foreground">{task.task}</p>
                    <Badge 
                      variant={task.priority === 'high' ? 'destructive' : 'secondary'}
                      className="text-xs"
                    >
                      {task.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-primary font-medium mb-1">{task.crop}</p>
                  <p className="text-xs text-muted-foreground">Due: {task.dueDate}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}