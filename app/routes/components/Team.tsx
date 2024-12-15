import { Card, CardBody, CardHeader, Divider, User } from "@nextui-org/react";
import { Team } from "~/.server/groups";

export default function Team({
  team,
  breadcrumbs,
}: {
  team: Team;
  breadcrumbs: string[];
}) {
  return (
    <Card className="">
      <CardBody>
        <CardHeader className="block pt-0">
          <small class="text-xs italic">{breadcrumbs.join(" - ")}</small>
          <br />
          <h3>{team.name}</h3>
        </CardHeader>
        <Divider />
        <p className="py-2">Departement: {team.metadata.departement}</p>
        <Divider />
        <p>Members:</p>

        <div className="p-3">
          {team.members.map((member, i) => (
            <div key={i}>
              <User
                avatarProps={{
                  src: `https://i.pravatar.cc/?u=${member.name.replace(
                    " ",
                    ""
                  )}@pravatar.com`,
                }}
                name={member.name}
                description={member.role}
              />
            </div>
          ))}
        </div>

        {team.subteams?.length >= 1 && (
          <>
            <Divider />
            <p className="py-2">Sub teams:</p>
            <div class="px-5">
              {team.subteams.map((subteam) => (
                <Team
                  key="{subteam.id}"
                  team={subteam}
                  breadcrumbs={[...breadcrumbs, team.name]}
                ></Team>
              ))}
            </div>
          </>
        )}
      </CardBody>
    </Card>
  );
}
