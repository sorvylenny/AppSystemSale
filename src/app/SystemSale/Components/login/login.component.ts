import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UsersService } from "../../Services/users.service";
import { UtilityService } from "../../Shared/utility.service";
import { Login } from "../../interfaces/login";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  formLogin: FormGroup;
  hidePassword: boolean = true;
  showLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UsersService,
    private utilityService: UtilityService
  ) {
    this.formLogin = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  initSesion() {
    this.showLoading = true;
    const request: Login = {
      email: this.formLogin.value.email,
      password: this.formLogin.value.password
    };
    this.userService.PostInitSesion(request).subscribe({
      next: data => {
        if (data.status) {
          this.utilityService.SaveSesionUser(data.value);
          this.router.navigate(["pages"]);
        } else {
          this.utilityService.Alert(
            "No se encontraron coincidencias",
            "Lo sentimos!"
          );
        }
      },
      complete: () => {
        this.showLoading = false;
      },
      error: () => {
        this.utilityService.Alert("Hubo un error", "Lo sentimos!");
      }
    });
  }
}
