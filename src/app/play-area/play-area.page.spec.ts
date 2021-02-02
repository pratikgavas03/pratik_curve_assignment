import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlayAreaPage } from './play-area.page';

describe('PlayAreaPage', () => {
  let component: PlayAreaPage;
  let fixture: ComponentFixture<PlayAreaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayAreaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlayAreaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
