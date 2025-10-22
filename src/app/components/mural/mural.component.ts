import { Component } from '@angular/core';
import { Foto } from '../../models/foto.model';
import { FotosService } from '../../services/fotos.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-mural',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './mural.component.html',
  styleUrls: ['./mural.component.css']
})
export class MuralComponent {
  fotos: Foto[] = [];
  descricao: string = '';
  file: File | null = null;

  constructor(private fotosService: FotosService) {
    this.loadFotos();
  }

  loadFotos() {
    this.fotosService.getFotos().subscribe({
      next: fotos => this.fotos = fotos,
      error: () => alert('Não há fotos')
    });
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  uploadFoto() {
    if (!this.file || !this.descricao.trim()) {
      alert('Selecione um arquivo e adicione uma descrição.');
      return;
    }

    this.fotosService.uploadFoto(this.file, this.descricao).subscribe({
      next: () => {
        console.log("file" + this.file + " descricao " + this.descricao)
        this.descricao = '';
        this.file = null;
        this.loadFotos();
      },
      error: () => alert('Erro ao enviar a foto.')
    });
  }
}
