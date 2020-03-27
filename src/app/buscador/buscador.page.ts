import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  ) { }

  ngOnInit() {
    this.procuraURLapi();
  }

  procuraURLapi() {
    // this.http.get('http://w.a00s.com/ultima_versao_api').map(res => res.text()).subscribe(
    //   data => {
    //     this.urlAPI = data;
    //     this.urlAPI = "https://www.a00s.com.br/a00s_V2-20170318";

    //     if (this.id_empresa == null) {
    //       this.buscaQuantidade();
    //     } else {
    //       this.buscaApiEmpresa();
    //     }
    //   },
    //   err => {
    //     console.log("Nao foi possivel buscar!" + err);
    //   }
    // );
    // this.http.get('https://w.a00s.com/ultima_versao_api').subscribe((result) => {
    //   console.log(result);
    this.urlAPI = "https://ww2.a00s.com:8443";
    if (this.id_empresa == null || this.id_empresa == "") {
      this.buscaQuantidade();
    } else {
      this.buscaApiEmpresa();
    }
    // if (result != undefined && result["data"] != undefined) {
    // }
    // }, (error) => {
    //   console.log(error);
    // });
  }

  buscaApiEmpresa() {
    // this.http.get(this.urlAPI + '/a00s_api?tipo=a00s_busca_empresa&busca=' + this.buscar + "&empresa=" + this.id_empresa).map(res => res.json()).subscribe(
    //   data => {
    //     this.produtos = data;
    //     if (this.produtos.length == 0) {
    //       this.produtos = [{
    //         "descricao": "Produto não encontrado"
    //       }]
    //     }
    //   },
    //   err => {
    //     console.log("Nao foi possivel buscar!" + err);
    //   });
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
