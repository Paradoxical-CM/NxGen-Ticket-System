import { AuthGuard } from '@nestjs/passport';

export class UserValidation extends AuthGuard('local') {}
