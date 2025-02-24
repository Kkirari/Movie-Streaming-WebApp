import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { HeaderComponent } from './header/header.component'
import { NgxSpinnerComponent } from 'ngx-spinner'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, CommonModule,NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.')
  }

}
