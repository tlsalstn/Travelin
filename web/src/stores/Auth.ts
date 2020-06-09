import React, { ChangeEvent } from "react";
import { observable } from "mobx";
import Axios from "axios";

interface Login {
    id: string;
    password: string;
}

interface Register {
    id: string;
    password: string;
    name: string;
}

export class LoginStore {
    @observable data: any = [];

    @observable values: Login = {
        id: "",
        password: ""
    }

    inputChange = (type: string, e: React.ChangeEvent<HTMLInputElement>) => {
        if(type === "id") {
            this.values.id = e.currentTarget.value;
        } else if(type === "password") {
            this.values.password = e.currentTarget.value;
        }
    }

    login = async () => {
        try {
            this.data = await Axios({
                method: "POST",
                url: "http://localhost:3001/user/login",
                data: {
                    userId: this.values.id,
                    password: this.values.password
                }
            });

            return this.data.data;
        } catch (error) {
            console.log(error);
        }  
    }
}

export class RegisterStore {
    @observable data: any = [];
    @observable values: Register = {
        id: "",
        password: "",
        name: ""
    }

    inputChange = (type: string, e: ChangeEvent<HTMLInputElement>) => {
        if(type === "id") {
            this.values.id = e.currentTarget.value;
        } else if(type === "password") {
            this.values.password = e.currentTarget.value;
        } else if(type === "name") {
            this.values.name = e.currentTarget.value;
        }
    }

    register = async () => {
        try {
            this.data = await Axios({
                method: "POST",
                url: "http://localhost:3001/user/register",
                data: {
                    userId: this.values.id,
                    password: this.values.password,
                    name: this.values.name
                }
            });

            return this.data.data;
        } catch (error) {
            console.log(error);
        }
    }
}
