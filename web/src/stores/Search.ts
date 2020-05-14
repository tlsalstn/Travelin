import { observable, action } from 'mobx';
import axios from 'axios';
import { address } from '../config/Adrs.json';
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
    @observable location: String[] = [];

    @observable state: State = {
        value: "",
        isInputed: false
    }

    @observable result: Result = {
        documents: [],
        meta: []
    };

    // Input이 비었는지 체크
    @action handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.state.value = e.target.value;

        if(e.target.value === "") {
            this.state.isInputed = false;
        } else {
            this.state.isInputed = true;
        }
    }

    // Input 초기화 버튼
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

    // result의 id 값의 위치 얻기
    @action getLocation = (id: number) => {
        console.log(id);
        this.location = [this.result.documents[id].y, this.result.documents[id].x];
        return [this.result.documents[id].y, this.result.documents[id].x];
    }

    // kakao api 키워드 검색
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
                url: address.keyWrdSrch,
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