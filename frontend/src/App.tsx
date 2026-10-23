import { useState } from "react";
import type { Role } from "./types/event";
import RoleSelection from "./pages/RoleSelection";
import VisitorDashboard from "./components/VisitorDashboard";
import OrganiserDashboard from "./components/OrganiserDashboard";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [organiserId, setOrganiserId] = useState("organiser-1");

  function switchRole() {
    setSelectedRole(null);
    setOrganiserId("organiser-1");
  }

  return (
      <div className="min-h-screen bg-slate-50 text-slate-950">
        {selectedRole === null ? (
            <RoleSelection
                onContinue={setSelectedRole}
                organiserId={organiserId}
                onOrganiserChange={setOrganiserId}
            />
        ) : (
            <>
             <header className="border-b border-slate-200 bg-white">
               <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
                 <div className="flex min-w-0 items-center gap-3">
                   <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-blue-600 text-sm font-bold text-white shadow-sm shadow-blue-600/20">
                     C
                   </span>
                   <div className="min-w-0">
                     <p className="truncate text-sm font-bold tracking-tight text-slate-950 sm:text-base">
                       Community Events Platform
                     </p>
                     <p className="text-xs font-medium capitalize text-slate-500">
                       {selectedRole} workspace
                     </p>
                   </div>
                 </div>
                 <button
                   onClick={switchRole}
                   className="shrink-0 rounded-lg px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                 >
                   Switch role
                 </button>
               </div>
             </header>

              <main>
                {selectedRole === "visitor" && <VisitorDashboard />}
                {selectedRole === "organiser" && (<OrganiserDashboard organiserId={organiserId} />)}
                {selectedRole === "admin" && <AdminDashboard />}
              </main>
            </>
        )}
      </div>
  );
}

export default App;