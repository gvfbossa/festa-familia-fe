import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Adult } from '../../models/adult.model';
import { Kid } from '../../models/kid.model';
import { ParticipantsService } from '../../services/participantes.service';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-cracha',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './cracha.component.html',
  styleUrls: ['./cracha.component.css'],
})
export class CrachaComponent implements OnInit {
  adults: Adult[] = [];
  kids: Kid[] = [];

  searchAdult: string = '';
  searchKid: string = '';

  adultoGenerico: Adult = {
    nomeCompleto: "Nome Sobrenome",
    dataNascimento: "2026-11-01",
    localNascimento: "BR - Brasil",
    nomeMae: "Nome Mãe",
    nomePai: "Nome Pai",
    nomeNonno: "Nome Nonno",
    nomeNonna: "Nome Nonna",
    bandeira: "italia",
    tipo: "ADULTO"
  }

  participanteSelecionado: Adult | Kid | null = null;

  constructor(private participantsService: ParticipantsService) { }

  ngOnInit(): void {
    this.loadParticipants();
  }

  loadParticipants(): void {
    this.participantsService.getAdults().subscribe((data: Adult[]) => {
      this.adults = data
        .map(a => ({ ...a, tipo: 'ADULTO' }))
        .sort((a, b) => a.nomeCompleto.localeCompare(b.nomeCompleto));

      if (!this.participanteSelecionado && this.adults.length > 0) {
        this.selecionarParticipante(this.adultoGenerico);
      }
    });

    this.participantsService.getKids().subscribe((data: Kid[]) => {
      this.kids = data
        .sort((a, b) => a.nomeCompleto.localeCompare(b.nomeCompleto));
    });
  }

  pegaSobrenomeParticipante(nomeCompleto: string | undefined) {
    if (nomeCompleto) {
      let sobrenome = nomeCompleto.trim().split(" ")
      return sobrenome[sobrenome.length - 1].toUpperCase()
    }
    return ""
  }

  isAdult(participante: Adult | Kid): participante is Adult {
    console.log(participante.nomeCompleto + " " + participante.tipo)
    return participante.tipo === 'ADULTO';
  }

  selecionarParticipante(participante: Adult | Kid) {
    if (!participante.bandeira) participante.bandeira = 'italia';
    this.participanteSelecionado = participante;
  }

  get filteredAdults(): Adult[] {
    return this.adults.filter(a =>
      a.nomeCompleto.toLowerCase().includes(this.searchAdult.toLowerCase())
    );
  }

  get filteredKids(): Adult[] {
    return this.kids.filter(a =>
      a.nomeCompleto.toLowerCase().includes(this.searchKid.toLowerCase())
    );
  }

  async baixarTodosCrachas() {
    const participantes = [
      ...this.adults,
      ...this.kids
    ];

    const element = document.getElementById('cracha-print');
    if (!element) return;

    element.classList.add('print-mode');

    for (const participante of participantes) {
      this.selecionarParticipante(participante);

      // espera o Angular renderizar
      await new Promise(requestAnimationFrame);

      const canvas = await html2canvas(element, {
        scale: 3, // alta qualidade pra impressão
        backgroundColor: '#ffffff',
        useCORS: true
      });

      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');

      const nomeArquivo = participante.nomeCompleto
        .replace(/\s+/g, '_')
        .toLowerCase();

      link.download = `cracha_${nomeArquivo}.png`;
      link.click();
    }

    element.classList.remove('print-mode');
  }
}
