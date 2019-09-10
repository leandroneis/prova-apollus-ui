import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../shared/shared.module';
import { UsuariosPesquisaComponent } from './usuarios-pesquisa/usuarios-pesquisa.component';
import { UsuarioCadastroComponent } from './usuarios-cadastro/usuario-cadastro.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import {TableModule} from 'primeng/table';
import {
  ButtonModule,
  InputTextModule,
  PasswordModule,
  RadioButtonModule,
  TabViewModule,
  TooltipModule
} from 'primeng/primeng';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    TableModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    TooltipModule,
    RadioButtonModule,
    SharedModule,
    UsuariosRoutingModule,
    TabViewModule
  ],
  declarations: [
    UsuarioCadastroComponent,
    UsuariosPesquisaComponent
  ],
  exports: []
})
export class UsuariosModule { }
