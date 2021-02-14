import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { PlayControlsComponent } from './play-controls.component';
import { IonicModule } from '@ionic/angular';
import { By } from '@angular/platform-browser';

describe('PlayControlsComponent', () => {
  let component: PlayControlsComponent;
  let fixture: ComponentFixture<PlayControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlayControlsComponent],
      imports: [FormsModule, ReactiveFormsModule, RouterTestingModule, IonicModule],
      providers: [FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.playControlsForm.valid).toBeFalsy();
  });

  it('Initial robot X value', (() => {
    fixture.detectChanges();
    expect(component.roboX).toEqual(-1, 'Initial robot X value is -1');
  }));

  it('Initial robot Y value', (() => {
    fixture.detectChanges();
    expect(component.roboY).toEqual(-1, 'Initial robot Y value is -1');
  }));

  it('check for submit form event', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const getForm = fixture.debugElement.query(By.css('.formPlay'));
    expect(getForm.triggerEventHandler('submit', compiled)).toBeUndefined();
  });

  it('should called commandPlayRobot when click on MOVE', fakeAsync(() => {
    fixture.detectChanges();
    spyOn(component, 'commandPlayRobot'); 
    let btn = fixture.debugElement.query(By.css('.formPlay'));
    btn.triggerEventHandler('submit', null);
    tick(); 
    fixture.detectChanges();
    expect(component.commandPlayRobot).toHaveBeenCalled();
  }));

  it('should open login page when click back button', fakeAsync(() => {
    let de = fixture.debugElement.query(By.css('.formPlay'));
    let el = de.triggerEventHandler('click', null);

    tick(); 
    fixture.detectChanges(); 

    expect(component.roboX).toBeGreaterThanOrEqual(-1);
    expect(component.roboX).toBeLessThan(5);

    expect(component.roboY).toBeGreaterThanOrEqual(-1);
    expect(component.roboY).toBeLessThan(5);
  }));

   it('should click LEFT button', async(() => {
    fixture.detectChanges();
    let buttonElement = fixture.debugElement.query(By.css('.leftBtn'));

    buttonElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.roboX).toBeGreaterThanOrEqual(-1);
    });
  }));

  
});
