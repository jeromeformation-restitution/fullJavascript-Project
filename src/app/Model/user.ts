export class User {

  public id: string;
  public username: string;
  public email: string;
  public password: string;
  public CreatedAt: Date;
  public firstName: string;
  public lastName: string;
  public role: Array<string>;
  public siret: number;
  public adresse: string;
  public ville: string;

  constructor(id?: string, username?: string) {
    this.id = id;
    this.username = username;
    this.siret = 0;
  }

}
