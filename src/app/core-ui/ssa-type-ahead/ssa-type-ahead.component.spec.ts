import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SsaTypeAheadComponent } from './ssa-type-ahead.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('SsaTypeAheadComponent', () => {
  let component: SsaTypeAheadComponent;
  let fixture: ComponentFixture<SsaTypeAheadComponent>;
  let compEl: HTMLElement;
  let compDe: DebugElement;
  const testOptions = [
    { name: 'first option', value: '1' },
    { name: 'second option', value: '2' }
  ];

  const QUARTER_SECOND = 250;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SsaTypeAheadComponent, BrowserAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SsaTypeAheadComponent);
    component = fixture.componentInstance;
    compEl = fixture.nativeElement;
    compDe = fixture.debugElement;
    component.autoCompleteOptions = testOptions;
    // This calls ngOnInit
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // Tests to check if a mat-form-field, input, and mat-autocomplete are rendered.
  it('should contain a mat-form-field', () => {
    const formFieldEl = compEl.querySelector('mat-form-field');
    expect(formFieldEl).toBeTruthy();
  });
  it('should contain a input', () => {
    const inputEl = compEl.querySelector('input');
    expect(inputEl).toBeTruthy();
  });
  it('should contain a mat-autocomplete', () => {
    const autocompleteEl = compEl.querySelector('mat-autocomplete');
    expect(autocompleteEl).toBeTruthy();
  });
  // Test to check if given list of options are rendered as mat-options.
  it('should render given options in autocomplete when selected', () => {
    const inputDe: DebugElement = compDe.query(By.css('input'));
    inputDe.triggerEventHandler('click');
    fixture.detectChanges();

    for ( const opt of testOptions ) {
      // Here I tried using querySelector on component native element, but it seems like the native element does not update.
      // Maybe my test suite isn't rendering in a browser?
      const typeAheadOption = compDe.query( By.css( `mat-option[qa-tag="type-ahead-option-${opt.name}"]` ) );
      expect( typeAheadOption ).toBeTruthy();
    }
  });
  // Test to check if typing certain words into the input displays certain options and not others.
  it('should render certain options in autocomplete when typing certain words', fakeAsync( () => {
    // Adding this fixes error "Error: 1 periodic timer(s) still in the queue."
    fixture.autoDetectChanges();

    const inputEl: HTMLInputElement = compDe.query(By.css('input')).nativeElement;
    // set input's value to only match first option
    inputEl.value = 'first';
    // Dispatch a DOM event so that Angular learns of input value change.
    inputEl.dispatchEvent(new Event('input'));
    // Wait for debounceTime on inputFormControl
    tick(QUARTER_SECOND);

    // Using triggerEventHandler on inputDE would work here as well
    inputEl.click();
    
    const firstOptionIndex = 0;
    const secondOptionIndex = 1;
    expect( compDe.query( By.css( `mat-option[qa-tag="type-ahead-option-${testOptions[firstOptionIndex].name}"]` ) ) ).toBeTruthy();
    expect( compDe.query( By.css( `mat-option[qa-tag="type-ahead-option-${testOptions[secondOptionIndex].name}"]` ) ) ).toBeNull();
  }));
});
