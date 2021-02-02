import { Component, Input, OnInit, EventEmitter } from '@angular/core';
import { CommandService } from '../core/services/command.service';

@Component({
  selector: 'app-play-area',
  templateUrl: './play-area.page.html',
  styleUrls: ['./play-area.page.scss']
})
export class PlayAreaPage implements OnInit {
  private cols: Array<number>;
  private rows: Array<number>;
  private boardDim;
  private currentLocation = '';
  private transX;

  constructor(public commandService:CommandService) { 
    this.boardDim = this.commandService.createBoard();
    this.cols = this.boardDim.cols;
    this.rows = this.boardDim.rows;
  }

  ngOnInit() {
  }

  rotateLeft(event: EventEmitter<number>){
    this.transX = event.toString();
  }

  moveCommandAction(event){
    this.currentLocation = event.roboX +'_'+ event.roboY;
  }

  

}
