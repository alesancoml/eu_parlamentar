import { Injectable } from '@angular/core';
import { Http, Headers, Response, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ServiceProvider {

      api : string = 'http://localhost/api/';

  constructor(public http: Http) {}

  //Seleciona todos os usuários do banc (teste.ts)
  getData() {
        return this.http.get(this.api + 'usuarios.php').map(res=>res.json())
  }

  //Cadastramento de usuário (estado.ts)
  postData(parans){
    let headers = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded' });
    return this.http.post(this.api + "cadastra.php", parans, {
      headers: headers,
      method:"POST"
    }).map(
      (res:Response) => {return res.json();}
    );
  }
  enviaMensagem(parans){
    let headers = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded' });
    return this.http.post(this.api + "contato.php", parans, {
      headers: headers,
      method:"POST"
    }).map(
      (res:Response) => {return res.json();}
    );
  }

  //Coleta perguntas do banco para exibir ao usuário (perguntas.ts)
  getPerguntas() {
    return this.http.get(this.api + 'perguntas.php').map(res=>res.json())
  }

  //Envio de respostas do usuário (resultados.ts)
  postRespostas(dados) {
    let headers = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded' });
    return this.http.post(this.api + "opina.php", dados, {
      headers: headers,
      method:"POST"
    }).map(
      (res:Response) => {
        return res.json();
      }
    );
  }

}
