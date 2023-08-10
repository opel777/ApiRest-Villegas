import { Component, OnDestroy } from '@angular/core';
import { Cursos } from './model';
import { MatDialog } from '@angular/material/dialog';
import { CursosFormDialogComponent } from './components/cursos-form-dialog/cursos-form-dialog.component';
import { CursosService } from './cursos.service';
import { Observable, Subject } from 'rxjs';


@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})

export class CursosComponent implements OnDestroy{
  public cursos: Observable<Cursos[]>;
  public isLoading$: Observable<boolean>;
  public destroyed = new Subject<boolean>();

  public loading = false;
  constructor(private matDialog: MatDialog, private cursosService: CursosService) {
    this.cursosService.loadCursos();
    this.isLoading$ = this.cursosService.isLoading$;
    this.cursos = this.cursosService.getCursos();
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  
  
  onCreateCursos(): void {
    this.matDialog
      // ABRO EL MODAL
      .open(CursosFormDialogComponent)
      // Y DESPUES DE QUE CIERRE
      .afterClosed()
      // HAGO ESTO...
      .subscribe({
        next: (v) => {
          if (v) {
            this.cursosService.createCursos({
              id:v.id,
              logo:v.logo,
              name:v.name,
              description:v.description,
            });
          }
        },
      });
  }

  onDeleteCursos(cursosToDelete: Cursos): void {
    if (confirm(`¿Está seguro de eliminar a ${cursosToDelete.name}?`)) {
      this.cursosService.deleteCursosById(cursosToDelete.id);
    }
  }

  onEditCursos(cursosToEdit: Cursos): void {
    this.matDialog
      // ABRO EL MODAL
      .open(CursosFormDialogComponent, {
        // LE ENVIO AL MODAL, EL USUARIO QUE QUIERO EDITAR
        data: cursosToEdit,
      })
      // Y DESPUES DE QUE CIERRE
      .afterClosed()
      // HAGO ESTO...
      .subscribe({
        next: (cursosUpdated) => {
          if (cursosUpdated) {
            this.cursosService.updateCursosById(cursosToEdit.id, cursosUpdated);
          }
        },
      });
  }
}
