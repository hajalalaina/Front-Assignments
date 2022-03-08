import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  @Input() assignmentTransmis?:Assignment;
  @Output() deleteAssignment = new EventEmitter<Assignment>();

  constructor() { }

  ngOnInit(): void {
  }

  onAssignmentRendu() {
    if(this.assignmentTransmis)
      this.assignmentTransmis.rendu = true;
  }

  onDelete() {
    this.deleteAssignment.emit(this.assignmentTransmis);
    this.assignmentTransmis = undefined;
  }
}
