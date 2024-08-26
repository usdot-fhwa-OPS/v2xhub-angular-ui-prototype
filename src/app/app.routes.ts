import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './_helpers/auth.guard';
import { PluginsComponent } from './components/plugins/plugins.component';
import { PluginDisplayPageComponent } from './components/plugin-display-page/plugin-display-page.component';

export const routes: Routes = [
    {
        path: '',
        title: 'V2X-Hub Main',
        component: PluginsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'plugin/:pluginName',
        title: ':pluginName',
        component: PluginDisplayPageComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        title: 'V2X-Hub Login',
        component: LoginComponent,
    }
];
