import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map, Observable, tap } from 'rxjs';
import { AUTH_SERVICE } from '../constants/services';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<{ headers: { authorization?: string }; user?: UserDto }>();
    const jwt = request.headers.authorization;
    if (!jwt) {
      return false;
    }
    return this.authClient
      .send<UserDto>('authenticate', { Authentication: jwt })
      .pipe(
        tap((user) => {
          request.user = user;
        }),
        map(() => true),
      );
  }
}
