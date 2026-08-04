import { Injectable, CanActivate, ExecutionContext, Inject } from "@nestjs/common";
import {Observable} from 'rxjs'
import { AUTH_SERVICE } from "../constants/services";
import {ClientProxy} from '@nestjs/microservices'

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
const jwt = context.switchToHttp().getRequest().headers.authorization;
if(!jwt)
{
 return false
}
return this.authClient.send('authenticate', { authentication:jwt }).pipe(
  tap({()=>{
    context.switchToHttp(.getRequest().user = res; 
    )
  }}),
  map(()=>true)
);
  }
}

