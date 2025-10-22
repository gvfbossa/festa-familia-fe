import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { IbgeService } from '../../services/igbe.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  estados: any[] = [];
  municipios: any[] = [];
  estadoSelecionadoId: number | null = null;

  constructor(private ibgeService: IbgeService) { }

  ngOnInit() {
    this.ibgeService.getEstados().subscribe(data => {
      this.estados = data.sort((a: any, b: any) => a.nome.localeCompare(b.nome));
    });
  }

  onEstadoChange() {
    if (this.estadoSelecionadoId) {
      this.ibgeService.getMunicipios(this.estadoSelecionadoId).subscribe(data => {
        this.municipios = data.sort((a: any, b: any) => a.nome.localeCompare(b.nome));
      });
    } else {
      this.municipios = [];
    }
  }

  onSubmit(form: NgForm) {
    alert('Cadastro realizado com sucesso!')
  }

}
