import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatIconModule} from '@angular/material/icon';
import { MatBadgeModule} from '@angular/material/badge';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatMenuModule} from '@angular/material/menu';
import { MatListModule} from '@angular/material/list';
import { MatGridListModule} from '@angular/material/grid-list';
import { MatTabsModule }  from '@angular/material/tabs';
import { MatStepperModule} from '@angular/material/stepper'
import { MatSelectModule} from '@angular/material/select';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatTooltipModule} from '@angular/material/tooltip';
import { MatSnackBarModule} from '@angular/material/snack-bar'
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDividerModule } from '@angular/material/divider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NgxMatFileInputModule} from '@angular-material-components/file-input';
import {EditorModule} from 'primeng/editor';
const MaterialComponents=[
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule ,
  MatCardModule, 
  MatButtonModule, 
  MatToolbarModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatTableModule,
  MatButtonToggleModule,
  MatIconModule,
  MatBadgeModule,
  MatSidenavModule,
  MatMenuModule,
  MatListModule,
  MatGridListModule,
  MatTabsModule,
  MatStepperModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatDialogModule,
  MatPaginatorModule,
  MatSortModule,
  MatProgressSpinnerModule,
  NgxMatFileInputModule,
  EditorModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialComponents
  ],
  exports:[MaterialComponents]
})
export class MaterialModule { }
