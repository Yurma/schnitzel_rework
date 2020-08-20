import {observable, runInAction, computed} from 'mobx';
import {AuthService} from '../services';

class AuthStore {
    constructor() {
        this.authService = new AuthService;
    }

    @observable userData = {};
    @observable token = null;
    @observable status = null;

    @computed get isAuth() {
        if (!!this.token) {
            return !!this.userData.id;
        }
        return false;
    }

    authorize = () => {
        this.token = localStorage.getItem("token") || null;
        this.token && this.authData();
    }

    authLogin = async (loginObject, history) => {
        try { 
            const data = await this.authService.postLogin(loginObject);
            runInAction(() => {
                if(data.token){
                    this.token = data.token;
                    localStorage.setItem("token", data.token);
                    this.authorize();
                    history.push("/");
                }
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.status = "error";
            });
        }
    }

    authData = async () => {
        try { 
            const data = await this.authService.getData(this.token);
            runInAction(() => {
                if(data.id){
                    this.userData = data;
                }
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.status = "error";
            });
        }
    }

    authLogout = () => {
        console.log("logged out")
        this.userData = {};
        this.token = null;
        localStorage.removeItem("token");
    }
}

export default new AuthStore;