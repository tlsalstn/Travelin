import React from 'react';
import './Menu.scss';
// import SearchBox from '../SearchBox/SearchBox';
import CourseBox from '../CourseBox/CourseBox';

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
            directionBox: false,
            courseBox: true
        }
    }

    reset() {
        this.setState(initState);
    }

    openBox = async (name: string): Promise<void> => {
        await this.reset();
        this.setState({
            ...this.state,
            [name]: !this.state[name]
        });
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
                                <Tool type="top" name={"searchBox"} title="검색" src={"https://img.icons8.com/ios-filled/50/000000/marker.png"} alt={"search"} />
                            </li>
                            <li>
                                <Tool type="top" name={"directionBox"} title="길찾기" src={"https://img.icons8.com/ios-filled/50/000000/arrow.png"} alt={"direction"} />
                            </li>
                            <li>
                                <Tool type="top" name={"courseBox"} title="여행 코스" src={"https://img.icons8.com/ios-filled/50/000000/waypoint-map.png"} alt={"course"} />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="Menu-Bot">
                    <div className="Menu-Bot-Tools">
                        <ul>
                            <li>
                                <Tool type="bot" name={"mypage"} title="마이페이지" src={"https://img.icons8.com/ios-glyphs/60/000000/user--v1.png"} alt={"myPage"} />
                            </li>
                            <li>
                                <Tool type="bot" name={"info"} title="정보" src={"https://img.icons8.com/android/60/000000/info.png"} alt={"info"} />
                            </li>
                        </ul>
                    </div>
                </div>
                {/* <SearchBox isShow={this.state.searchBox} /> */}
                <CourseBox isShow={this.state.courseBox} />
            </div>
        );
    }
}

export default Menu;