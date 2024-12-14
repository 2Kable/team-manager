import { Card, CardBody } from "@nextui-org/react";

export default function Team(team) {
  return (
    <Card className="">
      <CardBody>
        <p>{team.name}</p>
        <ul>
          {team.members.map((member) => (
            <li>{member.name}</li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
}
