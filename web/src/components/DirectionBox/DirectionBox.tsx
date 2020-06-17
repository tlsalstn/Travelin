import React, { ChangeEvent } from "react";
import "./DirectionBox.scss";
import { inject, observer } from "mobx-react";

interface Props {
    store?: any;
    isShow: boolean;
}

interface State {
    travelMode: string;
}

interface Point {
    location: string;
}

@inject("store")
@observer
class DirectionBox extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            travelMode: "WALKING"
        }
    }

    render() {
        const { isShow } = this.props;
        const { points, addInput, removeInput, changeInput, directions } = this.props.store.mapStore;

        const handleChange = (e: ChangeEvent<HTMLSelectElement>) => this.setState({travelMode: e.currentTarget.value});

        return (
            <div className="CourseBox" style={{ "display": isShow ? "block": "none" }}>
                <h1>Directions</h1>
                <select className="CourseBox-Select" onChange={e => handleChange(e)}>
                    <option value="WALKING">Walking</option>
                    <option value="DRIVING">Driving</option>
                    <option value="BICYCLING">Bicycling</option>
                    <option value="TRANSIT">Transit</option>
                </select>
                {points.map((point: Point, key: number) => {
                    return (
                        <div className="courseInput" key={key}>
                            <input placeholder="Location" value={point.location} onChange={e => changeInput(key, e)} />
                            <button onClick={() => removeInput(key)}>X</button>
                        </div>
                    )
                })}
                <div className="CourseBox-Add">
                    <button onClick={() => addInput()}><img src="https://img.icons8.com/pastel-glyph/512/000000/plus.png" alt="plus"/></button>
                </div>
                <div className="CourseBox-Btn">
                    <button onClick={() => directions(this.state.travelMode)}>Make Course</button>
                </div>
            </div>
        );
    }
}

export default DirectionBox;