"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  User,
  Shield,
  Bell,
  Download,
  Trash2,
  Eye,
  EyeOff,
  Key,
  Mail,
  Lock,
  AlertTriangle,
  Save,
  RefreshCw,
  Settings,
} from "lucide-react"
import { useWallet } from "@/contexts/wallet-context"

export default function SettingsPage() {
  const { walletData, disconnectWallet } = useWallet()
  const [isLoading, setIsLoading] = useState(false)
  const [showPrivateData, setShowPrivateData] = useState(false)

  // Settings state
  const [profileSettings, setProfileSettings] = useState({
    displayName: "DeFi Pioneer",
    bio: "Experienced DeFi user focused on yield optimization and risk management.",
    publicProfile: true,
    showBalance: false,
    showTransactions: false,
  })

  const [privacySettings, setPrivacySettings] = useState({
    dataCollection: true,
    analytics: true,
    marketing: false,
    thirdPartySharing: false,
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    transactionAlerts: true,
    priceAlerts: false,
    weeklyReports: true,
    securityAlerts: true,
  })

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    biometricAuth: false,
    sessionTimeout: "30",
    autoLogout: true,
  })

  const handleSaveSettings = async () => {
    setIsLoading(true)
    // Simulate saving settings
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
  }

  const handleExportData = () => {
    // Simulate data export
    console.log("Exporting user data...")
  }

  const handleDeleteAccount = () => {
    // Simulate account deletion
    console.log("Account deletion requested...")
    disconnectWallet()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Settings
              </h1>
              <p className="text-muted-foreground mt-1">Manage your account preferences and privacy settings</p>
            </div>
            <div className="flex items-center gap-4">
              {walletData?.isConnected && (
                <Badge className="bg-primary/10 text-primary border-primary/20">Connected: {walletData.address}</Badge>
              )}
              <Button
                onClick={handleSaveSettings}
                disabled={isLoading}
                className="bg-gradient-to-r from-primary to-secondary"
              >
                {isLoading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-[600px]">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
                <CardDescription>Manage your public profile and display preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input
                      id="displayName"
                      value={profileSettings.displayName}
                      onChange={(e) => setProfileSettings((prev) => ({ ...prev, displayName: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="walletAddress">Wallet Address</Label>
                    <Input
                      id="walletAddress"
                      value={walletData?.address || "Not connected"}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileSettings.bio}
                    onChange={(e) => setProfileSettings((prev) => ({ ...prev, bio: e.target.value }))}
                    placeholder="Tell others about your DeFi journey..."
                    className="min-h-[100px]"
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Visibility Settings</h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Public Profile</Label>
                      <p className="text-sm text-muted-foreground">Allow others to view your Yield Passport</p>
                    </div>
                    <Switch
                      checked={profileSettings.publicProfile}
                      onCheckedChange={(checked) => setProfileSettings((prev) => ({ ...prev, publicProfile: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Show Balance</Label>
                      <p className="text-sm text-muted-foreground">Display your portfolio balance publicly</p>
                    </div>
                    <Switch
                      checked={profileSettings.showBalance}
                      onCheckedChange={(checked) => setProfileSettings((prev) => ({ ...prev, showBalance: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Show Transactions</Label>
                      <p className="text-sm text-muted-foreground">Make your transaction history visible</p>
                    </div>
                    <Switch
                      checked={profileSettings.showTransactions}
                      onCheckedChange={(checked) =>
                        setProfileSettings((prev) => ({ ...prev, showTransactions: checked }))
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacy & Data
                </CardTitle>
                <CardDescription>Control how your data is collected and used</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Data Collection</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow HashFi to collect usage data for service improvement
                      </p>
                    </div>
                    <Switch
                      checked={privacySettings.dataCollection}
                      onCheckedChange={(checked) =>
                        setPrivacySettings((prev) => ({ ...prev, dataCollection: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Analytics</Label>
                      <p className="text-sm text-muted-foreground">Help us understand how you use HashFi</p>
                    </div>
                    <Switch
                      checked={privacySettings.analytics}
                      onCheckedChange={(checked) => setPrivacySettings((prev) => ({ ...prev, analytics: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Marketing Communications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive updates about new features and opportunities
                      </p>
                    </div>
                    <Switch
                      checked={privacySettings.marketing}
                      onCheckedChange={(checked) => setPrivacySettings((prev) => ({ ...prev, marketing: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Third-party Data Sharing</Label>
                      <p className="text-sm text-muted-foreground">Allow sharing anonymized data with partners</p>
                    </div>
                    <Switch
                      checked={privacySettings.thirdPartySharing}
                      onCheckedChange={(checked) =>
                        setPrivacySettings((prev) => ({ ...prev, thirdPartySharing: checked }))
                      }
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Data Management</h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>View Private Data</Label>
                      <p className="text-sm text-muted-foreground">See what data we have collected about you</p>
                    </div>
                    <Button variant="outline" onClick={() => setShowPrivateData(!showPrivateData)}>
                      {showPrivateData ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                      {showPrivateData ? "Hide" : "View"}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Export Data</Label>
                      <p className="text-sm text-muted-foreground">Download all your data in JSON format</p>
                    </div>
                    <Button variant="outline" onClick={handleExportData}>
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Choose how and when you want to be notified</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Delivery Methods</h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5 flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                    </div>
                    <Switch
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) =>
                        setNotificationSettings((prev) => ({ ...prev, emailNotifications: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive browser push notifications</p>
                    </div>
                    <Switch
                      checked={notificationSettings.pushNotifications}
                      onCheckedChange={(checked) =>
                        setNotificationSettings((prev) => ({ ...prev, pushNotifications: checked }))
                      }
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notification Types</h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Transaction Alerts</Label>
                      <p className="text-sm text-muted-foreground">Get notified about your transactions</p>
                    </div>
                    <Switch
                      checked={notificationSettings.transactionAlerts}
                      onCheckedChange={(checked) =>
                        setNotificationSettings((prev) => ({ ...prev, transactionAlerts: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Price Alerts</Label>
                      <p className="text-sm text-muted-foreground">Notifications for significant price changes</p>
                    </div>
                    <Switch
                      checked={notificationSettings.priceAlerts}
                      onCheckedChange={(checked) =>
                        setNotificationSettings((prev) => ({ ...prev, priceAlerts: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Weekly Reports</Label>
                      <p className="text-sm text-muted-foreground">Weekly summary of your DeFi activity</p>
                    </div>
                    <Switch
                      checked={notificationSettings.weeklyReports}
                      onCheckedChange={(checked) =>
                        setNotificationSettings((prev) => ({ ...prev, weeklyReports: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Security Alerts</Label>
                      <p className="text-sm text-muted-foreground">Important security and account notifications</p>
                    </div>
                    <Switch
                      checked={notificationSettings.securityAlerts}
                      onCheckedChange={(checked) =>
                        setNotificationSettings((prev) => ({ ...prev, securityAlerts: checked }))
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>Enhance your account security and access controls</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Authentication</h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5 flex items-center gap-2">
                      <Key className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                      </div>
                    </div>
                    <Switch
                      checked={securitySettings.twoFactorAuth}
                      onCheckedChange={(checked) =>
                        setSecuritySettings((prev) => ({ ...prev, twoFactorAuth: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Biometric Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Use fingerprint or face recognition when available
                      </p>
                    </div>
                    <Switch
                      checked={securitySettings.biometricAuth}
                      onCheckedChange={(checked) =>
                        setSecuritySettings((prev) => ({ ...prev, biometricAuth: checked }))
                      }
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Session Management</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                      <Select
                        value={securitySettings.sessionTimeout}
                        onValueChange={(value) => setSecuritySettings((prev) => ({ ...prev, sessionTimeout: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="120">2 hours</SelectItem>
                          <SelectItem value="never">Never</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auto Logout</Label>
                      <p className="text-sm text-muted-foreground">Automatically log out when session expires</p>
                    </div>
                    <Switch
                      checked={securitySettings.autoLogout}
                      onCheckedChange={(checked) => setSecuritySettings((prev) => ({ ...prev, autoLogout: checked }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Account Management
                </CardTitle>
                <CardDescription>Manage your account settings and data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Account Actions</h3>

                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="space-y-0.5">
                      <Label>Disconnect Wallet</Label>
                      <p className="text-sm text-muted-foreground">Disconnect your current wallet from HashFi</p>
                    </div>
                    <Button variant="outline" onClick={disconnectWallet}>
                      Disconnect
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="space-y-0.5">
                      <Label>Export Account Data</Label>
                      <p className="text-sm text-muted-foreground">Download all your HashFi data</p>
                    </div>
                    <Button variant="outline" onClick={handleExportData}>
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-destructive">Danger Zone</h3>

                  <div className="border border-destructive/20 rounded-lg p-4 bg-destructive/5">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <Label className="text-destructive">Delete Account</Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Permanently delete your HashFi account and all associated data. This action cannot be undone.
                        </p>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" className="mt-3">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Account
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your account and remove your
                                data from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={handleDeleteAccount}
                                className="bg-destructive hover:bg-destructive/90"
                              >
                                Delete Account
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
