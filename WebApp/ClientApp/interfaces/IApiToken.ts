// Describes an API token used in rendering
export interface IApiToken {
    token: string;
    id: string;
    name: string;
    email: string;
    expiration: string;
    exp: number;
}