export interface Team {
  name: string;
  members: Member[];
  metadata: {
    departement: string;
  };
  subteams?: Team[];
}

export interface Member {
  name: string;
  role: string;
  active: boolean;
}

export function getTeams(): Team[] {
  return [
    {
      name: "My Team 1",
      members: [
        {
          name: "John Doe",
          role: "Product Designer",
          active: true,
        },
        {
          name: "Jane Doe",
          role: "Product Designer",
          active: true,
        },
      ],
      metadata: {
        departement: "Engineering",
      },
      subteams: [
        {
          name: "My Team 1.1",
          metadata: {
            departement: "Engineering",
          },
          members: [
            {
              name: "John Doe",
              role: "Product Designer",
              active: true,
            },
          ],
        },
      ],
    },
  ];
}
