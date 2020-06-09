import React from "react";
import "./CourseBox.scss";
import { inject, observer } from "mobx-react";

interface Props {
    store?: any;
    isShow: boolean;
}

interface Point {
    location: string;
}

@inject("store")
@observer
class CourseBox extends React.Component<Props> {
    render() {
        const { isShow } = this.props;
        const { points, addInput, removeInput, changeInput, directions } = this.props.store.mapStore;

        return (
            <div className="CourseBox" style={{ "display": isShow ? "block": "none" }}>
                <h1>Make Course</h1>
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
                <div className="CourseBox-Make">
                    <button onClick={() => directions()}>Make Course</button>
                </div>
            </div>
        );
    }
}

export default CourseBox;