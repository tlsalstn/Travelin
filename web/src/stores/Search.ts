import { observable, action } from 'mobx';
import axios from 'axios';
import { token } from '../config/token.json';

interface State {
    value: string;
    isInputed: boolean;
}

interface Result {
    documents: any;
    meta: any;
}

class SearchInputStore {
    @observable state: State = {
        value: "",
        isInputed: false
    }

    @observable result: Result = {
        documents: [],
        meta: []
    };

    @action handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.state.value = e.target.value;

        if(e.target.value === "") {
            this.state.isInputed = false;
        } else {
            this.state.isInputed = true;
        }
    }

    @action handleClickDelete = () => {
        this.state.value = "";
        this.state.isInputed = false;
        this.result = {
            documents: [],
            meta: []
        }
    }
    
    @action handleClickSearch = () => {
        this.searchKeyword();
    }

    @action onKeyUp = (e: React.KeyboardEvent) => {
        if(e.keyCode === 13) {
            this.searchKeyword();
        }
    }

    @action getLocation = (id: number) => {
        console.log(id);
        return [this.result.documents[id].y, this.result.documents[id].x];
    }

    searchKeyword = async () => {
        let size = 15;

        if(this.state.value === "") {
            this.result = {
                documents: [],
                meta: []
            };
            return;
        }

        try {
            const result = await axios({
                url: "https://dapi.kakao.com/v2/local/search/keyword.json",
                method: "GET",
                headers: {
                    "Authorization": "KakaoAK " + token.kkorstapk
                },
                params: {
                    query: this.state.value,
                    size: size,
                    page: 1
                }
            });

            this.result = result.data;
            console.log(result);
        } catch(error) {
            console.log(error);
        }
    }
}

export default new SearchInputStore();