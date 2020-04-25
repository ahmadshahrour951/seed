class AuthService {
  // static async fetchCsrfToken(api) {
  //   try {
  //     return await api.get('auth/csrf', { withCredentials: false });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  static async login(api, user) {
    const res = await api.post('auth/login', user);

    const token = res.data.data.token;

    if (token) {
      const { exp } = JSON.parse(atob(token.split('.')[1]));
      const expiresAt = new Date(exp * 1000);

      await localStorage.setItem('token', token);
      await localStorage.setItem('expiresAt', expiresAt);
      return { token, expiresAt };
    } else {
      throw Error('Token unavailable');
    }
  }

  static async autoLogin() {
    const token = await localStorage.getItem('token');
    if (!token) throw Error('Token unavailable');

    const expiresAt = new Date(await localStorage.getItem('expiresAt'));
    const now = new Date();

    if (now >= expiresAt) throw Error('Token expired');

    return { token, expiresAt };
  }

  static async logout() {
    await localStorage.removeItem('token');
    await localStorage.removeItem('expiresAt');
  }
}

export default AuthService;
