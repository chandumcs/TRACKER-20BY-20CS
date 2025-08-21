import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Database,
  HardDrive,
  RefreshCw,
  Download,
  Upload,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Play,
} from "lucide-react";
import { useState, useEffect } from "react";
import { DataMigration } from "@/utils/dataMigration";

export default function DataMigrationPage() {
  const [migrationStatus, setMigrationStatus] = useState({
    localStorageHasData: false,
    databaseAvailable: false,
    recommendMigration: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isMigrating, setIsMigrating] = useState(false);
  const [migrationLog, setMigrationLog] = useState<string[]>([]);
  const [migrationComplete, setMigrationComplete] = useState(false);
  const [backup, setBackup] = useState<string>("");

  useEffect(() => {
    checkMigrationStatus();
  }, []);

  const checkMigrationStatus = async () => {
    setIsLoading(true);
    try {
      const status = await DataMigration.getMigrationStatus();
      setMigrationStatus(status);
    } catch (error) {
      console.error("Error checking migration status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const createBackup = () => {
    const backupData = DataMigration.backupLocalStorageData();
    setBackup(backupData);

    // Download backup file
    const blob = new Blob([backupData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `localStorage-backup-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert("Backup created and downloaded successfully!");
  };

  const runMigration = async () => {
    if (!migrationStatus.recommendMigration) {
      alert("Migration conditions not met. Please check status above.");
      return;
    }

    if (
      !confirm(
        "Are you sure you want to start the migration? This will move all localStorage data to the Oracle database.",
      )
    ) {
      return;
    }

    setIsMigrating(true);
    setMigrationLog([]);
    setMigrationComplete(false);

    try {
      const result = await DataMigration.migrateAllData();
      setMigrationLog(result.log);
      setMigrationComplete(result.success);

      if (result.success) {
        alert(
          "Migration completed successfully! You can now use the application with Oracle database.",
        );

        // Optionally clear localStorage after successful migration
        if (
          confirm(
            "Migration successful! Would you like to clear the old localStorage data?",
          )
        ) {
          DataMigration.clearLocalStorageData();
          await checkMigrationStatus(); // Refresh status
        }
      } else {
        alert("Migration failed. Please check the logs and try again.");
      }
    } catch (error) {
      console.error("Migration error:", error);
      setMigrationLog((prev) => [
        ...prev,
        `❌ Migration error: ${error.message}`,
      ]);
      alert("Migration failed due to an error. Please check the logs.");
    } finally {
      setIsMigrating(false);
    }
  };

  const getStatusIcon = (available: boolean) => {
    return available ? (
      <CheckCircle className="h-5 w-5 text-green-600" />
    ) : (
      <XCircle className="h-5 w-5 text-red-600" />
    );
  };

  const getStatusBadge = (available: boolean, label: string) => {
    return available ? (
      <Badge className="bg-green-100 text-green-800">
        <CheckCircle className="h-3 w-3 mr-1" />
        {label}
      </Badge>
    ) : (
      <Badge variant="secondary" className="bg-red-100 text-red-800">
        <XCircle className="h-3 w-3 mr-1" />
        Not {label}
      </Badge>
    );
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage:
          "linear-gradient(-45deg, #FF6B6B, #4ECDC4, #45B7D1, #96CEB4, #FFEAA7, #DDA0DD, #98D8E8, #F7DC6F)",
        backgroundSize: "400% 400%",
        animation: "gradient 15s ease infinite",
      }}
    >
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link
                to="/dashboard"
                className="flex items-center text-white hover:text-white/80 mr-6"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-white">Data Migration</h1>
            </div>
            <div className="flex items-center">
              <Database className="h-6 w-6 text-white mr-2" />
              <span className="text-white">LocalStorage → Oracle DB</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Status Overview */}
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2" />
                Migration Status Overview
              </CardTitle>
              <CardDescription>
                Check the current status of your data and database connectivity
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">
                  <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2 text-blue-600" />
                  <p>Checking migration status...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <HardDrive className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">LocalStorage Data</span>
                      </div>
                      {getStatusBadge(
                        migrationStatus.localStorageHasData,
                        "Available",
                      )}
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Database className="h-5 w-5 text-green-600" />
                        <span className="font-medium">Oracle Database</span>
                      </div>
                      {getStatusBadge(
                        migrationStatus.databaseAvailable,
                        "Connected",
                      )}
                    </div>
                  </div>

                  {/* Migration Recommendation */}
                  <Alert
                    className={
                      migrationStatus.recommendMigration
                        ? "border-green-500"
                        : "border-yellow-500"
                    }
                  >
                    {migrationStatus.recommendMigration ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <AlertTriangle className="h-4 w-4" />
                    )}
                    <AlertDescription>
                      {migrationStatus.recommendMigration
                        ? "✅ Migration is recommended! Both localStorage data and Oracle database are available."
                        : migrationStatus.localStorageHasData &&
                            !migrationStatus.databaseAvailable
                          ? "⚠️ LocalStorage data found but Oracle database is not available. Please check database connection."
                          : !migrationStatus.localStorageHasData &&
                              migrationStatus.databaseAvailable
                            ? "ℹ️ Oracle database is available but no localStorage data found to migrate."
                            : "❌ No migration needed. No localStorage data found and database is not available."}
                    </AlertDescription>
                  </Alert>

                  <div className="flex gap-3">
                    <Button onClick={checkMigrationStatus} variant="outline">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh Status
                    </Button>
                    <Button onClick={createBackup} variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Create Backup
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Migration Action */}
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Play className="h-5 w-5 mr-2" />
                Run Migration
              </CardTitle>
              <CardDescription>
                Migrate your localStorage data to Oracle database
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">
                    Migration Process:
                  </h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>1. Check database connectivity</li>
                    <li>2. Migrate user accounts from localStorage</li>
                    <li>3. Migrate task data from localStorage</li>
                    <li>4. Verify migration success</li>
                    <li>5. Optionally clear localStorage data</li>
                  </ul>
                </div>

                <Button
                  onClick={runMigration}
                  disabled={!migrationStatus.recommendMigration || isMigrating}
                  className="w-full"
                  size="lg"
                >
                  {isMigrating ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Running Migration...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Start Migration
                    </>
                  )}
                </Button>

                {!migrationStatus.recommendMigration && (
                  <p className="text-sm text-gray-600 text-center">
                    Migration is disabled. Please ensure both localStorage data
                    and Oracle database are available.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Migration Log */}
          {migrationLog.length > 0 && (
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <RefreshCw className="h-5 w-5 mr-2" />
                  Migration Log
                  {migrationComplete && (
                    <Badge className="ml-2 bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Completed
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  Real-time log of the migration process
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={migrationLog.join("\n")}
                  readOnly
                  className="min-h-[300px] font-mono text-sm"
                  placeholder="Migration log will appear here..."
                />
              </CardContent>
            </Card>
          )}

          {/* Backup Data */}
          {backup && (
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Download className="h-5 w-5 mr-2" />
                  Backup Data
                </CardTitle>
                <CardDescription>
                  Your localStorage backup (automatically downloaded)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={backup}
                  readOnly
                  className="min-h-[200px] font-mono text-xs"
                  placeholder="Backup data will appear here..."
                />
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
