import { Component,EventEmitter,Output } from '@angular/core';


@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent {
  @Output() textboxModeActivated = new EventEmitter();

  activateTextboxMode() {
    this.textboxModeActivated.emit();
  }
}
