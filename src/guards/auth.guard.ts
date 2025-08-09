import { CanActivate, ExecutionContext, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    return request.session.userId;
  }
}

export const Guard = () => UseGuards(new AuthGuard());
