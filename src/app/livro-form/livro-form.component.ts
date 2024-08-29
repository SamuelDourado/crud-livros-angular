import { Component, EventEmitter,Input,OnChanges,Output } from '@angular/core';
import { ILivro } from '../shared/models/Livro';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, formatDate } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LivroService } from '../services/livro.service';
import { ToastrService } from 'ngx-toastr';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';

@Component({
  selector: 'app-livro-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './livro-form.component.html',
  styleUrl: './livro-form.component.css'
})
export class LivroFormComponent implements OnChanges {
  @Input() data: ILivro | null = null;
  @Output() onCloseModel = new EventEmitter();

  livroForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private livroService: LivroService,
    private toastr: ToastrService
  ) {
    this.livroForm = this.fb.group({
      titulo: new FormControl('', [Validators.required]),
      codL: new FormControl('', [Validators.required]),
      editora: new FormControl('', [Validators.required]),
      edicao: new FormControl('', [Validators.required]),
      anoPublicacao: new FormControl('', [Validators.required])
      //valor: new FormControl('', [Validators.required]),
    });
  }

  onClose() {
    this.onCloseModel.emit(false);
  }

  ngOnChanges(): void {
    if (this.data) {
      this.livroForm.patchValue({
        titulo: this.data.titulo,
        codL: this.data.codL,
        editora: this.data.editora,
        edicao: this.data.edicao,
        anoPublicacao: this.data.anoPublicacao,
        valor: this.data.valor
      });
    }
  }

  onSubmit() {
    if (this.livroForm.valid) {
      if (this.data) {
        this.livroService
          .updateLivro(this.data.id as string, this.livroForm.value)
          .subscribe({
            next: (response: any) => {
              this.resetLivroForm();
              this.toastr.success(response.message);
            },
          });
      } else {
        this.livroService.createLivro(this.livroForm.value).subscribe({
          next: (response: any) => {
            this.resetLivroForm();
            this.toastr.success(response.message);
          },
        });
      }
    } else {
      this.livroForm.markAllAsTouched();
    }
  }

  resetLivroForm() {
    this.livroForm.reset();
    this.onClose();
  }
}
