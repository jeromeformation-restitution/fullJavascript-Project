import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionnelleComponent } from './professionnelle.component';

describe('ProfessionnelleComponent', () => {
  let component: ProfessionnelleComponent;
  let fixture: ComponentFixture<ProfessionnelleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessionnelleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionnelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
