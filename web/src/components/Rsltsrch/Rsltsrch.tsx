import React from 'react';
import './Rsltsrch.scss';
import { inject, observer } from 'mobx-react';

interface Props {
    store?: any
}

interface State {

}

@inject("store")
@observer
class RcmmdWrd extends React.Component<Props, State> {
    render() {
        let { result, getLocation } = this.props.store.searchInputStore;
        let { setLocation } = this.props.store.mapStore;

        if (result.documents === undefined) {
            result.documents = [];
        }

        const clickCard = (key?: number) => {
            let location = getLocation(key);
            setLocation(location);
        }

        return (
            <div className="Rsltsrch">
                {result.documents.length === 0 ? <span>정보가 없습니다.</span> : result.documents.map((item?: any, key?: number) => {
                    const category_name = item.category_name.split("> ");
                    return (
                        <div className="Rsltsrch-Card" onClick={() => clickCard(key)} key={key}>
                            <div className="Rsltsrch-Card-Content">
                                <div className="Rsltsrch-Card-Content-Title">
                                    <div className="Rsltsrch-Card-Content-Title-Name" title={item.place_name}>
                                        {item.place_name}
                                    </div>
                                    <div className="Rsltsrch-Card-Content-Title-RoadName">
                                        {item.road_address_name !== "" ? item.road_address_name : item.address_name}
                                    </div>
                                </div>
                                <div className="Rsltsrch-Card-Content-Sub">
                                    <div className="Rsltsrch-Card-Content-Sub-Category">
                                        {category_name[category_name.length - 1]}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div className="Rsltsrch-PageNum">

                </div>
            </div>
        );
    }
}

export default RcmmdWrd;