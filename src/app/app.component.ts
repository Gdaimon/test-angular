import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {ModalComponent} from './modal/modal.component';
import {MatPaginator} from '@angular/material/paginator';

export interface Usuarios {
  id: number;
  usuario: string;
  email: string;
  nombre: string;
  apellido: string;
  estado: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  forma = this.fb.group(
    {
      usuario: [null, [Validators.required, Validators.maxLength(20),
        Validators.pattern('[^[a-z].*$')]],
      email: [null, [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      nombre: [null, [Validators.required, Validators.maxLength(100)]],
      apellido: [null, [Validators.required, Validators.maxLength(100)]],
      estado: [false, [Validators.required]],
    },
  );
  displayedColumns: string[] = ['id', 'usuario', 'email', 'nombre', 'apellido', 'estado', 'actions'];
  listaUsuarios: Usuarios[] = [
    {
      id: 1,
      usuario: 'carlos.perez',
      email: 'carlos.perez@gmail.com',
      nombre: 'carlos',
      apellido: 'perez',
      estado: true
    },
    {
      id: 2,
      usuario: 'pedro.picapiedra',
      email: 'pedro.picapiedra@gmail.com',
      nombre: 'pedro',
      apellido: 'picapiedra',
      estado: false
    },
    {
      id: 3,
      usuario: 'vilma.picapiedra',
      email: 'vilma.picapiedra@gmail.com',
      nombre: 'vilma',
      apellido: 'picapiedra',
      estado: true
    },
    {
      id: 4,
      usuario: 'betty.marmol',
      email: 'betty.marmol@gmail.com',
      nombre: 'betty',
      apellido: 'marmol',
      estado: false
    },
    {
      id: 5,
      usuario: 'pablo.marmol',
      email: 'pablo.marmol@gmail.com',
      nombre: 'pablo',
      apellido: 'marmol',
      estado: true
    },
    {
      id: 6,
      usuario: 'peter.parker',
      email: 'peter.parker@gmail.com',
      nombre: 'peter',
      apellido: 'parker',
      estado: true
    },
    {id: 7, usuario: 'tonny.stark', email: 'tonny.stark@gmail.com', nombre: 'tonny', apellido: 'stark', estado: true},
    {
      id: 8,
      usuario: 'scott.summer',
      email: 'scott.summer@gmail.com',
      nombre: 'scott',
      apellido: 'summer',
      estado: false
    },
    {id: 9, usuario: 'jean.grey', email: 'jean.grey@gmail.com', nombre: 'jean', apellido: 'grey', estado: true},
    {id: 10, usuario: 'bruce.wayne', email: 'bruce.wayne@gmail.com', nombre: 'bruce', apellido: 'wayne', estado: true},
  ];
  dataSource: MatTableDataSource<Usuarios>


  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource(this.listaUsuarios);

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Items por pagina:';
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }


  consultarUsuario() {

    console.log(this.forma.value);

    const {id, usuario, email, nombre, apellido, estado} = this.forma.value

    if (usuario) {
      this.dataSource.filter = usuario.trim().toLowerCase();
      return
    }

    if (email) {
      this.dataSource.filter = email.trim().toLowerCase();
      return
    }
    if (nombre) {
      this.dataSource.filter = nombre.trim().toLowerCase();
      return
    }

    if (apellido) {
      this.dataSource.filter = apellido.trim().toLowerCase();
      return
    }
    if (estado) {
      this.dataSource.filter = estado;
      return
    }
    this.dataSource.filter = ''

  }

  editarUsuario(elemnt: any) {
    console.log(elemnt)
  }

  eliminarUsuario(elemnt: any) {
    console.log(elemnt)

  }

  adicionarUsuario() {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '720px',
      data: {titulo: 'Crear Usuario'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


}
