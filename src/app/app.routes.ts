import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './_helpers/auth.guard';

export const routes: Routes = [
    {
        path: '',
        title: 'V2X-Hub Main',
        component: AppComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        title: 'V2X-Hub Login',
        component: LoginComponent,
    }
];
