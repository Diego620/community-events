import type { Role } from "../types/event";
import { useState } from "react";
interface RoleSelectionProps {
    onContinue: (role: Role) => void;
    organiserId: string;
    onOrganiserChange: (id: string) => void;
}

function RoleSelection({
                           onContinue,
                           organiserId,
                           onOrganiserChange,
                       }: RoleSelectionProps) {
    const [role, setRole] = useState<Role>("visitor");

    return (
        <main>
            <h1>Community Events Platform</h1>
            <p>Choose a role to continue.</p>

            <div>
                <button onClick={() => setRole("visitor")}>
                    Visitor
                </button>

                <button onClick={() => setRole("organiser")}>
                    Event Organiser
                </button>

                <button onClick={() => setRole("admin")}>
                    Admin
                </button>
            </div>

            {role === "organiser" && (
                <div>
                    <label htmlFor="organiser">Select organiser:</label>
                    <select
                        id="organiser"
                        value={organiserId}
                        onChange={(event) => onOrganiserChange(event.target.value)}
                    >
                        <option value="organiser-1">Organiser 1</option>
                        <option value="organiser-2">Organiser 2</option>
                    </select>
                </div>
            )}

            <button onClick={() => onContinue(role)}>
                Continue
            </button>
        </main>
    );
}

export default RoleSelection;