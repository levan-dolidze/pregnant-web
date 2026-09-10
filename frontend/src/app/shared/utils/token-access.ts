export class TokenModel  {
  nbf: number;
  exp: number;
  iss: string;
  aud: string;
  client_id: string;
  m_id: string;
  sub: string;
  auth_time: number;
  idp: string;
  name: string;
  email: string;
  role: string[];
  jti: string;
  scope: string[];
  amr: string[];
}