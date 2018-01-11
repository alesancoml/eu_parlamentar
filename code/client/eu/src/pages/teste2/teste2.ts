import { Component } from '@angular/core';
import { NavController, MenuController, NavParams, LoadingController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service-provider';
import { FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'page-teste2',
  templateUrl: 'teste2.html',
})
export class Teste2 {
 
  cadastro: any = {}
  perguntas: any[];
  langs;
  langForm;
  respostas = ["Sim","Não","Abs"];
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public service: ServiceProvider,
    private _loadingCtrl: LoadingController) {

      this.getDados();
      this.langForm = new FormGroup({
        "langs": new FormControl()
      });
  }
  
  getDados(){
      this.service.getPerguntas().subscribe(
        data => this.perguntas = data,
        err => console.log(err)
      )
      
  }

  doSubmit(event) {
    console.log('Submitting form', this.langForm.value );
    event.preventDefault();
  }

  seleciona(perg, resp){
    console.log(perg, resp);
  }

}
