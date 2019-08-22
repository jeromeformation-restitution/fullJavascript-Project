export class User {

  public id: string;
  public username: string;
  public email: string;
  public password: string;
  public createdAt: Date;
  public firstName: string;
  public profession: Array<string>;
  public lastName: string;
  public roles: Array<string>;
  public siret: number;
  public adresse: string;
  public ville: string;
  public imageName: string;
  public slug: string;

  constructor(id?: string, username?: string) {
    this.id = id;
    this.username = username;
  }
}
