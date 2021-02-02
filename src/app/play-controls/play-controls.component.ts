import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommandService } from '../core/services/command.service';


@Component({
  selector: 'app-play-controls',
  templateUrl: './play-controls.component.html',
  styleUrls: ['./play-controls.component.scss'],
})

export class PlayControlsComponent implements OnInit {
  
  playControlsForm: FormGroup;

  public reports:Array<string>=[];
  public angle: number = 0;
  public moveDirection: string;
  public lastDirection: string;
  public roboX = -1;
  public roboY = -1;
  public isRoboPresent = false;

  @Output() newItemEvent = new EventEmitter<number>();
  @Output() moveCommand = new EventEmitter<any>();

  ngOnInit() {
  }

  constructor(private formBuilder: FormBuilder, public commandService: CommandService) {
    this.playControlsForm = this.formBuilder.group({
      locationX: ['', [Validators.required, Validators.minLength(1)]],
      locationY: ['', [Validators.required, Validators.minLength(1)]],
      direction: ['', [Validators.required]]
    });
  }

  commandPlayRobot() {
    if (this.playControlsForm.value.locationX != "" && this.playControlsForm.value.locationX != null)
      this.roboX = this.playControlsForm.value.locationX;
    else
      this.roboX = this.roboX;

    if (this.playControlsForm.value.locationY != "" && this.playControlsForm.value.locationY != null)
      this.roboY = this.playControlsForm.value.locationY;
    else
      this.roboY = this.roboY;
    

    if (this.playControlsForm.valid) {
      this.isRoboPresent = true;
      this.moveDirection = this.playControlsForm.value.direction;
      this.reports.push("PLACE "+this.roboX+", "+this.roboY+" "+this.moveDirection);
      this.rotateRobot(this.moveDirection);
      this.moveForward();
    } else {
      this.moveDirection = this.lastDirection;
      
      if ((this.roboX > -1 && this.roboX < 5) && (this.roboY > -1 && this.roboY < 5)) {
        this.isRoboPresent = true;
        this.reports.push("MOVE");
        this.direction(this.moveDirection);
        this.rotateRobot(this.moveDirection);
        this.moveForward();
      } else {
        this.commandService.presentErrorToast('INVALID INPUT PLACE COMMAND (X, Y, Direction)');
      }
    }

  }

  directionChange(event) {
    this.moveDirection = event.target.value;
    this.direction(this.moveDirection);
  }

  rotateRobot(direction) {
    if (this.isRoboPresent) {
      
      if (direction == 'LEFT') {
        this.reports.push(direction);
        this.angle > -360 ? this.angle -= 90 : this.angle = -90;
      } else if (direction == 'RIGHT') {
        this.reports.push(direction);
        this.angle < 360 ? this.angle += 90 : this.angle = 90;
      }

      switch (this.angle) {
        case 90: case -270: {
          this.moveDirection = 'EAST';
          break;
        }
        case 180: case -180: {
          this.moveDirection = 'SOUTH';
          break;
        }
        case 270: case -90: {
          this.moveDirection = 'WEST';
          break;
        }
        case 360: case -360: {
          this.moveDirection = 'NORTH';
          break;
        }
        default: {
          this.moveDirection = 'NORTH';
          break;
        }
      }
      this.lastDirection = this.moveDirection;
      this.newItemEvent.emit(this.angle);
    } else {
      this.commandService.presentErrorToast('Please input all the fields for PLACE');
    }
  }

  direction(directionVal) {
    this.moveDirection = directionVal;
    switch (directionVal) {
      case "NORTH": {
        this.roboY = this.roboY + 1;
        this.roboX = this.roboX > -1 && this.roboX < 5 ? this.roboX : 0;
        this.angle = 360;
        break;
      }
      case "EAST": {
        this.roboX = this.roboX + 1;
        this.roboY = this.roboY > -1 && this.roboY < 5 ? this.roboY : 0;
        this.angle = 90;
        break;
      }
      case "SOUTH": {
        this.roboY = this.roboY - 1;
        this.roboX = this.roboX > -1 && this.roboX < 5 ? this.roboX : 0;
        this.angle = 180;
        break;
      }
      case "WEST": {
        this.roboX = this.roboX - 1;
        this.roboY = this.roboY > -1 && this.roboY < 5 ? this.roboY : 0;
        this.angle = 270;
        break;
      }
      default: {
        break;
      }
    }
  }


  moveForward() {
    if (!this.commandService.robotPlaceValidation(this.roboX, this.roboY)) {
      this.reports.pop();
      this.commandService.presentErrorToast("The robot can't move forward on that direction, it may fall off the table.");
    } else {
      this.moveCommand.emit({ roboX: this.roboX, roboY: this.roboY });
      this.lastDirection = this.moveDirection;
      this.resetData();
    }
  }

  resetData() {
    this.playControlsForm.reset();
  }
}
