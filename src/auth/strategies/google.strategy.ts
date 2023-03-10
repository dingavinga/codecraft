import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: "",//process.env.GOOGLE_CLIENT_ID,
      clientSecret: "",//process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "",//process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
      scope: ['profile', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile, done: Function) {
    const { id, emails } = profile;
    const user = await this.findOrCreateUser({
      googleId: id,
      email: emails[0].value,
    });
    done(null, user);
  }

  
}