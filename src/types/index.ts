export interface ITeam {
    id: string;
    name: string;
}

export interface ITeamOverview {
    id: string;
    name: string;
    teamLeadId: string;
    teamMemberIds: string[];
}

export interface IUserData {
    id: string;
    firstName: string;
    lastName: string;
    displayName: string;
    location: string;
    avatar: string;
}

export interface IListItemColumn {
    key: string;
    value: string;
}

export interface IListItem {
    id: string;
    url?: string;
    columns: Array<IListItemColumn>;
    navigationProps?: IUserData | ITeam;
}
