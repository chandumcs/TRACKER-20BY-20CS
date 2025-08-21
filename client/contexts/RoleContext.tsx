import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define role types and their permissions
export type Role =
  | "Admin"
  | "Production Support"
  | "UAT Support"
  | "Developer"
  | "Manager";

export interface UserRole {
  userId: string;
  email: string;
  name: string;
  role: Role;
}

export interface RolePermissions {
  canAccessDashboard: boolean;
  canAccessDailyTracker: boolean;
  canAccessShiftHandover: boolean;
  canAccessAllUsersData: boolean;
  canAccessDataMigration: boolean;
  canAccessOthers: boolean;
  canManageUsers: boolean;
  readOnly?: boolean;
}

interface RoleContextType {
  currentUser: UserRole | null;
  permissions: RolePermissions;
  setUserRole: (user: UserRole) => void;
  hasPermission: (page: string) => boolean;
  isReadOnly: () => boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

// Define permissions for each role
const getRolePermissions = (role: Role): RolePermissions => {
  switch (role) {
    case "Admin":
      return {
        canAccessDashboard: true,
        canAccessDailyTracker: true,
        canAccessShiftHandover: true,
        canAccessAllUsersData: true,
        canAccessOthers: true,
        canManageUsers: true,
        readOnly: false,
      };
    case "Manager":
      return {
        canAccessDashboard: true,
        canAccessDailyTracker: true,
        canAccessShiftHandover: true,
        canAccessAllUsersData: true,
        canAccessOthers: true,
        canManageUsers: false,
        readOnly: false,
      };
    case "Production Support":
      return {
        canAccessDashboard: true,
        canAccessDailyTracker: true,
        canAccessShiftHandover: true,
        canAccessAllUsersData: false,
        canAccessOthers: false,
        canManageUsers: false,
        readOnly: false,
      };
    case "UAT Support":
      return {
        canAccessDashboard: true,
        canAccessDailyTracker: true,
        canAccessShiftHandover: false,
        canAccessAllUsersData: false,
        canAccessOthers: false,
        canManageUsers: false,
        readOnly: false,
      };
    case "Developer":
      return {
        canAccessDashboard: true,
        canAccessDailyTracker: true,
        canAccessShiftHandover: false,
        canAccessAllUsersData: false,
        canAccessOthers: false,
        canManageUsers: false,
        readOnly: false,
      };
    default:
      return {
        canAccessDashboard: false,
        canAccessDailyTracker: false,
        canAccessShiftHandover: false,
        canAccessAllUsersData: false,
        canAccessOthers: false,
        canManageUsers: false,
        readOnly: true,
      };
  }
};

export function RoleProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<UserRole | null>(null);

  useEffect(() => {
    // Clear old cached data and set correct user info
    const defaultUser: UserRole = {
      userId: "1",
      email: localStorage.getItem("userEmail") || "chandu@olivecrypto.com",
      name: "Chandu Mcs",
      role: "Admin",
    };
    setCurrentUser(defaultUser);
    localStorage.setItem("currentUserRole", JSON.stringify(defaultUser));
  }, []);

  const setUserRole = (user: UserRole) => {
    setCurrentUser(user);
    localStorage.setItem("currentUserRole", JSON.stringify(user));
  };

  const permissions = currentUser
    ? getRolePermissions(currentUser.role)
    : getRolePermissions("Viewer");

  const hasPermission = (page: string): boolean => {
    switch (page.toLowerCase()) {
      case "dashboard":
        return permissions.canAccessDashboard;
      case "daily-tracker":
        return permissions.canAccessDailyTracker;
      case "shift-handover":
        return permissions.canAccessShiftHandover;
      case "all-users-data":
        return permissions.canAccessAllUsersData;
      case "others":
        return permissions.canAccessOthers;
      default:
        return false;
    }
  };

  const isReadOnly = (): boolean => {
    return permissions.readOnly || false;
  };

  return (
    <RoleContext.Provider
      value={{
        currentUser,
        permissions,
        setUserRole,
        hasPermission,
        isReadOnly,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
}
