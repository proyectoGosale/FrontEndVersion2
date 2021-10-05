import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  public showLoadingSubject: Subject<boolean> = new Subject();

  constructor(
    private spinner: NgxSpinnerService,
  ) {
  }

  openSnackBar(msg, action = '') {
    // this._snackBar.open(msg, action, {
    //   duration: 1000,
    //   horizontalPosition: 'end',
    //   verticalPosition: 'bottom',
    // });
  }
  showLoadingSpinner(show) {
    if (show) {
      this.spinner.show();
    } else {
      this.spinner.hide();
    }
  }
  showLoading(title?: string) {

    Swal.fire({
      title: title ?? 'Cargando ...',
      allowEscapeKey: false,
      allowOutsideClick: false
    });

    Swal.showLoading();
  }

  showSuccess() {
    return Swal.fire({
      title: 'Exito',
      text: 'Operación realizada con exito',
      icon: 'success'
    });
  }

  showDireccionCreada() {
    return Swal.fire({
      title: 'Exito',
      text: 'Dirección creada con exito',
      icon: 'success'
    });
  }

  showDireccionActualizada() {
    return Swal.fire({
      title: 'Exito',
      text: 'Dirección actualizada con exito',
      icon: 'success'
    });
  }

  showClienteCreado() {
    return Swal.fire({
      title: 'Exito',
      text: 'Ya esta casi todo listo, coloque los datos de su domicilio',
      icon: 'success'
    });
  }

  showError() {
    return Swal.fire({
      title: 'Error',
      text: 'La operación no se pudo completar',
      icon: 'error'
    });
  }

  showErrorCantidadImagenesSolicitud() {
    return Swal.fire({
      title: 'Error',
      text: 'La solicitud requiere minimo 3 imágenes.',
      icon: 'error'
    });
  }
  showErrorReferenciaNoEncontradaEnDespacho() {
    return Swal.fire({
      title: 'Error',
      text: 'La referencia no se requiere en el despacho actual.',
      icon: 'error'
    });
  }

  showErrorNoSeCargaMasDeUnArchivo() {
    return Swal.fire({
      title: 'Error',
      text: 'No se puede Mas de 1 imagen, si desea cambiarlo elimine el existente y vuelva a intentarlo',
      icon: 'error'
    });
  }

  showCerrarOrdenWarning() {
    return Swal.fire({
      title: 'Atencion',
      text: 'Se cerrara la orden y no se permitiran mas cambios, ¿Seguro?',
      icon: 'question',
      cancelButtonText: 'No',
      confirmButtonText: 'Si, continuar',
      showCancelButton: true

    });
  }
  showEnGestionWarning() {
    return Swal.fire({
      title: 'Atencion',
      text: 'Esta garantia quedara para su gestión y no se permitiran mas cambios, ¿Seguro?',
      icon: 'question',
      cancelButtonText: 'No',
      confirmButtonText: 'Si, continuar',
      showCancelButton: true

    });
  }
  showCancelWarning() {
    return Swal.fire({
      title: 'Atencion',
      text: 'Se perderan los cambios no guardados,¿Seguro?',
      icon: 'question',
      cancelButtonText: 'No',
      confirmButtonText: 'Si, continuar',
      showCancelButton: true

    });
  }
  
  showErrorVehiculoNoDisponible() {
    return Swal.fire({
      title: 'Atencion',
      text: 'El vehiculo seleccionado no esta disponible.',
      icon: 'error',
      confirmButtonText: 'Si, continuar'

    });
  }

  showCorregirGarantia() {
    return Swal.fire({
      title: 'Advertencia',
      text: 'Se enviara la garantia para ser corregida. ¿Está seguro?',
      input: 'text',
      inputValue: '',
      inputPlaceholder: 'Observaciones',
      inputValidator: (value) => {
        return !value && 'Debe ingresar observaciones';
      },
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, continuar',
      cancelButtonText: 'Cancelar'
    });
  }
  showAprobarGarantia() {
    return Swal.fire({
      title: 'Advertencia',
      text: 'Se aprobara la garantia. ¿Está seguro?',
      input: 'text',
      inputValue: '',
      inputPlaceholder: 'Observaciones',
      // inputValidator: (value) => {
      //   return !value && 'Debe ingresar observaciones';
      // },
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, continuar',
      cancelButtonText: 'Cancelar'
    });
  }
  showFinalizarGarantia() {
    return Swal.fire({
      title: 'Advertencia',
      text: 'Se finalizara la garantia. ¿Está seguro?',
      input: 'text',
      inputValue: '',
      inputPlaceholder: 'Observaciones',
      // inputValidator: (value) => {
      //   return !value && 'Debe ingresar observaciones';
      // },
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, continuar',
      cancelButtonText: 'Cancelar'
    });
  }

  showRechazarGarantia() {
    return Swal.fire({
      title: 'Advertencia',
      text: 'Se rechazara la garantia. ¿Está seguro?',
      input: 'text',
      inputValue: '',
      inputValidator: (value) => {
        return !value && 'Debe ingresar observaciones';
      },
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, continuar',
      cancelButtonText: 'Cancelar'
    });
  }
  showAlertVehiculoNoExisteAlistamiento() {
    return Swal.fire({
      title: 'Atención',
      text: 'El vehiculo no se encuentra registrado.',
      icon: 'info',
    });
  }
  showToastFaltanCampos() {
    let toast = Swal.mixin({ toast: true, position: 'top-end', timer: 3000, timerProgressBar: false });
    toast.fire('Faltan campos o tienen valores invalidos');
  }
  hideSwal() {
    Swal.close();
  }

}
