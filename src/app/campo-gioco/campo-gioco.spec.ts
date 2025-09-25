import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampoGioco } from './campo-gioco';

describe('CampoGioco', () => {
  let component: CampoGioco;
  let fixture: ComponentFixture<CampoGioco>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampoGioco]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampoGioco);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
