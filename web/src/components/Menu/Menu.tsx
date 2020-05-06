import React from 'react';
import './Menu.scss';
import SearchBox from '../SearchBox/SearchBox';
import logo from '../../img/logo.jpg';

interface Props {

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

    resetState() {
        this.setState(initState);
    }

    handleChangeComponenet = async (name: string): Promise<void> => {
        await this.resetState();
        this.setState({
            ...this.state,
            [name]: !this.state[name]
        });
    }

    render() {
        const { handleChangeComponenet } = this;

        const TopTool: React.FC<Tool> = ({ name, title, src, alt }) => {
            return (
                <button className="TopTool" onClick={() => handleChangeComponenet(name)} title={title}>
                    <img src={src} alt={alt} />
                </button>
            );
        }

        const BotTool: React.FC<Tool> = ({ name, title, src, alt }) => {
            return (
                <button className="BotTool">
                    <img src={src} alt={alt} />
                </button>
            );
        }

        return (
            <div className="Menu">
                <div className="Menu-Top">
                    <div className="Menu-Top-Title">
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="Menu-Top-Tools">
                        <ul>
                            <li>
                                <TopTool name={"searchBox"} title="검색" src={"https://img.icons8.com/ios-filled/50/000000/marker.png"} alt={"search"} />
                            </li>
                            <li>
                                <TopTool name={"directionBox"} title="길찾기" src={"https://img.icons8.com/ios-filled/24/000000/arrow.png"} alt={"direction"} />
                            </li>
                            <li>
                                <TopTool name={"course"} title="여행 코스" src={"https://img.icons8.com/ios-filled/50/000000/waypoint-map.png"} alt={"course"} />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="Menu-Bot">
                    <div className="Menu-Bot-Tools">
                        <ul>
                            <li>
                                <BotTool name={"myPage"} title="마이페이지" src={"https://img.icons8.com/ios-glyphs/60/000000/user--v1.png"} alt={"myPage"} />
                            </li>
                            <li>
                                <BotTool name={"info"} title="정보" src={"https://img.icons8.com/android/60/000000/info.png"} alt={"info"} />
                            </li>
                        </ul>
                    </div>
                </div>
                <SearchBox isShow={this.state.searchBox} />
            </div>
        );
    }
}

export default Menu;