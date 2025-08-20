# Data Persistence Implementation

This document outlines all data that is automatically stored and persisted in the Olive-DCB application.

## 📊 **Stored Data Types:**

### 1. **User Management**
- **registeredUsers**: User credentials and profiles (email, password, name, role, etc.)
- **signedInUsers**: Currently signed-in users with login/logout tracking
- **Location**: localStorage
- **Updates**: Registration, login, logout events

### 2. **Daily Tracker**
- **dailyTasks**: All created tasks with full details
- **Location**: localStorage
- **Updates**: Add, edit, delete tasks
- **Features**: Product type, issue type, team assignments, dates, priority

### 3. **Shift Handover**
- **currentShiftHandover**: Latest handover data
- **handoverHistory**: Complete history of all handovers
- **Location**: localStorage
- **Updates**: Save handover, view history
- **Features**: Shift times, handover notes, action points

### 4. **Leave Management**
- **leaveRequests**: All leave requests with status tracking
- **Location**: localStorage (AllUsersData.tsx)
- **Updates**: Request leave, approve/reject (admin)
- **Features**: Calendar selection, leave types, admin approval workflow

### 5. **Role & Permissions**
- **pagePermissions**: Role-based access control settings
- **Location**: localStorage
- **Updates**: Change role permissions, auto-save on modification
- **Features**: Admin role management, page access control

### 6. **Session Data**
- **userEmail**: Current logged-in user
- **lastLogoutTime**: Last logout timestamp
- **Location**: localStorage
- **Updates**: Login/logout events

## 🔄 **Auto-Save Features:**

- ✅ **Tasks**: Automatically saved when added/edited/deleted
- ✅ **Users**: Automatically saved on registration/login
- ✅ **Handovers**: Automatically saved and added to history
- ✅ **Permissions**: Automatically saved when changed
- ✅ **Leave Requests**: Automatically saved when submitted/processed

## 💾 **Persistence Guarantee:**

All data persists across:
- Page refreshes
- Browser restarts
- Session endings
- Navigation between pages

## 🔑 **Data Access:**

Data can be viewed in browser DevTools:
1. Open DevTools (F12)
2. Go to Application tab
3. Expand Local Storage
4. Select your domain
5. View all stored data keys

## 📈 **Data Growth:**

The application continues to accumulate data:
- User profiles grow with new registrations
- Task history builds up over time
- Handover history maintains complete records
- Leave request history preserves all requests
- Permission changes are tracked and stored

All data is maintained indefinitely unless manually cleared.
