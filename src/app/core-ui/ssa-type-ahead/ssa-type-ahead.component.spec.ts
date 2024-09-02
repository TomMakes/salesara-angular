import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsaTypeAheadComponent } from './ssa-type-ahead.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SsaTypeAheadComponent', () => {
  let component: SsaTypeAheadComponent;
  let fixture: ComponentFixture<SsaTypeAheadComponent>;
  let compEl: HTMLElement ;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SsaTypeAheadComponent, BrowserAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SsaTypeAheadComponent);
    component = fixture.componentInstance;
    compEl = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // Tests to check if a mat-form-field, input, and mat-autocomplete are rendered.
  it('should contain a mat-form-field', () => {
    const formFieldEl = compEl.querySelector('mat-form-field');
    expect(formFieldEl).toBeDefined();
  });
  it('should contain a input', () => {
    const inputEl = compEl.querySelector('input');
    expect(inputEl).toBeDefined();
  });
  it('should contain a mat-autocomplete', () => {
    const autocompleteEl = compEl.querySelector('mat-autocomplete');
    expect(autocompleteEl).toBeDefined();
  });
});
