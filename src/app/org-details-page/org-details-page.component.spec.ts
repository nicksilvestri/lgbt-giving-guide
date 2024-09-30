import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgDetailsPageComponent } from './org-details-page.component';

describe('OrgDetailsPageComponent', () => {
  let component: OrgDetailsPageComponent;
  let fixture: ComponentFixture<OrgDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrgDetailsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
