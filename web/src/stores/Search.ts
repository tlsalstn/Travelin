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

let timer: number;

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

        if(timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            this.searchKeyword(true);
        }, 500) as any;
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
        this.searchKeyword(false);
    }

    @action onKeyUp = (e: React.KeyboardEvent) => {
        if(e.keyCode === 13) {
            this.searchKeyword(false);
        }
    }

    @action getLocation = (id: number) => {
        return [this.result.documents[id].y, this.result.documents[id].x];
    }

    searchKeyword = async (isPreview: boolean) => {
        clearTimeout(timer);
        let size;
        if(isPreview) {
            size = 5;
        } else {
            size = 10;
        }

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
                    size: size
                }
            });

            this.result = result.data;
        } catch(error) {
            console.log(error);
        }
    }
}

export default new SearchInputStore();