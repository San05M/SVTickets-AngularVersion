import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
#usersUrl = 'users';
#http = inject(HttpClient);
  }

  /* Obtener el perfil de usuario */
getProfile(id?: number): Promise<User> {
      return id
          ? await this.#http.get<{user: User}>(`${SERVER}/users/${id}`).then(response => response.user)
          : await this.#http.get<{user: User}>(`${SERVER}/users/me`).then(response => response.user);
      
  }

  /* Save the new information */
  async saveProfile(name: string, email: string): Promise<void> {
      const resp: UserProfileEdit = { name, email };
      await this.#http.put<void, UserProfileEdit>(
          `${SERVER}/users/me`,
          resp
      );
  }

   /* Save the information in Base64*/
  async saveAvatar(avatar: string): Promise<string> {
      const data: UserPhotoEdit = { avatar };
      const response = await this.#http.put<User, UserPhotoEdit>(
          `${SERVER}/users/me/avatar`,
          data
      );
      return response.avatar;
  }

   /* Save the new information */
  async savePassword(password: string): Promise<void> {
      const resp: UserPasswordEdit = { password };
      await this.#http.put<void, UserPasswordEdit>(
          `${SERVER}/users/me/password`,
          resp
      );
  }
}
