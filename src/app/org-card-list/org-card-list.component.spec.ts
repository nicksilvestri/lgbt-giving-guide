import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgCardListComponent } from './org-card-list.component';

describe('OrgCardListComponent', () => {
  let component: OrgCardListComponent;
  let fixture: ComponentFixture<OrgCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrgCardListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
