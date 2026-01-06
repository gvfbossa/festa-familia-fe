import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Adult } from '../../models/adult.model';
import { Kid } from '../../models/kid.model';
import { ParticipantsService } from '../../services/participantes.service';


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
      return sobrenome[sobrenome.length-1].toUpperCase()
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
}
