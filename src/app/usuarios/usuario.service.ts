import {HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Usuario} from './../core/model';
import {ProvaApollusHttp} from '../seguranca/prova-apollus-http';
import {environment} from '../../environments/environment';

export class UsuarioFiltro {
    nome: string;
    email: string;
    pagina = 0;
    itensPorPagina = 5;
}

@Injectable()
export class UsuarioService {

    usuariosUrl: string;

    constructor(private http: ProvaApollusHttp) {
        this.usuariosUrl = `${environment.apiUrl}/usuarios`;
    }

    pesquisar(filtro: UsuarioFiltro): Promise<any> {
        let params = new HttpParams({
            fromObject: {
                page: filtro.pagina.toString(),
                size: filtro.itensPorPagina.toString()
            }
        });


        if (filtro.nome) {
            params = params.append('nome', filtro.nome);
        }
        if (filtro.email) {
            params = params.append('email', filtro.email);
        }

        return this.http.get<any>(`${this.usuariosUrl}`, {params})
            .toPromise()
            .then(response => {
                const usuarios = response.content;

                const resultado = {
                    usuarios,
                    total: response.totalElements
                };

                return resultado;
            })
    }

    excluir(codigo: number): Promise<void> {
        return this.http.delete(`${this.usuariosUrl}/${codigo}`)
            .toPromise()
            .then(() => null);
    }

    adicionar(usuario: Usuario): Promise<Usuario> {
        return this.http.post<Usuario>(this.usuariosUrl, usuario)
            .toPromise();
    }

    atualizar(usuario: Usuario): Promise<Usuario> {
        return this.http.put<Usuario>(`${this.usuariosUrl}/${usuario.codigo}`, usuario)
            .toPromise();
    }

    buscarPorCodigo(codigo: number): Promise<Usuario> {
        return this.http.get<Usuario>(`${this.usuariosUrl}/${codigo}`)
            .toPromise();
    }

}
