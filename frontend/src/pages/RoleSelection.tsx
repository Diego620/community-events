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
        <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl flex-col">
                <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-xl bg-blue-600 text-sm font-bold text-white shadow-sm shadow-blue-600/20">
                        C
                    </span>
                    <span className="text-sm font-bold tracking-tight text-slate-950 sm:text-base">
                        Community Events Platform
                    </span>
                </div>

                <section className="my-auto py-16">
                    <div className="mx-auto max-w-2xl text-center">
                        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                            Welcome
                        </p>
                        <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                            Find your place in the community
                        </h1>
                        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600">
                            Discover local events, bring people together, or help keep the programme running.
                        </p>
                    </div>

                    <div className="mt-10 grid gap-4 md:grid-cols-3" role="radiogroup" aria-label="Choose your role">
                        {[
                            ["visitor", "Visitor", "Discover local events and register your interest."],
                            ["organiser", "Event Organiser", "Create events and manage your submissions."],
                            ["admin", "Administrator", "Review events and manage publishing decisions."],
                        ].map(([id, title, description]) => (
                            <button
                                key={id}
                                role="radio"
                                aria-checked={role === id}
                                onClick={() => setRole(id as Role)}
                                className={`min-h-44 rounded-2xl border bg-white p-6 text-left transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                    role === id
                                        ? "border-blue-600 ring-1 ring-blue-600 shadow-lg shadow-blue-100"
                                        : "border-slate-200 shadow-sm hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
                                }`}
                            >
                                <span className={`mb-8 grid size-5 place-items-center rounded-full border ${
                                    role === id ? "border-blue-600 bg-blue-600" : "border-slate-300 bg-white"
                                }`}>
                                    {role === id && <span className="size-1.5 rounded-full bg-white" />}
                                </span>
                                <span className="block text-base font-bold text-slate-950">{title}</span>
                                <span className="mt-2 block text-sm leading-5 text-slate-600">{description}</span>
                            </button>
                        ))}
                    </div>

            <div className="mx-auto mt-6 min-h-[4.5rem] max-w-xl">
            {role === "organiser" && (
                <div>
                    <label htmlFor="organiser" className="block text-sm font-semibold text-slate-700">Select organiser</label>
                    <select
                        id="organiser"
                        value={organiserId}
                        onChange={(event) => onOrganiserChange(event.target.value)}
                        className="mt-2 h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    >
                        <option value="organiser-1">Organiser 1</option>
                        <option value="organiser-2">Organiser 2</option>
                    </select>
                </div>
            )}
            </div>

                    <button
                        onClick={() => onContinue(role)}
                        className="mx-auto mt-6 flex min-h-11 items-center justify-center rounded-xl bg-blue-600 px-6 text-sm font-bold text-white shadow-sm shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Continue <span aria-hidden="true" className="ml-2">→</span>
                    </button>
                </section>
                <p className="text-center text-xs text-slate-400">A shared space for local events and activities</p>
            </div>
        </main>
    );
}

export default RoleSelection;