import {Title} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {NgModule, LOCALE_ID} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { GrowlModule } from 'primeng/growl';
import { JwtHelperService } from '@auth0/angular-jwt';


import {AuthService} from './../seguranca/auth.service';
import {ErrorHandlerService} from './error-handler.service';
import {UsuarioService} from '../usuarios/usuario.service';
import {NavbarComponent} from './navbar/navbar.component';
import {NaoAutorizadoComponent} from './nao-autorizado.component';
import {PaginaNaoEncontradaComponent} from './pagina-nao-encontrada.component';
import {ProvaApollusHttp} from '../seguranca/prova-apollus-http';

registerLocaleData(localePt);

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,

    GrowlModule,
    ConfirmDialogModule
  ],
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent

  ],
  exports: [
    NavbarComponent,
    GrowlModule,
    ConfirmDialogModule

  ],
  providers: [
    UsuarioService,
    ErrorHandlerService,
    AuthService,
    ProvaApollusHttp,

    ConfirmationService,
    JwtHelperService,
    MessageService,
    Title,
    {provide: LOCALE_ID, useValue: 'pt'}
  ]
})
export class CoreModule {
}

