import { Component, OnInit } from '@angular/core';
import { AlunosService, Aluno } from '../../services/alunos.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.css']
})
export class AlunoComponent implements OnInit {
  alunos: Aluno[] = [];
  aluno: Aluno = { id: 0, nome: '', idade: 0, ra: '' };

  constructor(private alunosService: AlunosService) { }

  ngOnInit(): void {
    this.carregarAlunos();
  }

  carregarAlunos() {
    this.alunosService.obterAlunos().subscribe({
      next: alunos => this.alunos = alunos,
      error: err => console.error('Erro ao carregar alunos', err)
    });
  }

  buscarAlunoPorId(form: NgForm) {
    const id = form.value.id;
    this.alunosService.obterAlunoPorId(id).subscribe({
      next: aluno => this.aluno = aluno,
      error: err => console.error('Erro ao buscar aluno', err)
    });
  }

  cadastrarAluno(form: NgForm) {
    this.alunosService.cadastrarAluno(form.value).subscribe({
      next: aluno => {
        this.alunos.push(aluno);
        form.resetForm();
      },
      error: err => console.error('Erro ao cadastrar aluno', err)
    });
  }

  editarAluno(form: NgForm) {
    this.alunosService.editarAluno(form.value).subscribe({
      next: () => this.carregarAlunos(),
      error: err => console.error('Erro ao editar aluno', err)
    });
  }

  apagarAluno(id: number) {
    this.alunosService.apagarAluno(id).subscribe({
      next: () => this.carregarAlunos(),
      error: err => console.error('Erro ao apagar aluno', err)
    });
  }
}

