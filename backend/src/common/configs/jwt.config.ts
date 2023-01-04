import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => {
  return {
    secret: process.env.JWT_ACCESS_TOKEN_SECRET,
    audience: process.env.JWT_TOKEN_AUDIENCE,
    issuer: process.env.JWT_TOKEN_ISSUER,
    accessTokenTtl: parseInt(
      process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME ?? '3600',
      10
    ),
    refreshSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
    refreshTokenTtl: parseInt(
      process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME ?? '86400',
      10
    ),
  };
});
