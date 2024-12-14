import { useLoaderData } from "@remix-run/react";
import { getTeams } from "../.server/groups";
import Team from "./components/Team";

export async function loader() {
  return await getTeams();
}

export default function Index() {
  const teams = useLoaderData<typeof loader>();
  return (
    <div className="grid grid-cols-4 gap-4">
      {teams.map((team) => (
        <Team class="basis-1/4" {...team}></Team>
      ))}
    </div>
  );
}
