import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.page.html',
  styleUrls: ['./buscador.page.scss'],
})
export class BuscadorPage implements OnInit {
  produtos: any;
  buscar: string = "";
  quantidade: any;
  urlAPI: string;
  id_empresa: string;
  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParamMap
      .subscribe((queryParams: ParamMap) => {
        for(let i in queryParams["params"]){
          this.id_empresa = i;
        }
      });
    this.procuraURLapi();
  }

  procuraURLapi() {
    this.urlAPI = "https://ww2.a00s.com:8443";
    if (this.id_empresa == null || this.id_empresa == "") {
      this.buscaQuantidade();
    } else {
      this.buscaApiEmpresa();
    }
  }

  buscaApiEmpresa() {
    this.http.get(this.urlAPI + '/a00s_api?tipo=a00s_busca_empresa&busca=' + this.buscar + "&empresa=" + this.id_empresa).subscribe((data) => {   
      this.produtos = data;
      if (this.produtos.length == 0) {
        this.produtos = [{
          "descricao": "Produto não encontrado"
        }]
      }
    }, (error) => {
      console.log(error);
    });
  }

  buscaApi() {
    if (this.buscar != "") {
      if (this.id_empresa == null) {
        this.http.get(this.urlAPI + '/a00s_api?tipo=a00s_busca&busca=' + this.buscar).subscribe((data) => {
          console.log(data);
          if (data != undefined && data[0] != undefined) {
            this.produtos = data;
            if (this.produtos.length == 0) {
              this.produtos = [{
                "descricao": "Produto não encontrado"
              }]
            }
          }
        }, (error) => {
          console.log(error);
        });
      } else {
        this.http.get(this.urlAPI + '/a00s_api?tipo=a00s_busca_empresa&busca=' + this.buscar + "&empresa=" + this.id_empresa).subscribe((data) => {   
            this.produtos = data;
            if (this.produtos.length == 0) {
              this.produtos = [{
                "descricao": "Produto não encontrado"
              }]
            }
        }, (error) => {
          console.log(error);
        });
      }
    }
  }

  buscaQuantidade() {
    console.log("Busca quantidade");
    this.http.get(this.urlAPI + '/a00s_api?tipo=a00s_busca_total' + this.buscar).subscribe((result) => {
      console.log(result);
      if (result != undefined && result[0] != undefined) {
        console.log("Retornando data:" + result[0].quantidade);
        this.quantidade = result[0].quantidade;
      }
    }, (error) => {
      console.log(error);
    });
  }

  limpar() {
    this.buscar = "";
  }
}
