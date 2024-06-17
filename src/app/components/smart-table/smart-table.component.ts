
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';



/* Data Table */

export interface PeriodicElement {
  id: number;
  name: string;
  price: number;
  category: string;

}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, name: 'Hydrogen', price: 1.0079, category: 'H' },
  { id: 2, name: 'Helium', price: 4.0026, category: 'He' },
  { id: 3, name: 'Lithium', price: 6.941, category: 'Li' },
  { id: 4, name: 'Beryllium', price: 9.0122, category: 'Be' },
  { id: 5, name: 'Boron', price: 10.811, category: 'B' },
  { id: 6, name: 'Carbon', price: 12.0107, category: 'C' },
  { id: 7, name: 'Nitrogen', price: 14.0067, category: 'N' },
  { id: 8, name: 'Oxygen', price: 15.9994, category: 'O' },
  { id: 9, name: 'Fluorine', price: 18.9984, category: 'F' },
  { id: 10, name: 'Neon', price: 20.1797, category: 'Ne' },
  { id: 11, name: 'Sodium', price: 22.9897, category: 'Na' },
  { id: 12, name: 'Magnesium', price: 24.305, category: 'Mg' },
  { id: 13, name: 'Aluminum', price: 26.9815, category: 'Al' },
  { id: 14, name: 'Silicon', price: 28.0855, category: 'Si' },
  { id: 15, name: 'Phosphorus', price: 30.9738, category: 'P' },
  { id: 16, name: 'Sulfur', price: 32.065, category: 'S' },
  { id: 17, name: 'Chlorine', price: 35.453, category: 'Cl' },
  { id: 18, name: 'Argon', price: 39.948, category: 'Ar' },
  { id: 19, name: 'Potassium', price: 39.0983, category: 'K' },
  { id: 20, name: 'Calcium', price: 40.078, category: 'Ca' },
];

/* Data Table */



@Component({
  selector: 'app-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.css'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatDividerModule, MatIconModule, CommonModule],


})



export class SmartTableComponent implements AfterViewInit {

  // Show 3 dots

  showDots: boolean = false;

  displayedColumns: string[] = ['id', 'name', 'price', 'category', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  constructor(private _liveAnnouncer: LiveAnnouncer) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  showTag() {

    this.showDots =!this.showDots;

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Fonction pour Filtrage 

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Fonction pour le sorting

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}














