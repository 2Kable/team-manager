import { Form, redirect, useLoaderData } from "@remix-run/react";
import { getTeam, getTeams, setParentTeam } from "../.server/groups";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { ActionFunctionArgs } from "@remix-run/node";

export async function loader({ params }) {
  return {
    team: await getTeam(params.groupId),
    // TODO return a simple list
    teamList: await getTeams(),
  };
}

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  await setParentTeam(body.get("teamId"), body.get("parentTeam"));
  return redirect(`/`);
}

export default function Team() {
  const { team, teamList } = useLoaderData<typeof loader>();
  return (
    <div className="flex items-start p-10 gap-4 flex-wrap">
      <pre>{JSON.stringify(team, null, 2)}</pre>;
      <div>
        Change Parent Team
        <Form method="post">
          <Select
            className="max-w-xs"
            items={teamList.map((teamItem) => ({
              value: teamItem.id,
              label: teamItem.name,
            }))}
            name="parentTeam"
            label="Parent Team"
            placeholder="Select a parent"
          >
            {(teamItem) => (
              <SelectItem key={teamItem.value}>{teamItem.label}</SelectItem>
            )}
          </Select>
          <input type="hidden" name="teamId" value={team.id} />
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </div>
  );
}
