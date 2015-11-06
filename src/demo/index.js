import React from 'react';
import SortableGrid, {SortableGridItem} from '../components/SortableGrid/SortableGrid';

class Demo extends React.Component {
    constructor() {
        super();

        const icons = [
            {
                src: require('./icons/0.png'),
                position: 0,
            },
            {
                src: require('./icons/1.png'),
                position: 1,
            },
            {
                src: require('./icons/2.png'),
                position: 2,
            },
            {
                src: require('./icons/3.png'),
                position: 3,
            },
            {
                src: require('./icons/4.png'),
                position: 4,
            },
            {
                src: require('./icons/5.png'),
                position: 5,
            },
            {
                src: require('./icons/6.png'),
                position: 6,
            },
            {
                src: require('./icons/7.png'),
                position: 7,
            },
            {
                src: require('./icons/8.png'),
                position: 8,
            },
            {
                src: require('./icons/9.png'),
                position: 9,
            },
        ];

        this.state = {icons};
    }

    handleReorder(newPositions) {
        this.setState({
            icons: this.state.icons.map((icon) => {
                return {
                    ...icon,
                    position: newPositions[icon.position],
                };
            }),
        });
    }

    render() {
        return <div style={{width: 700, height: 500, margin: '100px auto'}}>
            <SortableGrid onReorder={this.handleReorder.bind(this)}
                rows={5}
                columns={7}>
                {this._renderItems()}
            </SortableGrid>
        </div>;
    }

    _renderItems() {
        return this.state.icons.map((icon, key) => {
            return <SortableGridItem position={icon.position} key={key}>
                <div>
                    <img src={icon.src} style={{ width: '80%', margin: '10%'}} />
                </div>
            </SortableGridItem>;
        });
    }
}

React.render(<Demo/>, document.body);
