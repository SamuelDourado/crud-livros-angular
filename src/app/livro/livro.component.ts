import { Component, OnInit } from '@angular/core';
import { ModelComponent } from '../shared/ui/model/model.component';
import { LivroFormComponent } from '../livro-form/livro-form.component';
import { ToastrService } from 'ngx-toastr';
import { ILivro } from '../shared/models/Livro';
import { LivroService } from '../services/livro.service';

@Component({
  selector: 'app-livro',
  standalone: true,
  imports: [ModelComponent, LivroFormComponent],
  templateUrl: './livro.component.html',
  styleUrl: './livro.component.css'
})
export class LivroComponent {
  isModelOpen = false;
  livros: ILivro[] = [];
  livro!: ILivro;

  constructor(
    private livroService: LivroService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllLivro();
  }

  getAllLivro() {
    this.livroService.getAllLivro().subscribe({
      next: (response) => {
        if (response.data) {
          this.livros = response.data;
        }
      },
    });
  }

  loadLivro(livro: ILivro) {
    this.livro = livro;
    this.openModel();
  }

  deleteLivro(id: string) {
    this.livroService.deleteLivro(id).subscribe({
      next: (response) => {
        this.toastr.success(response.message);
        this.getAllLivro();
      },
    });
  }

  openModel() {
    this.isModelOpen = true;
  }

  closeModel() {
    this.isModelOpen = false;
    this.getAllLivro();
  }
 
}
