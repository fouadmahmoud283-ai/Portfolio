/**
 * Verifies that the incoming request carries a valid admin bearer token.
 *
 * The token is compared against `process.env.ADMIN_TOKEN` using a
 * constant-time comparison to mitigate timing attacks. If the env var is
 * unset or empty, access is denied by default.
 */
export function verifyAdminToken(request: Request): boolean {
  const adminToken = process.env.ADMIN_TOKEN;

  // Deny by default when no admin token is configured.
  if (!adminToken) {
    return false;
  }

  const authHeader = request.headers.get('Authorization');
  if (!authHeader) {
    return false;
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return false;
  }

  const token = parts[1];
  if (!token) {
    return false;
  }

  // Constant-time comparison to mitigate timing attacks.
  if (token.length !== adminToken.length) {
    return false;
  }

  let diff = 0;
  for (let i = 0; i < token.length; i++) {
    diff |= token.charCodeAt(i) ^ adminToken.charCodeAt(i);
  }

  return diff === 0;
}

