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
    {
      name: "My Team 2",
      members: [
        {
          name: "John Doe",
          role: "Product Designer",
          active: true,
        },
        {
          name: "Mickeal Doe",
          role: "Product Designer",
          active: true,
        },
        {
          name: "Bob Doe",
          role: "Product Designer",
          active: true,
        },
      ],
      metadata: {
        departement: "Engineering",
      },
      subteams: [
        {
          name: "My Team 2.1",
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
          subteams: [
            {
              name: "My Team 2.1.1",
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
      ],
    },
    {
      name: "My Team 3",
      members: [
        {
          name: "John Doe",
          role: "Product Designer",
          active: true,
        },
      ],
      metadata: {
        departement: "Engineering",
      },
    },
    {
      name: "My Team 4",
      members: [
        {
          name: "John Doe",
          role: "Product Designer",
          active: true,
        },
      ],
      metadata: {
        departement: "Engineering",
      },
    },
    {
      name: "My Team 5",
      members: [
        {
          name: "John Doe",
          role: "Product Designer",
          active: true,
        },
      ],
      metadata: {
        departement: "Engineering",
      },
    },
  ];
}
