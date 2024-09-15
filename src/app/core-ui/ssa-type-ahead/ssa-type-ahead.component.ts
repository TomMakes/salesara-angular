import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete'; 
import {MatInputModule} from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-ssa-type-ahead',
  standalone: true,
  imports: [
    // Imports form field component
    MatFormFieldModule,
    // Imports autocomplete component
    MatAutocompleteModule,
    // Needed to set input as a matInput
    MatInputModule,
    // Needed to bind formControl to input
    ReactiveFormsModule ],
  templateUrl: './ssa-type-ahead.component.html',
  styleUrl: './ssa-type-ahead.component.scss'
})
export class SsaTypeAheadComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject();
  @Input() autoCompleteOptions: { name: string; value: string; }[] = [];

  inputFormControl = new FormControl( '' );
  optionsToDisplay: { name: string; value: string; }[] = [];

  QUARTER_SECOND = 250;
  TENTH_SECOND = 100;

  ngOnInit(): void {
    this.populateTypeAheadOptions();
    this.listenToTypeAhead();
  }
  ngOnDestroy(): void {
    this.onDestroy$.next( null );
  }

  populateTypeAheadOptions() {
    this.optionsToDisplay = this.autoCompleteOptions;
  }

  listenToTypeAhead() {
    this.inputFormControl.valueChanges
    .pipe(
      takeUntil(this.onDestroy$),
      debounceTime(this.QUARTER_SECOND)
    ).subscribe( ( data ) => {
      if ( data ) {
        this.optionsToDisplay = this.autoCompleteOptions.filter((option) => {
          return option.name.toLocaleLowerCase().includes( data.toLocaleLowerCase() );
        })
      } else {
        this.optionsToDisplay = this.autoCompleteOptions;
      }
    } );
  }
}
