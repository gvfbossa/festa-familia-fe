import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ParticipantsService } from '../../services/participantes.service';
import { Adult } from '../../models/adult.model';
import { Kid } from '../../models/kid.model';

@Component({
  selector: 'app-participantes',
  standalone: true,
  imports: [NgFor, FormsModule, CommonModule],
  templateUrl: './participantes.component.html',
  styleUrls: ['./participantes.component.css']
})
export class ParticipantesComponent implements OnInit {

  adults: Adult[] = [];
  kids: Kid[] = [];

  searchAdult: string = '';
  searchKid: string = '';

  constructor(private participantsService: ParticipantsService) { }

  ngOnInit(): void {
    this.loadParticipants();
  }

  loadParticipants(): void {
    this.participantsService.getAdults().subscribe((data: Adult[]) => {
      this.adults = data.sort((a, b) => a.nomeCompleto.localeCompare(b.nomeCompleto))
                        .map(a => ({ ...a, expanded: false }));
      
    });

    this.participantsService.getKids().subscribe((data: Kid[]) => {
      this.kids = data.sort((a, b) => a.nomeCompleto.localeCompare(b.nomeCompleto))
                      .map(k => ({ ...k, expanded: false }));
    });
  }

  // ===== Adultos =====
  get filteredAdults(): Adult[] {
    return this.adults.filter(a =>
      a.nomeCompleto.toLowerCase().includes(this.searchAdult.toLowerCase())
    );
  }

  addAdult(): void {
    const newAdult: Adult = {
      nomeCompleto: '',
      nomePai: '',
      nomeMae: '',
      nomeNonno: '',
      nomeNonna: ''
    };

    this.participantsService.addAdult(newAdult).subscribe(() => this.loadParticipants());
  }

  editAdult(adult: Adult): void {
    if (!adult.id) return;
    this.participantsService.editAdult(adult).subscribe(() => console.log('Adulto atualizado:', adult.nomeCompleto));
    alert('Participante: ' + adult.nomeCompleto + " salvo com sucesso!")
  }

  removeAdult(id?: number): void {
    if (id) {
      let confirmDelete = confirm("Tem certeza que quer remover este Participante?")

      if (confirmDelete) {
        this.participantsService.removeAdult(id).subscribe(() => this.loadParticipants());
      }
    }
  }

  // ===== Crianças =====
  get filteredKids(): Kid[] {
    return this.kids.filter(a =>
      a.nomeCompleto.toLowerCase().includes(this.searchKid.toLowerCase())
    );
  }

  addKid(): void {
    const newKid: Kid = {
      nomeCompleto: '',
      nomePai: '',
      nomeMae: ''
    };

    this.participantsService.addKid(newKid).subscribe(() => this.loadParticipants());
    alert('Participante: ' + newKid.nomeCompleto + " salvo com sucesso!")
  }

  editKid(kid: Kid): void {
    if (!kid.id) return;
    this.participantsService.editKid(kid).subscribe(() => console.log('Criança atualizada:', kid.nomeCompleto));
    alert('Participante: ' + kid.nomeCompleto + " salvo com sucesso!")
  }

  removeKid(id?: number): void {
    if (id) {
      let confirmDelete = confirm("Tem certeza que quer remover este Participante?")

      if (confirmDelete) {
        this.participantsService.removeKid(id).subscribe(() => this.loadParticipants());
      }
    }
  }
}
