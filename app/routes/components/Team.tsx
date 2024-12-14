import { Card, CardBody, CardHeader, Divider, User } from "@nextui-org/react";

export default function Team(team) {
  return (
    <Card className="">
      <CardBody>
        <CardHeader>
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
            {team.subteams.map((subteam, i) => (
              <Team key="{i}" {...subteam}></Team>
            ))}
          </>
        )}
      </CardBody>
    </Card>
  );
}
