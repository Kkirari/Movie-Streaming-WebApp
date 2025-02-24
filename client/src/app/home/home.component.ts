import { Component, computed, inject, Signal } from '@angular/core'
import { User } from '../_model/user.model'
import { AccountService } from '../_services/account.service'

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private accountService = inject(AccountService)
  user: Signal<User | undefined>

  constructor() {
    this.user = computed(() => this.accountService.data()?.user)
  }
}
