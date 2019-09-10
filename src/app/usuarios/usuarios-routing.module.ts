import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';

import {AuthGuard} from './../seguranca/auth.guard';
import {UsuarioCadastroComponent} from './usuarios-cadastro/usuario-cadastro.component';
import {UsuariosPesquisaComponent} from './usuarios-pesquisa/usuarios-pesquisa.component';

const routes: Routes = [
    {
        path: '',
        component: UsuariosPesquisaComponent,
        canActivate: [AuthGuard],
        data: {roles: ['ROLE_ADMIN', 'ROLE_USER']}
    },
    {
        path: 'novo',
        component: UsuarioCadastroComponent,
        canActivate: [AuthGuard],
        data: {roles: ['ROLE_ADMIN']}
    },
    {
        path: ':codigo',
        component: UsuarioCadastroComponent,
        canActivate: [AuthGuard],
        data: {roles: ['ROLE_ADMIN', 'ROLE_USER']}
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class UsuariosRoutingModule {
}
