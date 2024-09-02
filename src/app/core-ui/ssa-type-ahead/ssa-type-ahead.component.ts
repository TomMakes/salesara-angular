import { Component, Input } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete'; 
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-ssa-type-ahead',
  standalone: true,
  imports: [ MatFormFieldModule, MatAutocompleteModule, MatInputModule ],
  templateUrl: './ssa-type-ahead.component.html',
  styleUrl: './ssa-type-ahead.component.scss'
})
export class SsaTypeAheadComponent {
  @Input() autoCompleteOptions = [];
}
