import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, FormControl} from '@angular/forms';

import {MessageService} from 'primeng/components/common/messageservice';

import {ErrorHandlerService} from './../../core/error-handler.service';
import {UsuarioService} from '../usuario.service';
import {Usuario} from './../../core/model';


@Component({
    selector: 'app-usuario-cadastro',
    templateUrl: './usuario-cadastro.component.html',
    styleUrls: ['./usuario-cadastro.component.css']
})
export class UsuarioCadastroComponent implements OnInit {

    formulario: FormGroup;
    usuario = new Usuario();
    pt: any;

    constructor(
        private usuarioService: UsuarioService,
        private messageService: MessageService,
        private errorHandler: ErrorHandlerService,
        private route: ActivatedRoute,
        private router: Router,
        private title: Title,
        private formBuilder: FormBuilder
    ) {
    }

    ngOnInit() {
        this.configurarFormulario();
        const codigoUsuario = this.route.snapshot.params['codigo'];
        this.title.setTitle('Novo Usuário');
        if (codigoUsuario) {
            this.carregarUsuario(codigoUsuario);
        }
    }

    configurarFormulario() {
        this.formulario = this.formBuilder.group({
            codigo: [],
            nome: [null, [this.validarObrigatoriedade, this.validarTamanhoMinimo(5)]],
            email: [null, this.validaEmail],
            senha: [null, [this.validarObrigatoriedade, this.validarTamanhoMinimo(5)]],
            perfil: [null]

        });
    }


    validaEmail(input: FormControl) {
        const emailRegEx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        if (input.value) {
            if (input.value.search(emailRegEx) === 0) {
                return null;
            } else {
                return {email: true};
            }
        }
        return null;
    }

    validarObrigatoriedade(input: FormControl) {
        return (input.value ? null : {obrigatoriedade: true});
    }

    validarTamanhoMinimo(valor: number) {
        return (input: FormControl) => {
            return (!input.value || input.value.length >= valor ? null : {tamanhoMinimo: {tamanho: valor}})
        }
    }

    get editando() {
        return Boolean(this.formulario.get('codigo').value);
    }

    carregarUsuario(codigo: number) {
        this.usuarioService.buscarPorCodigo(codigo)
            .then(usuario => {
                this.formulario.patchValue(usuario);
                this.atualizarTituloEdicao();
            })
            .catch(erro => this.errorHandler.handle(erro));
    }

    salvar() {
        if (this.editando) {
            this.atualizarUsuario();
        } else {
            this.adicionarUsuario();
        }
    }

    adicionarUsuario() {
        this.usuarioService.adicionar(this.formulario.value)
            .then(usuarioAdicionado => {
                this.messageService.add({severity: 'success', detail: 'Usuário adicionado com sucesso!'});
                this.router.navigate(['/usuarios', usuarioAdicionado.codigo]);
            })
            .catch(erro => this.errorHandler.handle(erro));
    }

    atualizarUsuario() {
        this.usuarioService.atualizar(this.formulario.value)
            .then(usuario => {
                this.formulario.patchValue(usuario);

                this.messageService.add({severity: 'success', detail: 'Usuário alterado com sucesso!'});
                this.atualizarTituloEdicao();
            })
            .catch(erro => this.errorHandler.handle(erro));
    }

    nova() {
        this.formulario.reset();

        setTimeout(function () {
            this.usuario = new Usuario();
        }.bind(this), 1);

        this.router.navigate(['/usuarios/novo']);
    }

    atualizarTituloEdicao() {
        this.title.setTitle(`Edição de Usuário: ${this.formulario.get('nome').value}`);
    }


}
