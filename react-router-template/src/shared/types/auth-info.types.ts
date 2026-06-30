import type { ApiRoles } from "./user.types";

export interface AuthSession {
  roles: Roles;
  accountId: string;
  authInfo: AuthInfo;
  identity: Identity;
}

type Roles = Record<ApiRoles, boolean>;

interface AuthInfo {
  userId: string;
  accountId: string;
  language: string;
  /** Comma-separated list of {@link ApiRoles} */
  roles: string;
  userName: string;
}

interface Identity {
  securityToken: SecurityToken;
  authenticationType: string;
  isAuthenticated: boolean;
  claims: Claim[];
  name: string;
  nameClaimType: string;
  roleClaimType: string;
}

interface SecurityToken {
  authenticationTag: string;
  ciphertext: string;
  encodedHeader: string;
  encryptedKey: string;
  encodedPayload: string;
  encodedSignature: string;
  encodedToken: string;
  initializationVector: string;
  isSigned: boolean;
  signingKey: SigningKey;
  claims: Claim[];
  alg: string;
  cty: string;
  enc: string;
  kid: string;
  typ: string;
  x5t: string;
  zip: string;
  actor: string;
  audiences: string[];
  azp: string;
  issuedAt: string;
  issuer: string;
  id: string;
  subject: string;
  validTo: string;
}

interface SigningKey {
  keySize: number;
  x5t: string;
  publicKey: PublicKey;
  privateKeyStatus: string;
  certificate: Certificate;
  keyId: string;
  cryptoProviderFactory: CryptoProviderFactory;
}

interface PublicKey {
  legalKeySizes: LegalKeySize[];
  keyExchangeAlgorithm: string;
  signatureAlgorithm: string;
}

interface LegalKeySize {
  minSize: number;
  maxSize: number;
  skipSize: number;
}

interface Certificate {
  extensions: unknown[];
  friendlyName: string;
  issuerName: X509Name;
  notAfter: string;
  notBefore: string;
  publicKey: CertificatePublicKey;
  rawData: string;
  rawDataMemory: { length: number };
  serialNumber: string;
  signatureAlgorithm: Oid;
  subjectName: X509Name;
  thumbprint: string;
  version: number;
  handle: { value: number };
  issuer: string;
  subject: string;
  serialNumberBytes: { length: number };
}

interface Oid {
  value?: string;
  friendlyName?: string;
}

interface EncodedValue {
  oid: Oid;
  rawData: string;
}

interface CertificatePublicKey {
  encodedKeyValue: EncodedValue;
  encodedParameters: EncodedValue;
  key: PublicKey;
  oid: Oid;
}

interface X509Name {
  name: string;
  oid: Oid;
  rawData: string;
}

interface CryptoProviderFactory {
  cryptoProviderCache: Record<string, unknown>;
  signatureProviderObjectPoolCacheSize: number;
}

interface Claim {
  issuer: string;
  originalIssuer: string;
  properties: {
    [key: string]: string | undefined;
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claimproperties/ShortTypeName'?: string;
  };
  type: string;
  value: string;
  valueType: string;
}
