import React, { Component, ChangeEvent } from 'react';
import "./CreateContainer.scss";
import { inject, observer } from 'mobx-react';

interface Props {
    store?: any;
}

interface State {
    [x: string]: string;
    title: string;
    content: string;
    travelMode: string;
}

interface Point {
    location: string;
}

@inject("store")
@observer
class CreateContainer extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            title: "",
            content: "",
            travelMode: "WALKING"
        }
    }

    componentDidMount() {
        const { initMap } = this.props.store.mapStore;
        const container = document.getElementById("map2");

        initMap(container);
    }

    render() {
        const { points, removeInput, changeInput, addInput, directions } = this.props.store.mapStore;
        const { createPost } = this.props.store.postStore;

        const handleInputChange = (e: ChangeEvent<HTMLInputElement>, type: string) => this.setState({[type]: e.currentTarget.value});
        
        const handleChange = (e: ChangeEvent<HTMLSelectElement>) => this.setState({travelMode: e.currentTarget.value});

        const create = async () => {
            if(window.localStorage.getItem("token") === null) {
                alert("Login is required");
                return;
            } else if(this.state.title === "" || this.state.content === "") {
                alert("Please enter title and content");
                return;
            } else if(!directions(this.state.travelMode)) {
                alert("Map directions error");
                return;
            }

            const result = await createPost(this.state.title, this.state.content, JSON.stringify({"travelMode": this.state.travelMode, "points": points}));
            console.log(result);
            if(result) {
                alert("Success");
                window.location.href = "/post/share"
            }
        }

        return (
            <div className="CreateContainer">
                <div className="CreateContainer-Wrap">
                    <div className="CreateContainer-Wrap-Subject">
                        <span>Writing</span>
                    </div>
                    <div className="CreateContainer-Wrap-Form">
                        <div className="CreateContainer-Wrap-Form-Title">
                            <p>Title</p>
                            <input type="text" placeholder="Title" onChange={e => handleInputChange(e, "title")} />
                        </div>
                        <div className="CreateContainer-Wrap-Form-Content">
                            <p>Content</p>
                            <input type="text" placeholder="Content" onChange={e => handleInputChange(e, "content")} />
                        </div>
                        <div className="CreateContainer-Wrap-Form-Map">
                            <div className="CreateContainer-Wrap-Form-Map-Points">
                                <select className="CourseBox-Select" onChange={e => handleChange(e)}>
                                    <option value="WALKING">Walking</option>
                                    <option value="DRIVING">Driving</option>
                                    <option value="BICYCLING">Bicycling</option>
                                    <option value="TRANSIT">Transit</option>
                                </select>
                                {points.map((point: Point, key: number) => {
                                    return (
                                        <div className="CreateContainer-Wrap-Form-Map-Points-Input" key={key}>
                                            <input placeholder="Location" value={point.location} onChange={e => changeInput(key, e)} />
                                            <button onClick={() => removeInput(key)}>X</button>
                                        </div>
                                    )
                                })}
                                <div className="CreateContainer-Wrap-Form-Map-Points-Add">
                                    <button onClick={() => addInput()}><img src="https://img.icons8.com/pastel-glyph/512/000000/plus.png" alt="plus" /></button>
                                </div>
                                <div className="CreateContainer-Wrap-Form-Map-Points-Make">
                                    <button onClick={() => directions(this.state.travelMode)}>Make Course</button>
                                </div>
                            </div>
                            <div id="map2" />
                        </div>
                        <div className="CreateContainer-Wrap-Form-Submit">
                            <button onClick={() => create()}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateContainer;