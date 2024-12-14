import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../shared/interfaces/user.interface';

@Injectable({
    providedIn: 'root',
})
export class UserResolverService implements Resolve<User | null> {
    private userService = inject(UserService);
    async resolve(route: ActivatedRouteSnapshot): Promise<User | null> {
        const user = await this.userService.getSelf();
        return user;
    }
}
