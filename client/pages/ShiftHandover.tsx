import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ClipboardList, Save, User, Clock, MessageCircle, CheckSquare } from "lucide-react";
import { useState } from "react";

export default function ShiftHandover() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("handover");
  const [handoverData, setHandoverData] = useState({
    name: "",
    shiftFrom: "",
    shiftTo: "",
    handoverText: "",
    points: [""]
  });

  const handleInputChange = (field: string, value: string) => {
    setHandoverData(prev => ({ ...prev, [field]: value }));
  };

  const handlePointChange = (index: number, value: string) => {
    const newPoints = [...handoverData.points];
    newPoints[index] = value;
    setHandoverData(prev => ({ ...prev, points: newPoints }));
  };

  const addPoint = () => {
    setHandoverData(prev => ({ ...prev, points: [...prev.points, ""] }));
  };

  const removePoint = (index: number) => {
    const newPoints = handoverData.points.filter((_, i) => i !== index);
    setHandoverData(prev => ({ ...prev, points: newPoints }));
  };

  const saveHandover = () => {
    // Save handover data to localStorage
    const handoverWithTimestamp = {
      ...handoverData,
      savedAt: new Date().toISOString(),
      savedDate: new Date().toLocaleDateString(),
      savedTime: new Date().toLocaleTimeString()
    };

    localStorage.setItem("currentShiftHandover", JSON.stringify(handoverWithTimestamp));

    // Navigate back to dashboard
    navigate("/dashboard");
  };

  return (
    <div 
      className="min-h-screen" 
      style={{
        backgroundImage: "linear-gradient(-45deg, #FF6B6B, #4ECDC4, #45B7D1, #96CEB4, #FFEAA7, #DDA0DD, #98D8E8, #F7DC6F)",
        backgroundSize: "400% 400%",
        animation: "gradient 15s ease infinite",
      }}
    >
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/dashboard" className="flex items-center text-white hover:text-white/80 mr-6">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-white">Shift Hand Over</h1>
            </div>
            <div className="flex items-center">
              <ClipboardList className="h-6 w-6 text-white mr-2" />
              <span className="text-white">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 rounded-none">
                <TabsTrigger value="handover" className="flex items-center gap-2">
                  <ClipboardList className="h-4 w-4" />
                  HANDOVER
                </TabsTrigger>
                <TabsTrigger value="history" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  HISTORY
                </TabsTrigger>
              </TabsList>

              {/* HANDOVER Screen */}
              <TabsContent value="handover" className="p-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Shift Hand Over</h2>
                    <p className="text-gray-600">
                      Document important information for the next shift
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Personal Information */}
                    <div className="space-y-4 border-b pb-6">
                      <h3 className="text-lg font-medium flex items-center">
                        <User className="h-5 w-5 mr-2" />
                        Personal Information
                      </h3>
                      
                      <div className="space-y-2">
                        <Label>Your Name</Label>
                        <Input
                          placeholder="Enter your full name..."
                          value={handoverData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Shift Timing */}
                    <div className="space-y-4 border-b pb-6">
                      <h3 className="text-lg font-medium flex items-center">
                        <Clock className="h-5 w-5 mr-2" />
                        Shift Timing
                      </h3>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Shift From</Label>
                          <Input
                            type="time"
                            value={handoverData.shiftFrom}
                            onChange={(e) => handleInputChange("shiftFrom", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Shift To</Label>
                          <Input
                            type="time"
                            value={handoverData.shiftTo}
                            onChange={(e) => handleInputChange("shiftTo", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Handover Text */}
                    <div className="space-y-4 border-b pb-6">
                      <h3 className="text-lg font-medium flex items-center">
                        <MessageCircle className="h-5 w-5 mr-2" />
                        Handover Notes
                      </h3>
                      
                      <div className="space-y-2">
                        <Label>Detailed Notes</Label>
                        <Textarea
                          placeholder="Write detailed handover notes, current status, ongoing issues, etc..."
                          rows={6}
                          value={handoverData.handoverText}
                          onChange={(e) => handleInputChange("handoverText", e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Points for Next Shift */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium flex items-center">
                        <CheckSquare className="h-5 w-5 mr-2" />
                        Key Points for Next Shift
                      </h3>
                      
                      <div className="space-y-3">
                        {handoverData.points.map((point, index) => (
                          <div key={index} className="flex gap-2">
                            <div className="flex-1">
                              <Input
                                placeholder={`Point ${index + 1}...`}
                                value={point}
                                onChange={(e) => handlePointChange(index, e.target.value)}
                              />
                            </div>
                            {handoverData.points.length > 1 && (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => removePoint(index)}
                                className="text-red-600 hover:text-red-700"
                              >
                                Remove
                              </Button>
                            )}
                          </div>
                        ))}
                        
                        <Button
                          type="button"
                          variant="outline"
                          onClick={addPoint}
                          className="w-full"
                        >
                          Add Another Point
                        </Button>
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="pt-6">
                      <Button onClick={saveHandover} className="w-full" size="lg">
                        <Save className="h-4 w-4 mr-2" />
                        Save Shift Handover
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* HISTORY Screen */}
              <TabsContent value="history" className="p-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Handover History</h2>
                    <p className="text-gray-600">
                      View previous shift handovers and notes
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Sample History Items */}
                    <div className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium">John Smith</h4>
                          <p className="text-sm text-gray-600">6:00 AM - 2:00 PM</p>
                        </div>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          Yesterday
                        </span>
                      </div>
                      <div className="text-sm text-gray-700">
                        <p className="mb-2">
                          <strong>Notes:</strong> All systems running normally. NEFT-RTGS processing completed for the day.
                        </p>
                        <p><strong>Key Points:</strong></p>
                        <ul className="list-disc list-inside ml-2">
                          <li>UPI system maintenance scheduled for tonight</li>
                          <li>Monitor server performance closely</li>
                          <li>Follow up on pending ticket #12345</li>
                        </ul>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium">Sarah Johnson</h4>
                          <p className="text-sm text-gray-600">2:00 PM - 10:00 PM</p>
                        </div>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          2 Days Ago
                        </span>
                      </div>
                      <div className="text-sm text-gray-700">
                        <p className="mb-2">
                          <strong>Notes:</strong> Resolved critical issue with IMPS gateway. All services restored.
                        </p>
                        <p><strong>Key Points:</strong></p>
                        <ul className="list-disc list-inside ml-2">
                          <li>Gateway restart required at 8:00 PM</li>
                          <li>Check transaction volumes hourly</li>
                          <li>Escalate any timeout errors immediately</li>
                        </ul>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium">Mike Chen</h4>
                          <p className="text-sm text-gray-600">10:00 PM - 6:00 AM</p>
                        </div>
                        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                          3 Days Ago
                        </span>
                      </div>
                      <div className="text-sm text-gray-700">
                        <p className="mb-2">
                          <strong>Notes:</strong> Night shift completed successfully. Backup procedures executed.
                        </p>
                        <p><strong>Key Points:</strong></p>
                        <ul className="list-disc list-inside ml-2">
                          <li>Database backup completed at 2:00 AM</li>
                          <li>Security patches applied successfully</li>
                          <li>System reboot scheduled for weekend</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
