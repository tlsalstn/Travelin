import React from 'react';
import './Menu.scss';
import SearchBox from '../SearchBox/SearchBox';
import DirectionsBox from '../DirectionBox/DirectionBox';

interface Props {
    store?: any;
}

interface State {
    [x: string]: boolean;
    searchBox: boolean;
    directionBox: boolean;
}

interface Tool {
    type: string;
    name: string
    title: string
    src: string
    alt: string
}

const initState: State = {
    searchBox: false,
    directionBox: false
}

class Menu extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            searchBox: false,
            directionBox: false
        }
    }

    reset() {
        this.setState(initState);
    }

    openBox = async (name: string): Promise<void> => {
        if (this.state[name] !== true) {
            await this.reset();
            this.setState({
                [name]: !this.state[name]
            });
        } else {
            await this.reset();
        }
    }

    link = (name: string) => {
        window.location.href = "/" + name;
    }

    render() {
        const { openBox, link } = this;

        const Tool: React.SFC<Tool> = ({ type, name, title, src, alt }) => {
            return (
                <button className="TopTool" onClick={() => type === "top" ? openBox(name) : link(name)} title={title}>
                    <img src={src} alt={alt} />
                </button>
            );
        }

        return (
            <div className="Menu">
                <div className="Menu-Top">
                    <div className="Menu-Top-Title">
                        <a href="/">T</a>
                    </div>
                    <div className="Menu-Top-Tools">
                        <ul>
                            <li>
                                <Tool type="top" name={"searchBox"} title="Search" src={"https://img.icons8.com/ios-filled/50/000000/marker.png"} alt={"search"} />
                            </li>
                            <li>
                                <Tool type="top" name={"directionBox"} title="Directions" src={"https://img.icons8.com/ios-filled/50/000000/arrow.png"} alt={"direction"} />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="Menu-Bot">
                    <div className="Menu-Bot-Tools">
                        <ul>
                            <li>
                                <Tool type="bot" name={"mypage"} title="My page" src={"https://img.icons8.com/ios-glyphs/60/000000/user--v1.png"} alt={"MyPage"} />
                            </li>
                            <li>
                                <Tool type="bot" name={"community"} title="Community" src={"https://img.icons8.com/material/60/000000/google-groups.png"} alt={"Comunity"} />
                            </li>
                            <li>
                                <Tool type="bot" name={"info"} title="Info" src={"https://img.icons8.com/android/60/000000/info.png"} alt={"Info"} />
                            </li>
                        </ul>
                    </div>
                </div>
                <SearchBox isShow={this.state.searchBox} />
                <DirectionsBox isShow={this.state.directionBox} />
            </div>
        );
    }
}

export default Menu;