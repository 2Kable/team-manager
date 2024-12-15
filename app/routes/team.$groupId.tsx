import { Form, redirect, useLoaderData } from "@remix-run/react";
import {
  getMember,
  getMembers,
  getTeam,
  getTeams,
  setParentTeam,
  setTeamMember,
} from "../.server/groups";
import { Button, Divider, Select, SelectItem } from "@nextui-org/react";
import { ActionFunctionArgs } from "@remix-run/node";

export async function loader({ params }) {
  return {
    team: await getTeam(params.groupId),
    // TODO return a simple list
    teamList: await getTeams(),
    members: await getMembers(),
  };
}

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  if (body.get("_action") == "setParent") {
    await setParentTeam(body.get("teamId"), body.get("parentTeam"));
  }
  if (body.get("_action") == "setMembers") {
    await setTeamMember(body.get("teamId"), body.getAll("memberIds"));
  }
  return redirect(`/`);
}

export default function Team() {
  const { members, team, teamList } = useLoaderData<typeof loader>();
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
          <Button type="submit" name="_action" value="setParent">
            Submit
          </Button>
        </Form>
      </div>
      <Divider />
      <div>
        Select Team Member
        <Form method="post">
          <Select
            className="max-w-xs"
            name="memberIds"
            selectionMode="multiple"
            label="Team Members"
            placeholder="Select members"
            defaultSelectedKeys={team.members.map((member) => member.id)}
          >
            {members.map((member) => (
              <SelectItem key={member.id}>{member.name}</SelectItem>
            ))}
          </Select>
          <input type="hidden" name="teamId" value={team.id} />
          <Button type="submit" name="_action" value="setMembers">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}
