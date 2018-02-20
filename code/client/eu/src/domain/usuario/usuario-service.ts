import { Injectable } from '@angular/core';
import {Http } from '@angular/http';

@Injectable()
export class UsuarioService{
    constructor(private _http: Http){}
    public efetuaLogin(metodo:string){
        //aqui vem a lógica de envio com http
    }
}