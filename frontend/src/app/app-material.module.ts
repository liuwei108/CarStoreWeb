import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    MatDialogModule,
    MatTabsModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonToggleModule,
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    MatDialogModule,
    MatTabsModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonToggleModule,
  ],
  declarations: []
})
export class AppMaterialModule { }
