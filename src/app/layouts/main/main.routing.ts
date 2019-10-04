import { Routes } from '@angular/router';

import {PrivacyComponent} from '../../pages/privacy/privacy.component';
import {LoginComponent} from '../../pages/login/login.component';

export const MainRoutes: Routes = [
    { path: 'login',      component: LoginComponent },
    { path: 'privacy',      component: PrivacyComponent },
];
