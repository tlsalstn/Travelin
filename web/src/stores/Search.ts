import { observable, action } from "mobx";
import { ChangeEvent } from "react";
import Axios from "axios";
import { address } from "../config/adrs.json";

export class SearchStore {
    @observable placeInfo = [];
    @observable value: string = "";

    @action handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.value = e.currentTarget.value;
    }

    @action search = async () => {
        try {
            const result = await Axios({
                method: "GET",
                url: address.localhost + "/places/findPlace",
                params: {
                    input: this.value,
                    inputtype: "textquery"
                }
            });
            
            console.log(result.data);

            this.placeInfo = result.data;
            return result.data;
        } catch (error) {
            console.log(error);
            return {status: false}
        }
    }
}