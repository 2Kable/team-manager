import { useLoaderData } from "@remix-run/react";
import { getTeams } from "../.server/groups";
import Team from "./components/Team";

export async function loader() {
  return await getTeams();
}

export default function Index() {
  const teams = useLoaderData<typeof loader>();
  return (
    <div className="flex items-start p-10 gap-4 flex-wrap">
      {teams.map((team) => (
        <div className="shrink-0">
          <Team key={team.id} {...team} />
        </div>
      ))}
    </div>
  );
}
