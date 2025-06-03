import { useState } from "react";
import SidebarMenu from "../components/UserDashboard/SidebarMenu";
import ProfileView from "../components/UserDashboard/ProfileView";
import ProfileEdit from "../components/UserDashboard/ProfileEdit";
import TeamView from "../components/UserDashboard/TeamView";
import SettingsView from "../components/UserDashboard/SettingsView";

function UserDashboard() {
  const [activeSection, setActiveSection] = useState("profileView");

  const renderSection = () => {
    switch (activeSection) {
      case "profileView":
        return <ProfileView />;
      case "profileEdit":
        return <ProfileEdit />;
      case "teamView":
        return <TeamView />;
      case "settings":
        return <SettingsView />;
      default:
        return <ProfileView />;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Navigation */}
      <SidebarMenu onSectionChange={setActiveSection} activeSection={activeSection} />

      {/* Main Content Area */}
      <main className="flex-1 p-6 bg-gray-100">
        {renderSection()}
      </main>
    </div>
  );
}

export default UserDashboard;
