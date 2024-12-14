import { PLATFORM_ID, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';
import { isPlatformServer } from '@angular/common';
import { AuthService } from '../core/auth/auth.service';
import { UserService } from '../services/user.service';

export const JwtGuard: CanActivateFn = async () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const userService = inject(UserService);

    const token = authService.getToken();
    if (token) return true;
    return router.parseUrl('/login');
};
