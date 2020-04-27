import React from 'react';
import './Menu.scss';
import SearchBox from '../SearchBox/SearchBox';

interface Props {

}

interface State {
    [x: string]: boolean;
    searchBox: boolean;
    directionBox: boolean;
}

interface ImageButton {
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
        this.state = initState;
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

        const ImageButton: React.FC<ImageButton> = ({ name, title, src, alt }) => {
            return (
                <button onClick={() => handleChangeComponenet(name)} title={title}>
                    <img src={src} alt={alt} />
                </button>
            );
        }

        return (
            <div className="Menu">
                <div className="Menu-Top">
                    <div className="Menu-Top-Title">
                        <span>Travelin</span>
                    </div>
                    <div className="Menu-Top-Tools">
                        <ul>
                            <li>
                                <ImageButton name={"searchBox"} title="검색" src={"https://img.icons8.com/ios-glyphs/60/000000/search.png"} alt={"search"} />
                            </li>
                            <li>
                                <ImageButton name={"directionBox"} title="길찾기" src={"https://img.icons8.com/wired/60/000000/waypoint-map.png"} alt={"direction"} />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="Menu-Bot">
                    <div className="Menu-Bot-Tools">
                        <ul>
                            <li>
                                <button>
                                    <img src="https://img.icons8.com/ios-glyphs/60/000000/user--v1.png" alt="user" />
                                </button>
                            </li>
                            <li>
                                <button>
                                    <img src="https://img.icons8.com/android/60/000000/info.png" alt="info" />
                                </button>
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