import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Settings as SettingsIcon, Moon, Sun, Palette, Monitor, Smartphone, Database, Download, Save } from "lucide-react";
import { AppSidebar } from '@/components/AppSidebar';

const Settings = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Settings saved",
        description: "Your application settings have been updated successfully.",
      });
    }, 1000);
  };

  return (
    <main className="flex-1 h-full w-full flex flex-col bg-[#343541] text-[#ECECF1]">
      <div className="w-full max-w-[960px] mx-auto px-4 py-6 flex flex-col">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-[#ECECF1]">
            Settings
          </h1>
          <p className="text-[#ECECF1]/75">
            Manage your application preferences
          </p>
        </header>

        <div className="rounded-lg border border-[#4E4F60]/30 bg-[#40414F]">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tight text-[#ECECF1]">
              General Settings
            </h3>
            <p className="text-sm text-[#ECECF1]/75">
              Configure your application settings
            </p>
          </div>

          <div className="p-6 pt-0">
            {/* Appearance Settings */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Appearance
                </CardTitle>
                <CardDescription>
                  Customize how the application looks and feels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="icon" className="border-primary">
                        <Sun className="h-4 w-4" />
                      </Button>
                      <span>Light</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="icon">
                        <Moon className="h-4 w-4" />
                      </Button>
                      <span>Dark</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="icon">
                        <Monitor className="h-4 w-4" />
                      </Button>
                      <span>System</span>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Primary Color</Label>
                    <div className="grid grid-cols-6 gap-2">
                      {['bg-blue-500', 'bg-green-500', 'bg-red-500', 'bg-purple-500', 'bg-orange-500', 'bg-pink-500'].map((color, index) => (
                        <div 
                          key={index} 
                          className={`${color} h-8 w-8 rounded-full cursor-pointer ${index === 0 ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Font Size</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue placeholder="Select font size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div>Reduce animations</div>
                    <div className="text-sm text-muted-foreground">
                      Minimize motion for accessibility purposes
                    </div>
                  </div>
                  <Switch id="reduce-animations" />
                </div>
              </CardContent>
            </Card>

            {/* Data Settings */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Data & Privacy
                </CardTitle>
                <CardDescription>
                  Control how your data is stored and used
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div>Save prompt history</div>
                    <div className="text-sm text-muted-foreground">
                      Store your previous prompts in local storage
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div>Usage analytics</div>
                    <div className="text-sm text-muted-foreground">
                      Allow anonymous usage data collection to improve our service
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div>Auto-save drafts</div>
                    <div className="text-sm text-muted-foreground">
                      Automatically save unsent prompts as drafts
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-6">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export All Data
                </Button>
                <Button variant="destructive">Clear All Data</Button>
              </CardFooter>
            </Card>

            {/* Device Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Device Settings
                </CardTitle>
                <CardDescription>
                  Optimize the application for your device
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div>Offline mode</div>
                    <div className="text-sm text-muted-foreground">
                      Enable basic functionality when you're offline
                    </div>
                  </div>
                  <Switch />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div>Power saving mode</div>
                    <div className="text-sm text-muted-foreground">
                      Reduce background processing to save battery
                    </div>
                  </div>
                  <Switch />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2 border-t pt-6">
                <Button variant="outline">Reset to Defaults</Button>
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? (
                    <>Saving...</>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Settings
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Settings;
