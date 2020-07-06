import React from 'react';
import './Menu.scss';
import SearchBox from '../SearchBox/SearchBox';
import DirectionsBox from '../DirectionBox/DirectionBox';
import { Link } from 'react-router-dom';

interface Props {
    store?: any;
}

interface State {
    [x: string]: boolean;
    searchBox: boolean;
    directionBox: boolean;
}

interface Tool {
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

    render() {
        const { openBox } = this;

        const Tool: React.SFC<Tool> = ({ name, title, src, alt }) => {
            return (
                <button className="TopTool" onClick={() => openBox(name)} title={title}>
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
                                <Tool name={"searchBox"} title="Search" src={"https://img.icons8.com/ios-filled/50/000000/marker.png"} alt={"search"} />
                            </li>
                            <li>
                                <Tool name={"directionBox"} title="Directions" src={"https://img.icons8.com/ios-filled/50/000000/arrow.png"} alt={"direction"} />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="Menu-Bot">
                    <div className="Menu-Bot-Tools">
                        <ul>
                            <li>
                                <Link to={"/mypage"} title="My Page">
                                    <img src={"https://img.icons8.com/ios-glyphs/60/000000/user--v1.png"} alt={"MyPage"} />
                                </Link>
                            </li>
                            <li>
                                <Link to={"/post/share"} title="Community">
                                    <img src={"https://img.icons8.com/material/60/000000/google-groups.png"} alt={"Comunity"} />
                                </Link>
                            </li>
                            <li>
                                <Link to={"/info"} title="Info">
                                    <img src={"https://img.icons8.com/android/60/000000/info.png"} alt={"Info"} />
                                </Link>
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