
const { localStorage } = window;

export default class JWT {
  static save(token) {
    localStorage.setItem("token", token);
  }
  static fetch(){
    return localStorage.getItem("token")
  }
  static destroy(){
    localStorage.clear("token");
  }
}
