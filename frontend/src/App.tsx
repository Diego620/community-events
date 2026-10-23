import { useState } from "react";
import type { Role } from "./types/event";
import RoleSelection from "./pages/RoleSelection";
import VisitorDashboard from "./components/VisitorDashboard";

function App() {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [organiserId, setOrganiserId] = useState("organiser-1");

  function switchRole() {
    setSelectedRole(null);
    setOrganiserId("organiser-1");
  }

  return (
      <div>
        {selectedRole === null ? (
            <RoleSelection
                onContinue={setSelectedRole}
                organiserId={organiserId}
                onOrganiserChange={setOrganiserId}
            />
        ) : (
            <>
              <header>
                <span>Community Events Platform</span>
                <span>
              Current role: {selectedRole}
            </span>
                <button onClick={switchRole}>Switch role</button>
              </header>

              <main>
                {selectedRole === "visitor" && <VisitorDashboard />}
                {selectedRole === "organiser" && (
                    <h1>Organiser Dashboard</h1>
                )}
                {selectedRole === "admin" && <h1>Admin Dashboard</h1>}
              </main>
            </>
        )}
      </div>
  );
}

export default App;