import React from 'react';
import './SearchBox.scss';
import { observer, inject } from 'mobx-react';
import Rsltsrch from '../Rsltsrch/Rsltsrch';

interface Props {
    isShow: boolean;
    store?: any;
}

interface State {
    rsltsrch: boolean;
    rcmmndwrd: boolean;
}

const initState: State = {
    rsltsrch: false,
    rcmmndwrd: false
}

@inject("store")
@observer
class SearchBox extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            rsltsrch: false,
            rcmmndwrd: false
        }
    }

    resetState = () => {
        this.setState(initState);
    }

    render() {
        const { isShow } = this.props;
        const { state, handleChangeInput, handleClickDelete, handleClickSearch, onKeyUp } = this.props.store.SearchInputStore;

        return (
            <div className="SearchBox" style={isShow ? {display: "block"} : {display: "none"}}>
                <div className="SearchBox-Input">
                    <input type="text" placeholder="검색" onChange={e => handleChangeInput(e)} value={state.value} onKeyUp={onKeyUp} />
                    <button style={state.isInputed ? {display: "block"} : {display: "none"}} onClick={handleClickDelete}>
                        <img src="https://img.icons8.com/ios/50/000000/circled-x.png" alt="delect"/>
                    </button>
                    <button onClick={handleClickSearch}>
                        <img src={"https://img.icons8.com/ios-glyphs/60/000000/search.png"} alt="search" />
                    </button>
                </div>
                <Rsltsrch />
            </div>
        );
    }
}

export default SearchBox;