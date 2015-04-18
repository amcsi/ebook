//var SideChapterList = require("SideChapterList");

//require('./RecursiveSideChapters');

class TreeSideChapterNode extends React.Component {

    constructor(props) {
        this.state = {};
    }

    onTitleClick() {
        console.info('lol');
        this.setState({editing: true});
    }

    render() {
        var i, length, singleChapterData, parts;
        var level = this.props.level;

        var item;
        if (this.state.editing) {
            item = <SideChapterTitleEditing level={level} data={this.props.data} />;
        } else {
            item = <SideChapterTitle level={level} data={this.props.data} onTitleClick={this.onTitleClick.bind(this)} />;
        }

        var children;
        if (this.props.data.children) {
            children = this.props.data.children.map(function (item, i) {
                return <TreeSideChapterNode key={i} level={level + 1} data={item} />;
            });
        }

        return (
            <div>
                {item}
                {children}
            </div>
        );
    }
}

class SideChapterTitle extends React.Component {
    
    getIndent() {
        var i, length;
        var ret = '';
        for (i = 0, length = this.props.level; i < length; i++) {
            ret += '----';
        }
        ret += '|-';

        return ret;
    }

    onClick(evt) {
        this.props.onTitleClick(this);
    }

    render() {
        var indent = this.getIndent();
        return <h4 onClick={this.onClick.bind(this)}>{indent} {this.props.data.name}</h4>;

    }
}

class SideChapterTitleEditing extends SideChapterTitle {
    render() {
        var indent = this.getIndent();

        return <div>{indent} <input type="text" value={this.props.data.name} /></div>;
    }
}

class SideChapterList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chapterData: [
                {
                    name: 'Chapter 1',
                    children: [
                        {
                            name: 'Chapter 1/A'
                        },
                        {
                            name: 'Chapter 2/A',
                            children: [
                                {
                                    name: 'Chapter 2/A/I'
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'Chapter 2'
                }
            ]
        };
    } 

    render() {

        var children = this.state.chapterData.map(function (item, i) {
            return <TreeSideChapterNode key={i} data={item} level={1} />;
        });

        return (
            <div>
                {children}
            </div>
        );
    }
}

React.render(<SideChapterList />, document.getElementById('chaptersCol'));