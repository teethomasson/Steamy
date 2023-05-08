import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {
  success: boolean | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.queryParamMap.get('userId');
    const code = this.route.snapshot.queryParamMap.get('code');

    if (userId && code) {
      this.http.get(`http://localhost:5140/account/confirmemail?userId=${userId}&code=${encodeURIComponent(code)}`)
        .subscribe(
          () => {
            this.success = true;
          },
          () => {
            this.success = false;
          }
        );
    } else {
      this.success = false;
    }
  }
}
