//var SideChapterList = require("SideChapterList");

//require('./RecursiveSideChapters');

class TreeSideChapterNode extends React.Component {
    
    getIndent() {
        var i, length;
        var ret = '';
        for (i = 0, length = this.props.level; i < length; i++) {
            ret += '----';
        }
        ret += '|-';

        return ret;
    }

    render() {
        var indent = this.getIndent();
        var i, length, singleChapterData, parts;
        var level = this.props.level;

        var item = <h4>{indent} {this.props.data.name}</h4>;

        var children;
        if (this.props.data.children) {
            children = this.props.data.children.map(function (item) {
                return <TreeSideChapterNode level={level + 1} data={item} />;
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

        var children = this.state.chapterData.map(function (item) {
            return <TreeSideChapterNode data={item} level={1} />;
        });

        return (
            <div>
                {children}
            </div>
        );
    }
}

React.render(<SideChapterList />, document.getElementById('chaptersCol'));