import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-listar-imagen',
  templateUrl: './listar-imagen.component.html',
  styleUrls: ['./listar-imagen.component.css'],
})
export class ListarImagenComponent implements OnInit {
  palabra = '';
  suscription: Subscription;
  listarImagenes: any[] = [];
  loading = false;
  imagenesPorPagina = 20;
  paginaActual = 1;
  calcularTotalPaginas = 0;
  constructor(private _imagenService: ImagenService) {
    this.suscription = this._imagenService
      .getPalabraBusqueda()
      .subscribe((data) => {
        this.palabra = data;
        this.paginaActual = 1;
        this.loading = true;
        this.obtenerImagenes();
      });
  }

  ngOnInit(): void {}

  obtenerImagenes() {
    this._imagenService.getImagenes(this.palabra, this.imagenesPorPagina, this.paginaActual).subscribe(
      (data) => {
        this.loading = false;
    
        if (data.hits.length === 0) {
          this._imagenService.setError(
            'No hay ningún resultado con ese nombre...'
          );
          return;
        }

        this.calcularTotalPaginas = Math.ceil(
          data.totalHits / this.imagenesPorPagina
        );
        this.listarImagenes = data.hits;
      },
      (error) => {
        this._imagenService.setError('Opss...ha ocurrido un error');
        this.loading = false;
      }
    );
  }
  paginaAnterior() {
    this.paginaActual--;
    this.loading = true;
    this.listarImagenes = [];
    this.obtenerImagenes();
  }
  paginaSiguiente() {
    this.paginaActual++;
      this.loading = true;
      this.listarImagenes = [];
      this.obtenerImagenes();
  }
  paginaAnteriorClass() {
    if (this.paginaActual === 1) {
      return false;
    } else {
      return true;
    }
  }
  paginaSiguienteClass() {
    if (this.paginaActual === this.calcularTotalPaginas) {
      return false;
    } else {
      return true;
    }
  }
}
